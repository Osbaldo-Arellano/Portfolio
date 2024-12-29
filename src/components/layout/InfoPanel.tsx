import React from 'react';

function InfoPanel() {
  return (
    <div className="w-full h-full bg-gray-200 p-4 border border-gray-400 shadow-inner">
      {/* Header */}
      <div className="bg-gray-300 border-b border-gray-400 px-3 py-2 text-sm font-bold text-black">
        📄 Welcome to my portfolio
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center p-4">
        {/* Profile Image */}
        <img
          src="src/assets/me.png"
          alt="Profile"
          className="w-24 h-24 border border-gray-400 shadow-md mb-4"
        />

        {/* Name */}
        <h2 className="text-lg font-bold text-black text-center tracking-wide mb-2">
          👋 Osbaldo Arellano
        </h2>

        {/* Description */}
        <p className="text-sm text-black text-center leading-relaxed mb-4">
          💻 Computer Science <br /> 🦫 Oregon State University
        </p>

        {/* Social Links */}
        <div className="flex flex-col gap-2 w-full">
          <a
            href="https://www.linkedin.com/in/osbaldoarellano/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-start bg-gray-300 text-black px-3 py-1 border border-gray-400 hover:bg-gray-200 transition-all text-sm"
          >
            🌐 LinkedIn
          </a>
          <a
            href="https://github.com/Osbaldo-Arellano"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-start bg-gray-300 text-black px-3 py-1 border border-gray-400 hover:bg-gray-200 transition-all text-sm"
          >
            🐙 GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

export default InfoPanel;
