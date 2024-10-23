import React, { useState, useEffect } from 'react'; // Import useEffect
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const SlotAdder = () => {
  const [slots, setSlots] = useState([]);
  const [fromHours, setFromHours] = useState('');
  const [fromMinutes, setFromMinutes] = useState('');
  const [fromPeriod, setFromPeriod] = useState('');
  const [toHours, setToHours] = useState('');
  const [toMinutes, setToMinutes] = useState('');
  const [toPeriod, setToPeriod] = useState('');

  // Fetch slots when the component mounts
  useEffect(() => {
    axios
      .get('http://localhost:3001/getslot') // Replace with your API endpoint to fetch slots
      .then((res) => {
        setSlots(res.data); // Set the fetched slots to state
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); // Empty dependency array to run only once when component mounts

  const check_time = (fromHours, fromMinutes, fromPeriod, toHours, toMinutes, toPeriod) => {
    let i = 0;
    if (fromPeriod === 'AM' && fromHours !== '12') {
      i = +fromHours * 60;
    }

    if (fromPeriod === 'PM' && fromHours !== '12') {
      i += 720 + fromHours * 60;
    }

    i += +fromMinutes;

    let j = 0;

    if (toPeriod === 'AM' && toHours !== '12') {
      j = +toHours * 60;
    }

    if (toPeriod === 'PM' && toHours !== '12') {
      j += 720 + +toHours * 60;
    }
    j += +toMinutes;

    return [i, j];
  };

  const handleAddSlot = () => {
    if (fromHours && fromMinutes && fromPeriod && toHours && toMinutes && toPeriod) {
      const ss = check_time(fromHours, fromMinutes, fromPeriod, toHours, toMinutes, toPeriod);
      const i = ss[0];
      const j = ss[1];

      if (j < i || i > 864000 || j > 86400) {
        toast.error('Invalid time range!');
        return;
      }

      if (slots.length > 0) {
        const prev = slots[slots.length - 1];
        const kk = check_time(
          prev['fromHours'],
          prev['fromMinutes'],
          prev['fromPeriod'],
          prev['toHours'],
          prev['toMinutes'],
          prev['toPeriod']
        );
        let a = kk[0];
        let b = kk[1];

        if (i < b) {
          toast.error('Invalid time range!');
          return;
        }
      }

      axios
        .post('http://localhost:3001/addslot', {
          fromHours: fromHours,
          fromMinutes: fromMinutes,
          fromPeriod: fromPeriod,
          toHours: toHours,
          toMinutes: toMinutes,
          toPeriod: toPeriod
        })
        .then((res) => {
          setSlots(res.data); // Update the slots with the response data
        })
        .catch((err) => {
          console.log(err);
        });

      // Clear input fields
      setFromHours('');
      setFromMinutes('');
      setFromPeriod('');
      setToHours('');
      setToMinutes('');
      setToPeriod('');
    }
  };

  const handleDeleteSlot = (fromHours, fromMinutes, fromPeriod, toHours, toMinutes, toPeriod) => {
    axios
      .post('http://localhost:3001/deleteslot', {
          fromHours,
          fromMinutes,
          fromPeriod,
          toHours,
          toMinutes,
          toPeriod,
      })
      .then((res) => {
        setSlots(res.data); // Update the slots with the response data
      })
      .catch((err) => {
        console.log(err);
        toast.error('Failed to delete the slot!');
      });
  };
  

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* From time inputs */}
      <ToastContainer
        toastStyle={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          height: '40px',
          lineHeight: '40px'
        }}
      />
      <div className="mb-4">
        <label className="block mb-2 font-medium">From:</label>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <input
            type="number"
            placeholder="Hrs"
            value={fromHours}
            onChange={(e) => setFromHours(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Min"
            value={fromMinutes}
            onChange={(e) => setFromMinutes(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={fromPeriod}
            onChange={(e) => setFromPeriod(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">AM/PM</option>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>

      {/* To time inputs */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">To:</label>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <input
            type="number"
            placeholder="Hrs"
            value={toHours}
            onChange={(e) => setToHours(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Min"
            value={toMinutes}
            onChange={(e) => setToMinutes(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={toPeriod}
            onChange={(e) => setToPeriod(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">AM/PM</option>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>

      {/* Add Slot button */}
      <button
        onClick={handleAddSlot}
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mb-4 transition duration-200"
      >
        Add Slot
      </button>

      {slots.map((slot, index) => (
        <div key={index} className="flex items-center justify-between mb-2 p-2 border border-gray-300 rounded-md bg-gray-50">
          <div className="text-gray-800">
            From {String(slot.fromHours).padStart(2, '0')}:{String(slot.fromMinutes).padStart(2, '0')} {slot.fromPeriod} {' '}
            to {String(slot.toHours).padStart(2, '0')}:{String(slot.toMinutes).padStart(2, '0')} {slot.toPeriod}
          </div>
          <div className="flex justify-end w-1/4">
            <button
              onClick={() => handleDeleteSlot(slot.fromHours,slot.fromMinutes,slot.fromPeriod,slot.toHours,slot.toMinutes,slot.toPeriod)}
              className="bg-red-500 text-white text-xs w-12 h-10 rounded-md hover:bg-red-600 transition duration-200 flex items-center justify-center"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SlotAdder;
