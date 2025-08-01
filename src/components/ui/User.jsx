import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import { authService } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import useGetAuthData from "../../hooks/useGetAuthData";

const User = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user: authUser } = useGetAuthData();
  const navigate = useNavigate();

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = async () => {
    try {
      await authService.signout();
      setTimeout(() => navigate("/signin"), 1500);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!authUser) {
    return (
      <a
        href="/signin"
        className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-6 rounded-md transition duration-300 ease-in-out text-sm sm:text-base"
      >
        Sign In
      </a>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg transition-colors focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2"
      >
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-semibold">
          {getInitials("User")}
        </div>

        {/* Dropdown Arrow */}
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <div className="py-1">
            {/* User Info */}
            <div className="px-4 py-2 text-sm text-gray-700">
              <div className="text-gray-500 text-lg font-semibold">
                {authUser.email}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-red-50 transition-colors text-red-600"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
