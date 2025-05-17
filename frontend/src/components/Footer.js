import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white relative pt-12 pb-8">
      {/* SVG Wave Transition */}
      <svg
        className="absolute top-0 left-0 w-full"
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#1a202c" /* Matches the Corporate Section Background */
          d="M0,96L60,117.3C120,139,240,181,360,170.7C480,160,600,96,720,85.3C840,75,960,117,1080,144C1200,171,1320,181,1380,186.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        />
      </svg>

      {/* Footer Content */}
      <div className="container mx-auto px-6 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start">
            <a href="/">
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/FranctionaX (Test).svg`}
                alt="FractionaX Logo"
                className="w-80 mb-0"
              />
            </a>
            <p className="text-sm text-gray-400">
              Revolutionizing investments through fractional ownership and
              blockchain-powered transparency.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h6 className="text-lg font-bold mb-4">Company</h6>
            <ul className="space-y-2">
              <li>
                <a className="hover:text-blue-500 transition" href="#about">
                  About Us
                </a>
              </li>
              <li>
                <a className="hover:text-blue-500 transition" href="#contact">
                  Contact Us
                </a>
              </li>
              <li>
                <a className="hover:text-blue-500 transition" href="#career">
                  Careers
                </a>
              </li>
              <li>
                <a className="hover:text-blue-500 transition" href="#services">
                  Services
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h6 className="text-lg font-bold mb-4">Resources</h6>
            <ul className="space-y-2">
              <li>
                <a className="hover:text-blue-500 transition" href="#case-studies">
                  Case Studies
                </a>
              </li>
              <li>
                <a className="hover:text-blue-500 transition" href="#pricing">
                  Pricing
                </a>
              </li>
              <li>
                <a className="hover:text-blue-500 transition" href="#blog">
                  Blog
                </a>
              </li>
              <li>
                <a className="hover:text-blue-500 transition" href="#stories">
                  Success Stories
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter and Social Links */}
          <div>
            <h6 className="text-lg font-bold mb-4">Stay Connected</h6>
            <form className="flex mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-l-lg bg-gray-800 text-white focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-r-lg transition"
              >
                <i className="bi bi-send-fill"></i>
              </button>
            </form>
            <p className="text-sm text-gray-400 mb-4">No spam, we promise!</p>
            <ul className="flex space-x-4">
              <li>
                <a className="hover:text-blue-500" href="#">
                  <i className="bi bi-facebook"></i>
                </a>
              </li>
              <li>
                <a className="hover:text-blue-500" href="#">
                  <i className="bi bi-instagram"></i>
                </a>
              </li>
              <li>
                <a className="hover:text-blue-500" href="#">
                  <i className="bi bi-twitter"></i>
                </a>
              </li>
              <li>
                <a className="hover:text-blue-500" href="#">
                  <i className="bi bi-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <hr className="border-gray-700 mb-6" />
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} FractionaX. Built by{" "}
            <a href="https://fractionax.com" className="hover:text-blue-500">
              FractionaX
            </a>.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a className="hover:text-blue-500" href="#privacy-policy">
              Privacy Policy
            </a>
            <a className="hover:text-blue-500" href="#terms">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
