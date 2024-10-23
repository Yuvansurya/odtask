import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OdRequest = () => {
  const [requests, setRequests] = useState([]);
  const [changed, setChanged] = useState(false); // Track changes

  // Fetch requests when the component mounts or when `changed` is true
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.post('http://localhost:3001/requests', { status: 0 });
        console.log('Fetched requests:', res.data); // Log the response
        setRequests(res.data);
      } catch (err) {
        console.error('Error fetching requests:', err);
      }
    };

    fetchRequests();
  }, [changed]); // Run effect when `changed` changes

  // Handle accept request
  const handleAccept = (id) => {
    axios
      .post('http://localhost:3001/changestatus', { id: id, changestatus: 1 }) // Send _id and status=1 for accept
      .then((res) => {
        console.log(`Request ${id} accepted`, res.data);
        setChanged(prev => !prev); // Trigger fetch again
      })
      .catch((err) => {
        console.error('Error accepting request:', err);
      });
  };

  // Handle decline request
  const handleDecline = (id) => {
    axios
      .post('http://localhost:3001/changestatus', { id: id, changestatus: 2 }) // Send _id and status=2 for decline
      .then((res) => {
        console.log(`Request ${id} declined`, res.data);
        setChanged(prev => !prev); // Trigger fetch again
      })
      .catch((err) => {
        console.error('Error declining request:', err);
      });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">OD Requests</h2>
      {requests.length === 0 ? (
        <p className="text-gray-600 text-lg">No requests available</p>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request._id}
              className="p-4 border border-gray-300 rounded-lg shadow-md bg-blue-50 hover:bg-blue-100 transition duration-300 transform hover:scale-105"
            >
              <div className="flex justify-between">
                <div className="w-3/4 text-left">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {request.user_data.name} ({request.user_data.rollno})
                  </h3>
                  <p className="text-gray-600">{request.user_data.dept} - Year: {request.user_data.year}</p>
                  <p className="text-gray-500">Reason: <span className="font-medium">{request.reason}</span></p>
                  <div className="mt-2">
                    <p className="font-semibold">Requested Slots:</p>
                    {request.slots.map((slot, index) => (
                      <p key={index} className="text-sm text-gray-600">
                        {String(slot.fromHours).padStart(2, '0')}:{String(slot.fromMinutes).padStart(2, '0')} {slot.fromPeriod} - {String(slot.toHours).padStart(2, '0')}:{String(slot.toMinutes).padStart(2, '0')} {slot.toPeriod}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Accept and Decline Buttons */}
                <div className="flex flex-col items-end space-y-2">
                  <button
                    className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition duration-200 w-full"
                    onClick={() => handleAccept(request._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition duration-200 w-full"
                    onClick={() => handleDecline(request._id)}
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OdRequest;
