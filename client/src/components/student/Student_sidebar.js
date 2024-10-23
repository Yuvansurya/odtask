import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import SelectSlot from './Select_slot';
import Slot from './Slot'; // Import your Slot component

const Student_sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');

  console.log(localStorage.getItem('user'));
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Function to change the view and apply active styles
  const handleTabClick = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="bg-blue-50 font-[Poppins] min-h-screen flex">
      {/* Sidebar */}
      <div
        className={`sidebar fixed top-0 bottom-0 lg:left-0 ${
          isSidebarOpen ? 'left-0' : 'left-[-300px]'
        } duration-1000 p-2 w-[300px] overflow-y-auto text-center bg-gray-900 shadow h-screen`}
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
              className={`p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer ${
                currentView === 'home' ? 'bg-gray-700' : 'hover:bg-blue-600'
              }`}
              onClick={() => handleTabClick('home')}
            >
              <i className="bi bi-calendar"></i> {/* New icon for Slots */}
              <span className="text-[15px] ml-4 text-gray-200">Slots</span>
            </div>
            <div
              className={`p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer ${
                currentView === 'slot' ? 'bg-gray-700' : 'hover:bg-blue-600'
              }`}
              onClick={() => handleTabClick('slot')}
            >
              <i className="bi bi-calendar-check"></i>
              <span className="text-[15px] ml-4 text-gray-200">Status</span>
            </div>
            <hr className="my-4 text-gray-600" />
            <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600">
              <i className="bi bi-box-arrow-in-right"></i> {/* Previous icon for Logout */}
              <span className="text-[15px] ml-4 text-gray-200">Logout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 p-4 ml-0 lg:ml-[300px] transition-all duration-300`}>
        {currentView === 'home' && <SelectSlot />}
        {currentView === 'slot' && <Slot />} {/* Render the Slot component */}
        {/* Add additional conditional rendering for other components here */}
      </div>
    </div>
  );
};

export default Student_sidebar;
