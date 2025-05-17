import React from "react";
import { motion } from "framer-motion";

const BusinessModel = () => {
  const businessModelDetails = [
    {
      title: "Revenue Streams",
      points: [
        "Transaction Fees: 1.5% on trades and tokenized asset investments.",
        "FCT Transfer Fees: A flat $0.015 fee per transfer.",
        "Staking Rewards: Derived from platform revenues and treasury investments.",
        "Asset Management Fees: 1–2% annually on tokenized property values.",
        "Performance-Based Commission: Up to 5% on property sales.",
      ],
    },
    {
      title: "Investment Opportunities",
      points: [
        "Tokenization of high-value assets, including real estate, luxury goods, art, and renewable energy.",
        "Monthly Reg CF campaigns enable participation from non-accredited investors.",
        "Opportunities expand as the platform scales to include diverse asset classes and geographies.",
      ],
    },
    {
      title: "Scaling Beyond Reg CF",
      points: [
        "Transition to Regulation A+, raising up to $75 million annually.",
        "Broaden asset base and geographic reach to attract global investors.",
        "Integrate advanced tokenization strategies for seamless operations.",
      ],
    },
  ];

  return (
    <section
      className="py-16 px-6 md:px-12 lg:px-24"
      style={{ backgroundColor: "rgb(25, 29, 43)" }}
    >
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-white text-transparent bg-clip-text">
          Business Model
        </h2>
        <p className="text-lg mt-4 text-gray-300">
          Discover how FractionaX creates value and scales for future growth.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {businessModelDetails.map((item, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 p-6 rounded-lg shadow-lg text-center hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-white">
              {item.title}
            </h3>
            <ul className="text-gray-300 list-disc list-inside">
              {item.points.map((point, idx) => (
                <li key={idx} className="mb-2 text-left">
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BusinessModel;
