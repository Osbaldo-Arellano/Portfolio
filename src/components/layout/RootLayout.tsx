import React from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function RootLayout() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-200">
      {/* Top Navigation */}
      <div className="flex items-center justify-between bg-gray-300 border-b border-gray-400 h-8 px-1 flex-shrink-0">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="src/assets/Computer-Icon.png"
            alt="Logo"
            className="h-6 w-6"
          />
        </div>
      </div>

      {/* Sidebar and Main Content */}
      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar Navigation */}
        <nav className="bg-gray-300 border-r border-gray-400 flex flex-col overflow-auto mr-1">
          <div className="bg-none px-4 py-2">
            {/* Sidebar Content */}
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-1 bg-gray-100 overflow-auto max-h-screen p-2 sm:p-1 md:p-1 lg:p-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default RootLayout;
