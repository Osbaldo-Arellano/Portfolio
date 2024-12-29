import React from 'react';
import { Outlet } from 'react-router-dom';
import { HomeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

function RootLayout() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-gray-200 border border-gray-400 shadow-inner">
      {/* Top Navigation */}
      <div className="flex items-center justify-between bg-gray-300 border-b border-gray-400 h-10 px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
        {/* External SVG File */}
          <img
            src="src/assets/Computer-Icon.png" // Path to your SVG file
            alt="Logo"
            className="h-6 w-6"
          />
        </div>


        {/* Links */}
        <div className="flex gap-4">
          <a
            href="https://open.spotify.com/playlist/your-playlist-id" // Replace with your Spotify playlist URL
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-gray-600 text-sm font-medium"
          >
            🎵 Spotify
          </a>
          <a
            href="https://github.com" // Replace with another link
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-gray-600 text-sm font-medium"
          >
            🐙 GitHub
          </a>
        </div>
      </div>

      {/* Sidebar and Main Content */}
      <div className="flex flex-grow">
        {/* Sidebar Navigation */}
        <nav className="bg-gray-300 border-r border-gray-400 w-30 flex flex-col py-4 space-y-4">
          {/* Header */}
          <div className="bg-gray-400 px-3 py-2 text-sm font-bold text-black">
            📂
          </div>

          {/* Home Button */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 text-black hover:bg-gray-200 border-b border-gray-400 transition-all"
          >
            <HomeIcon className="h-5 w-5 text-black" />
          </button>

          {/* Contact Button */}
          <button
            onClick={() => navigate('/contact')}
            className="flex items-center gap-2 px-4 py-2 text-black hover:bg-gray-200 border-b border-gray-400 transition-all"
          >
            <PhoneIcon className="h-5 w-5 text-black" />
          </button>
        </nav>

        {/* ======== Main Content: Dynamic per route ======== */}
        <div className="flex-1 bg-gray-100 border-l border-gray-400 overflow-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default RootLayout;
