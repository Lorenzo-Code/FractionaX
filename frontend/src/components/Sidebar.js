import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { FaHome, FaChartBar, FaUser, FaCog } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, link: "/dashboard" },
    { name: "Investment Explorer", icon: <FaChartBar />, link: "/dashboard/investment-explorer" },
    { name: "Staking Rewards", icon: <FaCog />, link: "/dashboard/staking-page" },
    { name: "Social", icon: <FaCog />, link: "/dashboard/social-page" },
    { name: "Profile", icon: <FaUser />, link: "/dashboard/profile" },
    { name: "Settings", icon: <FaCog />, link: "/dashboard/settings" },
    { name: "Home Page", icon: <FaHome />, link: "/" },
    { name: "How It Works", icon: <FaCog />, link: "/how-it-works" },
    { name: "FAQ", icon: <FaCog />, link: "/faq" },
    { name: "Help", icon: <FaCog />, link: "/contact" },
  ];

  // Function to handle link clicks only on mobile
  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      toggleSidebar(); // Collapse sidebar only on mobile (screen width ≤ 768px)
    }
  };

  return (
    <div>
      {/* Sidebar Container */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white transform transition-transform duration-300 z-40 ${
          isCollapsed ? "-translate-x-full" : "translate-x-0"
        } w-64 md:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="p-4 flex flex-col items-center border-b border-gray-700">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/FractionaX Logo(Just the Words).svg`} // Replace with your actual logo path
            alt="FractionaX Logo"
            className="w-1/2 md:w-1/3 lg:w-3/4 h-auto" // Responsive logo size
          />
        </div>

        {/* Menu Items */}
        <PerfectScrollbar>
          <ul className="mt-4 space-y-2">
            {menuItems.map((item) => (
              <li key={item.name} className="group relative">
                <Link
                  to={item.link}
                  className={`flex items-center gap-3 p-3 text-sm font-medium rounded-md ${
                    location.pathname === item.link
                      ? "bg-blue-700 text-white"
                      : "hover:bg-gray-700"
                  } ${isCollapsed ? "justify-center" : ""}`}
                  aria-label={item.name}
                  onClick={handleLinkClick} // Collapse sidebar only on mobile
                >
                  {item.icon}
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <span className="absolute left-20 bg-gray-700 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.name}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </PerfectScrollbar>
      </div>
    </div>
  );
};

export default Sidebar;
