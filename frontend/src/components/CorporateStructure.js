import React from "react";
import { motion } from "framer-motion";

const CorporateStructure = () => {
  const structure = [
    {
      name: "FractionaX Corp",
      description:
        "Oversees strategic direction, intellectual property, and global operations.",
      type: "Parent Company",
    },
    {
      name: "FractionaX Marketplace LLC",
      description:
        "Manages the fractional investment platform and ensures compliance.",
      type: "Subsidiary",
    },
    {
      name: "FCT Token Ltd",
      description:
        "Issues and manages FCT and FST tokens, operating in favorable regulatory jurisdictions.",
      type: "Subsidiary",
    },
    {
      name: "FractionaX R&D Inc.",
      description:
        "Drives blockchain innovation and secures intellectual property.",
      type: "Subsidiary",
    },
  ];

  return (
    <section
      className="py-16 px-6 md:px-12 lg:px-24 relative bg-gray-900 overflow-hidden"
    >
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-500 to-purple-500 opacity-20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-500 to-purple-500 opacity-20 rounded-full filter blur-3xl"></div>

      {/* Section Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-white text-transparent bg-clip-text">
          Corporate Structure
        </h2>
        <p className="text-lg mt-4 text-gray-300">
          Discover the framework behind FractionaX’s global operations.
        </p>
      </motion.div>

      {/* Vertical Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-4 border-blue-500"></div>

        {/* Timeline Items */}
        {structure.map((entity, index) => (
          <motion.div
            key={index}
            className={`relative flex flex-col items-center text-center mb-16 ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            {/* Connector Dot */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-500 rounded-full z-10 border-4 border-gray-900"></div>

            {/* Entity Content */}
            <motion.div
              className={`bg-gray-800 p-6 rounded-lg shadow-lg md:max-w-md ${
                index % 2 === 0 ? "ml-12" : "mr-12"
              } group`}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgb(31, 41, 55)", // Slightly brighter
                transition: { duration: 0.3 },
              }}
            >
              <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-300">
                {entity.name}
              </h3>
              <p className="text-gray-300">{entity.description}</p>
              <span className="text-sm text-gray-500 mt-4 inline-block">
                {entity.type}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CorporateStructure;
