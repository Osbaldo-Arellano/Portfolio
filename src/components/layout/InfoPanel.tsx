import React, { useState } from 'react';

function InfoPanel() {
  const [isCollapsed, setIsCollapsed] = useState(true); // Collapsed by default

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

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
          Osbaldo Arellano
        </h2>

        {/* Description */}
        <p className="text-sm text-black text-center leading-relaxed mb-4">
          💻 Computer Science <br /> Oregon State University
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
          <a
            href="https://blogs.oregonstate.edu/ozzythecomputerguy/about-me/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-start bg-gray-300 text-black px-3 py-1 border border-gray-400 hover:bg-gray-200 transition-all text-sm"
          >
            🖥️ OSU Blog
          </a>
        </div>

        {/* Spotify Embed */}
        {/* <div className="w-full mt-2">
          <div
            className="flex items-center justify-between bg-gray-300 text-black px-3 py-1 border border-gray-400 hover:bg-gray-200 cursor-pointer text-sm"
            onClick={toggleCollapse}
          >
            <span className="flex items-center gap-2">
              🎵 <strong>My Playlist</strong>
            </span>
            <span className="flex items-center">
              {isCollapsed ? (
                <div className="w-4 h-4 bg-blue-500 border border-gray-700 flex items-center justify-center text-xs">
                  ▼
                </div>
              ) : (
                <div className="w-4 h-4 bg-blue-500 border border-gray-700 flex items-center justify-center text-xs">
                  ▲
                </div>
              )}
            </span>
          </div>
          {!isCollapsed && (
            <div className="bg-gray-300 border border-gray-400 mt-1 p-2">
              <iframe
                className="spotify-embed"
                src="https://open.spotify.com/embed/playlist/7Afy13yvZVfjzuCpUfqrgP?utm_source=generator"
                width="100%"
                height="352"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </div>
          )}
        </div> */}

      </div>
    </div>
  );
}

export default InfoPanel;
