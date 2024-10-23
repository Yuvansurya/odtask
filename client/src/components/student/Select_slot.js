import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SelectSlot = () => {
  const [slots, setSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [reason, setReason] = useState('');

  // Fetch slots when the component mounts
  useEffect(() => {
    axios
      .get('http://localhost:3001/getslot') // Replace with your API endpoint to fetch slots
      .then((res) => {
        const fetchedSlots = res.data.map((slot, index) => ({ ...slot, index }));
        setSlots(fetchedSlots); // Set the fetched slots to state with index
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Toggle slot selection
  const toggleSlotSelection = (slot) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots(selectedSlots.filter((s) => s !== slot));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  // Handle sending the request
  const handleSendRequest = () => {
    if (selectedSlots.length === 0 || !reason) {
      alert('Please select at least one slot and provide a reason.');
      return;
    }
  
    const data = {
      slots: selectedSlots.map((slot) => ({
        fromHours: slot.fromHours,
        fromMinutes: slot.fromMinutes,
        fromPeriod: slot.fromPeriod,
        toHours: slot.toHours,
        toMinutes: slot.toMinutes,
        toPeriod: slot.toPeriod,
      })),
      reason: reason, // Ensure this is passed correctly
      user_data: {
        name: localStorage.getItem('user_name'),
        rollno: localStorage.getItem('user_rollno'),
        year: localStorage.getItem('user_year'),
        dept: localStorage.getItem('user_dept'),
      },
      status: 0
    };
  
    axios
      .post('http://localhost:3001/check', data) // Backend API
      .then((response) => {
        console.log('Schedule saved:', response.data);
        setSelectedSlots([]);
        setReason('');
      })
      .catch((error) => {
        console.error('Error saving schedule:', error);
      });
  };
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Available Slots</h2>
      {slots.length === 0 ? (
        <p className="text-gray-600">No slots available</p>
      ) : (
        <div>
          {slots.map((slot, index) => (
            <div
              key={index}
              className={`flex items-center justify-between mb-4 p-4 border border-gray-200 rounded-lg shadow-sm transition duration-300 hover:shadow-lg cursor-pointer ${
                selectedSlots.includes(slot) ? 'bg-blue-100 border-blue-400' : 'bg-blue-50'
              }`}
              onClick={() => toggleSlotSelection(slot)}
            >
              <div className="flex items-center space-x-4">
                <div className={`${selectedSlots.includes(slot) ? 'text-blue-600' : 'text-gray-600'}`}>
                  <i className="bi bi-clock-fill text-2xl"></i>
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-700">
                    {String(slot.fromHours).padStart(2, '0')}:{String(slot.fromMinutes).padStart(2, '0')} {slot.fromPeriod}
                    {' '} - {String(slot.toHours).padStart(2, '0')}:{String(slot.toMinutes).padStart(2, '0')} {slot.toPeriod}
                  </p>
                  <p className="text-sm text-gray-500">Slot {index + 1}</p>
                </div>
              </div>
            </div>
          ))}
          {/* Reason Textbox */}
          <div className="mb-4">
            <label htmlFor="reason" className="block text-gray-700 text-sm font-medium mb-2">
              Reason
            </label>
            <textarea
              id="reason"
              rows="3"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Enter the reason for selecting these slots"
            ></textarea>
          </div>
          {/* Send Request Button */}
          <button
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition duration-300"
            onClick={handleSendRequest}
            disabled={selectedSlots.length === 0} // Disable button if no slots are selected
          >
            Send Request
          </button>
        </div>
      )}
    </div>
  );
};

export default SelectSlot;
