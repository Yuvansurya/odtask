import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Slot = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const rollno = localStorage.getItem('rollno'); // Get roll number from localStorage

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post('http://localhost:3001/slotstatus', { rollno });
        
        if (res.data.length > 0) {
          setData(res.data);
        } else {
          setError('No data found');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('No data found');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [rollno]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">OD Status</h2>

      <div className="space-y-4">
        {data.length > 0 ? (
          data.map((request) => (
            <div key={request._id} className="p-4 border border-gray-300 rounded-lg shadow-md bg-blue-50 hover:bg-blue-100 transition duration-300 transform hover:scale-105">
              <h3 className="text-xl font-semibold text-gray-800">
                {request.user_data.name} ({request.user_data.rollno})
              </h3>
              <p className="text-gray-600">
                {request.user_data.dept} - Year: {request.user_data.year}
              </p>
              <p className="text-gray-500">
                Reason: <span className="font-medium">{request.reason}</span>
              </p>

              <div className="mt-2">
                <p className="font-semibold">Requested Slots:</p>
                {request.slots.map((slot, index) => (
                  <p key={index} className="text-sm text-gray-600">
                    {String(slot.fromHours).padStart(2, '0')}:
                    {String(slot.fromMinutes).padStart(2, '0')} {slot.fromPeriod} -{' '}
                    {String(slot.toHours).padStart(2, '0')}:
                    {String(slot.toMinutes).padStart(2, '0')} {slot.toPeriod}
                  </p>
                ))}
              </div>

              {/* Status Display */}
              <div className="mt-4">
                <p className="text-lg font-bold">
                  {request.status === 0 && 'Pending Request'}
                  {request.status === 1 && <span className="text-green-600">Accepted</span>}
                  {request.status === 2 && <span className="text-red-600">Declined</span>}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No data found for this user.</p>
        )}
      </div>
    </div>
  );
};

export default Slot;
