// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-indigo-600 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <Link to="/" className="text-2xl font-bold">
            MyPortfolio
          </Link>

          {/* Hamburger Icon (Mobile) */}
          <button
            className="block md:hidden focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                // "X" icon
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 5h16v2H4zM4 11h16v2H4zM4 17h16v2H4z"
                  transform="rotate(45 12 12)"
                />
              ) : (
                // Hamburger icon
                <path fillRule="evenodd" d="M4 5h16v2H4zM4 11h16v2H4zM4 17h16v2H4z" />
              )}
            </svg>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="hover:bg-indigo-500 px-3 py-2 rounded">
              Home
            </Link>
            <Link to="/about" className="hover:bg-indigo-500 px-3 py-2 rounded">
              About
            </Link>
            <Link to="/projects" className="hover:bg-indigo-500 px-3 py-2 rounded">
              Projects
            </Link>
            <Link to="/contact" className="hover:bg-indigo-500 px-3 py-2 rounded">
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-indigo-700">
          <Link
            to="/"
            className="block px-4 py-2 hover:bg-indigo-500"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block px-4 py-2 hover:bg-indigo-500"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/projects"
            className="block px-4 py-2 hover:bg-indigo-500"
            onClick={() => setIsOpen(false)}
          >
            Projects
          </Link>
          <Link
            to="/contact"
            className="block px-4 py-2 hover:bg-indigo-500"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
