import React from "react";
import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      title: "Fractional Ownership & Passive Income",
      description: (
        <>
          Invest in <strong className="text-blue-300">high-value assets</strong>{" "}
          with as little as <strong className="text-blue-300">$100</strong> and
          earn <strong className="text-blue-300">rental income</strong> and{" "}
          <strong className="text-blue-300">capital appreciation</strong> with
          tokenized properties, enabling steady financial growth.
        </>
      ),
      icon: "pie-chart",
    },
    {
      title: "Dual-Token & Regulatory Compliance",
      description: (
        <>
          Leverage <strong className="text-blue-300">FCT</strong> for platform
          access and <strong className="text-blue-300">FST</strong> for
          ownership of tokenized assets while staying{" "}
          <strong className="text-blue-300">compliant</strong> with{" "}
          <strong className="text-blue-300">SEC regulations</strong> and
          integrated <strong className="text-blue-300">KYC/AML protocols</strong>.
        </>
      ),
      icon: "currency-exchange",
    },
    {
      title: "Blockchain Transparency",
      description: (
        <>
          Built on <strong className="text-blue-300">Hedera Hashgraph</strong>{" "}
          for unmatched <strong className="text-blue-300">security</strong>,{" "}
          <strong className="text-blue-300">scalability</strong>, and{" "}
          <strong className="text-blue-300">trust</strong> in every transaction.
        </>
      ),
      icon: "lock",
    },
  ];

  return (
    <section
      className="py-16 px-6 md:px-12 lg:px-24"
      style={{ backgroundColor: "rgb(25, 29, 43)" }}
    >
      {/* Headline */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-white text-transparent bg-clip-text">
          Why Choose FractionaX?
        </h2>
        <p className="text-lg mt-4 text-gray-300">
          Our platform offers unique features to help you build wealth with
          confidence.
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 p-6 rounded-lg shadow-lg text-center hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            {/* Icon */}
            <div className="grid place-items-center">
              <div className="w-16 h-16 bg-blue-500 text-white flex items-center justify-center rounded-full text-3xl mb-4">
                <i className={`bi bi-${feature.icon}`}></i>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold mb-4 text-white">
              {feature.title}
            </h3>
            {/* Description */}
            <p className="text-gray-300">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium"
        >
          Explore Our Features
        </motion.button>
      </div>
    </section>
  );
};

export default Features;
