import React from "react";
import { motion } from "framer-motion";
import "bootstrap-icons/font/bootstrap-icons.css";

const HowItWorks = () => {
  const phases = [
    {
      phase: "Phase 1",
      title: "Sign Up & Verify",
      description:
        "Create an account and complete KYC/AML verification to gain secure access to premium investment opportunities.",
    },
    {
      phase: "Phase 2",
      title: "Browse & Choose",
      description:
        "Explore our curated list of tokenized assets, including real estate, luxury goods, and more. Select the investments that align with your goals.",
    },
    {
      phase: "Phase 3",
      title: "Invest & Earn",
      description:
        "Purchase fractional shares of tokenized assets. Earn rental income, capital gains, and enjoy liquidity through our secondary market.",
    },
    {
      phase: "Phase 4",
      title: "Track & Grow",
      description:
        "Monitor your portfolio and maximize returns through our transparent dashboard and advanced analytics tools.",
    },
  ];

  return (
    <section
      className="py-16 px-6 md:px-12 lg:px-24"
      style={{ backgroundColor: "rgb(25, 29, 43)" }}
    >
      {/* Section Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-white text-transparent bg-clip-text">
          How FractionaX Works
        </h2>
        <p className="text-lg mt-4 text-gray-300">
          Simplifying investments with our transparent and scalable platform.
        </p>
      </motion.div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {phases.map((phase, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 p-6 rounded-lg shadow-lg text-center flex flex-col items-center hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            {/* Phase Number */}
            <div className="w-16 h-16 bg-blue-500 text-white flex items-center justify-center rounded-full text-2xl font-bold mb-4">
              {index + 1}
            </div>
            {/* Phase Title */}
            <h3 className="text-xl font-semibold mb-2 text-white">
              {phase.title}
            </h3>
            {/* Phase Description */}
            <p className="text-gray-300">{phase.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
