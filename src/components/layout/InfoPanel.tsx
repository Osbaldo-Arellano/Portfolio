// src/components/layout/InfoPanel.tsx
import React from 'react';

function InfoPanel() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-blue-50 to-blue-100 p-6 flex flex-col items-center justify-center rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <img
        src="src/assets/me.png"
        alt="Profile"
        className="w-32 h-32 rounded-full shadow-md hover:scale-105 transition-transform duration-300"
      />
      <h2 className="text-2xl font-extrabold text-gray-800 mt-4">
        👋 Osbaldo Arellano
      </h2>
      <p className="text-base text-gray-600 mt-2">
        💻 Computer Science <br /> 🦫 Oregon State University
      </p>
      <div className="mt-4 flex gap-2">
        <a
          href="https://www.linkedin.com/in/osbaldoarellano/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 flex items-center gap-2"
        >
          🌐 LinkedIn
        </a>
        <a
          href="https://github.com/Osbaldo-Arellano"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-900 transition-all duration-300 flex items-center gap-2"
        >
          🐙 GitHub
        </a>
      </div>
    </div>
  );
}

export default InfoPanel;
