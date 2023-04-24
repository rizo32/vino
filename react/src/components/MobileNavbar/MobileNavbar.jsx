import React from "react";
import { Link } from "react-router-dom";
import logoShort from './img/Cthick.png';

const MobileNavbar = () => {
  return (
    <nav className="fixed w-full bg-white h-16 shadow-shadow-tiny flex items-center justify-between px-8 z-50">
      <div className="text-xl font-bold">
        <Link to="/cellar">
          {/* Logo */}
          <img src={logoShort} alt="logo" className="h-8" />
        </Link>
      </div>

      {/* Right-side icons */}
      <div className="flex items-center">
        {/* Magnifying glass icon */}
        <button className="text-gray-600 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>

        {/* Hamburger menu icon */}
        <button className="text-gray-600 focus:outline-none ml-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default MobileNavbar;
