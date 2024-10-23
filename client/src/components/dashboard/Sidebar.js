import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AddStudent from './Home'; // Assuming you have this component
import StudentList from './StudentList';
import SlotAdder from './SlotAdder';
import OdRequest from './Odrequest';

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [currentView, setCurrentView] = useState('addstudent');

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleTabClick = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="bg-blue-50 font-[Poppins] min-h-screen flex">
      <div
        className={`sidebar fixed top-0 bottom-0 lg:left-0 ${isSidebarOpen ? 'left-0' : 'left-[-300px]'} duration-1000 p-2 w-[300px] overflow-y-auto text-center bg-gray-900 shadow h-screen`}
      >
        <div className="text-gray-100 text-xl">
          <div className="p-2.5 mt-1 flex items-center rounded-md">
            <i className="bi bi-app-indicator px-2 py-1 bg-blue-600 rounded-md"></i>
            <h1 className="text-[15px] ml-3 text-xl text-gray-200 font-bold">Tailwindbar</h1>
            <button className="bi bi-x ml-20 cursor-pointer lg:hidden" onClick={toggleSidebar}></button>
          </div>
          <hr className="my-2 text-gray-600" />
          <div>
            <div
              className={`p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer ${currentView === 'addstudent' ? 'bg-gray-700' : 'hover:bg-blue-600'}`}
              onClick={() => handleTabClick('addstudent')}
            >
              <i className="bi bi-person-add"></i>
              <span className="text-[15px] ml-4 text-gray-200">Add Student</span>
            </div>
            <div
              className={`p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer ${currentView === 'studentlist' ? 'bg-gray-700' : 'hover:bg-blue-600'}`}
              onClick={() => handleTabClick('studentlist')}
            >
              <i className="bi bi-bookmark-fill"></i>
              <span className="text-[15px] ml-4 text-gray-200">Student List</span>
            </div>
            <div
              className={`p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer ${currentView === 'addslot' ? 'bg-gray-700' : 'hover:bg-blue-600'}`}
              onClick={() => handleTabClick('addslot')}
            >
              <i className="bi bi-plus-circle-fill"></i>
              <span className="text-[15px] ml-4 text-gray-200">Add Slot</span>
            </div>
            <div
              className={`p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer ${currentView === 'schedule' ? 'bg-gray-700' : 'hover:bg-blue-600'}`}
              onClick={() => handleTabClick('schedule')}
            >
              <i className="bi bi-calendar-event-fill"></i>
              <span className="text-[15px] ml-4 text-gray-200">Request</span>
            </div>

            <hr className="my-4 text-gray-600" />
            
            <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600">
              <i className="bi bi-box-arrow-in-right"></i>
              <span className="text-[15px] ml-4 text-gray-200">Logout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 p-4 ml-0 lg:ml-[300px] transition-all duration-300`}>
        {currentView === 'addstudent' && <AddStudent />}
        {currentView === 'studentlist' && <StudentList />}
        {currentView === 'addslot' && <SlotAdder />}
        {currentView === 'schedule' && <OdRequest />}
      </div>
    </div>
  );
};

export default Sidebar;
