import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaBell, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from "../context/AuthContext"; // Import useAuth


const DashboardHeroSection = ({ isSidebarCollapsed, toggleSidebar }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  const navigate = useNavigate(); // For navigation
  const { user, logout } = useAuth(); // Access user and logout from AuthContext

  // Get full name or fallback
  const userFullName = user ? `${user.first_name}` : "User";

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`);
    setSearchQuery("");
  };

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
  };

  const goToSettings = () => {
    navigate("/dashboard/settings"); // Navigate to the settings page
  };

  // Render the user’s initials for the avatar
  const getUserInitials = () => {
    if (user && user.first_name && user.last_name) {
      return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
    }
    return "U"; // Default to "U" if user data is not available
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md w-full">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Sidebar Toggle Button + Search Bar */}
        <div className="flex items-center justify-between w-full md:w-1/3 gap-2">
          {/* Sidebar Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="text-xl p-2 bg-gray-700 rounded-md hover:bg-gray-600"
            aria-label="Toggle Sidebar"
          >
            <FaBars />
          </button>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-gray-700 rounded-full overflow-hidden flex-grow"
          >
            <input
              type="text"
              className="flex-grow p-3 text-sm bg-gray-700 text-gray-300 focus:outline-none"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 bg-blue-500 text-white hover:bg-blue-600 transition"
            >
              Search
            </button>
          </form>
        </div>

        {/* User Section */}
        <div className="hidden md:flex items-center gap-4 bg-gray-700 p-3 rounded-lg shadow-md hover:bg-gray-600 transition">
          {/* Notifications */}
          <div ref={notificationRef} className="relative">
            <button
              className="relative bg-gray-700 p-3 rounded-full flex items-center justify-center hover:bg-gray-600 transition"
              onClick={() => setShowNotifications((prev) => !prev)}
              aria-label="Toggle Notifications"
            >
              <FaBell className="text-blue-400 text-sm" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-2">
                3
              </span>
            </button>
            {showNotifications && (
              <div className="absolute bg-gray-700 text-white w-60 rounded-md mt-2 right-0 shadow-lg z-10 overflow-hidden">
                <div className="bg-gray-800 p-2 text-sm font-bold text-blue-400 border-b border-gray-600">
                  Notifications
                </div>
                <ul className="max-h-48 overflow-y-auto">
                  <li className="p-3 text-xs hover:bg-gray-600 cursor-pointer transition">
                    New staking reward received!
                  </li>
                  <li className="p-3 text-xs hover:bg-gray-600 cursor-pointer transition">
                    Solar Farm Investment is expiring soon.
                  </li>
                  <li className="p-3 text-xs hover:bg-gray-600 cursor-pointer transition">
                    New token listing: Beachfront Villa.
                  </li>
                </ul>
                <div className="bg-gray-800 p-2 text-center text-xs text-blue-400 hover:underline cursor-pointer">
                  View All
                </div>
              </div>
            )}
          </div>

          {/* User Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              className="flex items-center gap-2 bg-gray-700 p-3 rounded-lg shadow-md hover:bg-gray-600 transition"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold">
                {getUserInitials()}
              </div>
              <div>
                <p className="font-bold text-base">
                  Hi, {userFullName} {/* ✅ Updated to show user’s full name */}
                </p>
                <p className="text-xs text-blue-400">Account Settings</p>
              </div>
              <FaChevronDown className="text-blue-400 text-sm" />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-md shadow-lg z-10">
                <ul className="text-sm">
                  <li
                    className="hover:bg-gray-700 px-4 py-2 cursor-pointer"
                    onClick={goToSettings} // Link to settings page
                  >
                    Settings
                  </li>
                  <li
                    className="hover:bg-gray-700 px-4 py-2 cursor-pointer"
                    onClick={handleLogout} // Trigger logout
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeroSection;
