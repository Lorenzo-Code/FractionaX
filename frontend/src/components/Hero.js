import React, { useEffect } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  useEffect(() => {
    if (window.particlesJS) {
      // Initialize particles.js
      window.particlesJS("particles-js", {
        particles: {
          number: {
            value: 50,
            density: { enable: true, value_area: 800 },
          },
          color: { value: "#ffffff" },
          shape: {
            type: "circle",
            stroke: { width: 0, color: "#000000" },
          },
          opacity: {
            value: 0.5,
            random: false,
          },
          size: {
            value: 3,
            random: true,
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true,
          },
          modes: {
            repulse: { distance: 100, duration: 0.4 },
            push: { particles_nb: 4 },
          },
        },
        retina_detect: true,
      });
    } else {
      console.error("particlesJS is not available on window.");
    }
  }, []);

  return (
    <div
      className="relative min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "rgb(25, 29, 43)" }}
    >
      {/* Particles.js Container */}
      <div
        id="particles-js"
        className="absolute inset-0"
        style={{ zIndex: 1 }}
      ></div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 text-center px-6 text-white"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Logo Animation */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/FractionaX Logo(Just the Words).svg`}
            alt="FractionaX Logo"
            className="w-2/3 md:w-1/2 lg:w-1/3"
          />
        </motion.div>

        {/* Hero Title and Subtitle */}
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-white text-transparent bg-clip-text"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Revolutionizing Investment
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl mb-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Welcome to FractionaX - Your gateway to premium investments made
          accessible through fractional ownership.
        </motion.p>

        {/* Buttons with Hover Animation */}
        <div className="flex space-x-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium"
          >
            Learn More
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg text-white font-medium"
          >
            Get Started
          </motion.button>
        </div>
      </motion.div>

      {/* Decorative Wave */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#ffffff"
          d="M0,128L48,133.3C96,139,192,149,288,160C384,171,480,181,576,176C672,171,768,149,864,144C960,139,1056,149,1152,149.3C1248,149,1344,139,1392,133.3L1440,128L1440,320L0,320Z"
        />
      </svg>
    </div>
  );
};

export default Hero;
