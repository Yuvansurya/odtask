import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentList = () => {
  const [data, setData] = useState([]);

  // Fetch the list of students
  const fetchlist = async () => {
    try {
      const res = await axios.post('http://localhost:3001/studentlist');
      console.log(res);
      return res.data;
    } catch {
      return [];
    }
  };

  useEffect(() => {
    const getdata = async () => {
      const students = await fetchlist();
      setData(students);
    };
    getdata();
  }, []);

  const delete_student = async (id) => {
    console.log(id);
    try {
      const res = await axios.post('http://localhost:3001/deletestudent', {
        rollno: id,
      });
      //console.log(res);
      setData(res.data);
      return res.data;
    } catch {
      return [];
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Student List</h2>
      <div className="grid grid-cols-1 gap-4">
        {/* Map through the data to create student cards */}
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-md shadow-sm flex justify-between items-center"
          >
            <div className='flex flex-col items-start'>
              <p>
                <strong>Name:</strong> {item.name}
              </p>
              <p>
                <strong>Roll No:</strong> {item.rollno}
              </p>
              <p>
                <strong>Department:</strong> {item.dept}
              </p>
              <p>
                <strong>Year:</strong> {item.year}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={() => delete_student(item.rollno)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;
