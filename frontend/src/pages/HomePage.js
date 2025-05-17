import React from "react";
import FaqSection from "../components/FaqSection";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import CorporateStructure from "../components/CorporateStructure";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import Benefits from "../components/Benefits";
import Navbar from "../components/Navbar";



const HomePage = () => {
  return (
    <div style={{ backgroundColor: "rgb(25, 29, 43)", color: "#ffffff" }}>
      {/*NavBar */}
      <Navbar />


      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <section className="relative py-16 px-6 md:px-12 lg:px-24 text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-white text-transparent bg-clip-text"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          About FractionaX
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          FractionaX, a blockchain-powered platform revolutionizing access to premium investments through fractional ownership. 
          By leveraging cutting-edge technology and a dual-token ecosystem, FractionaX bridges the gap between traditional investing and the digital economy. 
          Built on Hedera Hashgraph, the platform delivers unparalleled scalability, security, and transparency, enabling investors to participate in high-value assets like real estate while maintaining compliance with global regulations.
        </motion.p>
      </section>

      {/* Features Section */}
      <Features />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Benefits Section */}
      <Benefits />

      {/* CorporteStructure */}
      <CorporateStructure />


      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;