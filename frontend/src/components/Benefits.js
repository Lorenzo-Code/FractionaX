import React from "react";
import { motion } from "framer-motion";

const Benefits = () => {
  const benefits = [
    {
      title: "Democratized Investments",
      description:
        "Access high-value assets like real estate with fractional ownership, making investing more inclusive than ever.",
      icon: "people",
    },
    {
      title: "Dual-Token Ecosystem",
      description:
        "Leverage FCT for platform access and FST for ownership of tokenized assets, ensuring flexibility and utility.",
      icon: "currency-exchange",
    },
    {
      title: "Blockchain-Powered Security",
      description:
        "Built on Hedera Hashgraph, offering unmatched security, scalability, and trust for all your transactions.",
      icon: "shield-check",
    },
    {
      title: "Passive Income Opportunities",
      description:
        "Earn rental income, capital gains, and enjoy liquidity through secondary markets for tokenized assets.",
      icon: "cash-coin",
    },
    {
      title: "Regulatory Compliance",
      description:
        "Integrated KYC/AML protocols and adherence to SEC regulations ensure secure and compliant participation.",
      icon: "file-earmark-check",
    },
  ];

  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-gray-900 relative">
      {/* Section Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-white text-transparent bg-clip-text">
          Benefits of FractionaX
        </h2>
        <p className="text-lg mt-4 text-gray-300">
          Discover why FractionaX is the trusted platform for modern investors.
        </p>
      </motion.div>

      {/* Vertical Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-500 hidden md:block"></div>

      {/* Alternating Benefits */}
      <div className="space-y-12 relative z-10">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            className={`flex flex-col md:flex-row items-center ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            } group`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            {/* Icon */}
            <div className="relative w-16 h-16 bg-blue-500 text-white flex items-center justify-center rounded-full text-3xl mb-4 md:mb-0 mx-auto md:mx-0 md:mr-6 transform group-hover:scale-125 transition-transform duration-300">
              <i className={`bi bi-${benefit.icon}`}></i>
              {/* Connecting Line */}
              <div
                className={`absolute top-full h-12 w-1 bg-blue-500 ${
                  index === benefits.length - 1 ? "hidden" : ""
                }`}
              ></div>
            </div>
            {/* Content */}
            <div className="text-center md:text-left max-w-md p-4 bg-gray-800 rounded-lg shadow-md group-hover:shadow-xl group-hover:bg-gray-700 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-300">
                {benefit.title}
              </h3>
              <p className="text-gray-300">{benefit.description}</p>
            </div>
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
          Explore Benefits
        </motion.button>
      </div>
    </section>
  );
};

export default Benefits;
