// src/components/layout/RootLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { HomeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

function RootLayout() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">

      <nav className="bg-gray-900 text-white w-16 flex flex-col items-center py-4 space-y-6">
        {/* Home */}
        <button onClick={() => navigate('/')} className="hover:text-gray-300">
          <HomeIcon className="h-6 w-6" />
        </button>

        {/* Contact */}
        <button onClick={() => navigate('/contact')} className="hover:text-gray-300">
          <PhoneIcon className="h-6 w-6" />
        </button>
      </nav>

      {/* ======== MAIN CONTENT: Changes per route ======== */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;
