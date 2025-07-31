import React from "react";

const HomeNavbar = () => {
  return (
    <nav className="w-full px-6 md:px-12 py-4 flex justify-between items-center bg-white shadow-sm">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-black rounded-full" /> {/* Replace with logo image if available */}
        <span className="text-lg font-semibold text-gray-900">SmartGear</span>
      </div>

      {/* Right: Links */}
      <div className="flex items-center gap-6 text-sm">
        {/* Sign Up Button */}
        <button className="px-4 py-1.5 border border-gray-300 rounded-full text-sm hover:bg-gray-100 transition">
          Sign Up
        </button>

        {/* Sign In Button */}
        <button className="px-4 py-1.5 border border-gray-300 rounded-full text-sm hover:bg-gray-100 transition">
          Sign In
        </button>
        {/* Get the App Button */}
        <button className="px-4 py-1.5 border border-gray-300 rounded-full text-sm hover:bg-gray-100 transition">
          Get the app
        </button>
      </div>
    </nav>
  );
};

export default HomeNavbar;
