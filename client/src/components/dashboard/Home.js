import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Home = () => {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [dept, setDept] = useState('');
  const [rollno, setRoll] = useState('');

  const handleAddStudent = (e) => {
    //e.preventDefault();    

    // Check if all fields are filled
    if (name !== '' && rollno !== '' && dept !== '' && year !== '') {
      axios.post('http://localhost:3001/register', {
        name: name,
        dept: dept,
        year: year,
        rollno: Number(rollno),
        password: rollno.slice(-3) + dept + year,
      })
        .then(res => {
          console.log(res);
          toast.success('Student added successfully!');
        })
        .catch(err => {
          console.log(err);
          if (err.response && err.response.status === 400) {
            toast.error('User exists');
          } else {
            toast.error('Registration failed');
          }
        });

    } else {
      toast.error("Please fill all fields");
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Student</h2>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
        />
        <input
          type="number"
          name="rollno"
          placeholder="Roll Number"
          value={rollno}
          onChange={(e) => setRoll(e.target.value)}
          className="p-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
        />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="department" className="block font-medium text-gray-700">Department</label>
            <select
              id="department"
              name="department"
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
            >
              <option value="">Select Department</option>
              <option value="csbs">CSBS</option>
              <option value="cse">CSE</option>
              <option value="aids">AIDS</option>
              <option value="it">IT</option>
              <option value="eee">EEE</option>
              <option value="ece">ECE</option>
            </select>
          </div>
          <div>
            <label htmlFor="year" className="block font-medium text-gray-700">Year</label>
            <select
              id="year"
              name="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
            >
              <option value="">Select Year</option>
              <option value="I">I</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
            </select>
          </div>
        </div>
      </div>
      <button
        onClick={handleAddStudent}
        className="w-full bg-blue-500 text-white p-3 rounded-md shadow hover:bg-blue-600 transition duration-300"
      >
        Add Student
      </button>
      <ToastContainer
        toastStyle={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          height: '40px',
          lineHeight: '40px',
        }}
      />
    </div>
  );
};

export default Home;
