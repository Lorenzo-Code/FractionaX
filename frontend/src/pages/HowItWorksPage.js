import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HowItWorksPage = () => {
  const steps = [
    {
      title: "Sign Up & Verify",
      description:
        "Create an account and complete KYC/AML verification to gain secure access to premium investment opportunities.",
      icon: "person-check",
    },
    {
      title: "Browse & Choose",
      description:
        "Explore our curated list of tokenized assets, including real estate, luxury goods, and more. Select the investments that align with your goals.",
      icon: "search",
    },
    {
      title: "Invest & Earn",
      description:
        "Purchase fractional shares of tokenized assets. Earn rental income, capital gains, and enjoy liquidity through our secondary market.",
      icon: "graph-up-arrow",
    },
  ];

  const faqs = [
    {
      question: "What is fractional ownership?",
      answer:
        "Fractional ownership allows you to own a portion of high-value assets, such as real estate, by purchasing tokenized shares.",
    },
    {
      question: "How secure is the platform?",
      answer:
        "FractionaX is built on Hedera Hashgraph, offering enterprise-grade security and transparency for all transactions.",
    },
    {
      question: "What are the investment requirements?",
      answer:
        "You can start investing with as little as $100, making premium opportunities accessible to everyone.",
    },
  ];

  return (
    <div style={{ backgroundColor: "rgb(25, 29, 43)", color: "#ffffff" }}>
      {/*NavBar Section */}
      < Navbar />
      {/* Hero Section */}
      <section className="py-16 px-6 md:px-12 lg:px-24 text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-white text-transparent bg-clip-text"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          How FractionaX Works
        </motion.h1>
        <p className="text-lg md:text-xl mb-8 text-gray-300">
          Discover our simple, transparent, and scalable process for accessing
          premium investments.
        </p>
        <a
          href="/signup"
          className="bg-blue-500 px-6 py-3 rounded-lg text-white font-medium hover:bg-blue-600 transition duration-200"
        >
          Get Started
        </a>
      </section>

      {/* Steps Section */}
      <section className="py-16 px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg text-center hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="w-16 h-16 bg-blue-500 text-white flex items-center justify-center rounded-full text-3xl mb-4 mx-auto">
                <i className={`bi bi-${step.icon}`}></i>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                {step.title}
              </h3>
              <p className="text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 md:px-12 lg:px-24">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-blue-500 to-white text-transparent bg-clip-text text-center"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <h3 className="text-lg font-semibold mb-2 text-white">
                {faq.question}
              </h3>
              <p className="text-gray-300">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-12 lg:px-24 text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-white text-transparent bg-clip-text"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          Ready to Start Investing?
        </motion.h2>
        <a
          href="/signup"
          className="bg-purple-500 px-6 py-3 rounded-lg text-white font-medium hover:bg-purple-600 transition duration-200"
        >
          Get Started Now
        </a>
      </section>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
