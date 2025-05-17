import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/FractionaX Logo(Just the Logo).svg`}
              alt="FractionaX Logo"
              className="h-8 md:h-10"
            />
          </div>

          {/* Navigation Links for Desktop */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-blue-300 transition duration-200">
              Home
            </Link>
            {/* <Link
              to="/investments"
              className="hover:text-blue-300 transition duration-200"
            >
              Investments
            </Link> */}
            <Link
              to="/how-it-works"
              className="hover:text-blue-300 transition duration-200"
            >
              How It Works
            </Link>
            <Link
              to="/faq"
              className="hover:text-blue-300 transition duration-200"
            >
              FAQ
            </Link>
            <Link
              to="/about"
              className="hover:text-blue-300 transition duration-200"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="hover:text-blue-300 transition duration-200"
            >
              Contact Us
            </Link>
            {/* <Link
              to="/dashboard"
              className="hover:text-blue-300 transition duration-200"
            >
              Dashboard
            </Link> */}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block ml-6">
            <Link
              to="/auth"
              className="bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-2 rounded-lg text-white hover:from-purple-600 hover:to-blue-600 transition duration-200"
            >
              Login/SignUp
            </Link>
          </div>

          {/* Hamburger Menu Button */}
          <div className="md:hidden">
            <button
              className="text-white focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <i className={`bi bi-${isMenuOpen ? "x" : "list"} text-3xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="bg-gray-800 md:hidden">
          <div className="flex flex-col space-y-4 px-4 py-6">
            <Link to="/" className="hover:text-blue-300 transition duration-200">
              Home
            </Link>
            {/* <Link
              to="/investments"
              className="hover:text-blue-300 transition duration-200"
            >
              Investments
            </Link> */}
            <Link
              to="/how-it-works"
              className="hover:text-blue-300 transition duration-200"
            >
              How It Works
            </Link>
            <Link
              to="/faq"
              className="hover:text-blue-300 transition duration-200"
            >
              FAQ
            </Link>
            <Link
              to="/about"
              className="hover:text-blue-300 transition duration-200"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="hover:text-blue-300 transition duration-200"
            >
              Contact Us
            </Link>
            {/* <Link
              to="/dashboard/investment-explorer"
              className="hover:text-blue-300 transition duration-200"
            >
              Dashboard
            </Link> */}
            <Link
              to="/auth"
              className="bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-2 rounded-lg text-white hover:from-purple-600 hover:to-blue-600 transition duration-200"
            >
              Login/SignUp
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
