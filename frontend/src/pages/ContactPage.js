import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactPage = () => {
  return (
    <div style={{ backgroundColor: "rgb(25, 29, 43)", color: "#ffffff" }}>
      {/*NavBar */}
      <Navbar />

      {/* Hero Section */}
      <section className="py-25 px-6 text-center bg-gradient-to-r from-blue-500 to-purple-600">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-base md:text-xl text-white">
            We'd love to hear from you. Reach out with your questions or feedback!
          </p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-15 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            className="bg-gray-800 p-6 rounded-lg shadow-lg w-full md:max-w-md mx-auto"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-white">Send Us a Message</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-300 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-300 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 rounded-lg text-white hover:from-purple-600 hover:to-blue-600 transition duration-200"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="bg-gray-800 p-6 rounded-lg shadow-lg md:max-w-md mx-auto"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-white">Our Contact Info</h2>
            <ul className="space-y-4">
              <li>
                <i className="bi bi-envelope text-blue-500 mr-2"></i>
                <a
                  href="mailto:support@fractionax.com"
                  className="hover:text-blue-300"
                >
                  support@fractionax.io
                </a>
              </li>
              <li>
                <i className="bi bi-phone text-blue-500 mr-2"></i>
                <a
                  href="tel:+1234567890"
                  className="hover:text-blue-300"
                >
                  +1 713-309-6573
                </a>
              </li>
              <li>
                <i className="bi bi-geo-alt text-blue-500 mr-2"></i>
                Houston, Texas, USA
              </li>
            </ul>

            {/* Social Media Links */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-white mb-4">Follow Us</h3>
              <ul className="flex space-x-4">
                <li>
                  <a className="hover:text-blue-300" href="#">
                    <i className="bi bi-facebook"></i>
                  </a>
                </li>
                <li>
                  <a className="hover:text-blue-300" href="#">
                    <i className="bi bi-instagram"></i>
                  </a>
                </li>
                <li>
                  <a className="hover:text-blue-300" href="#">
                    <i className="bi bi-twitter"></i>
                  </a>
                </li>
                <li>
                  <a className="hover:text-blue-300" href="#">
                    <i className="bi bi-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 px-15 md:px-12 lg:px-24">
        <motion.div
          className="rounded-lg overflow-hidden shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <iframe
            title="Company Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093983!2d144.9559258153779!3d-37.817209979751504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf0727e2f1b1d7c8c!2sMelbourne!5e0!3m2!1sen!2sau!4v1614727705389!5m2!1sen!2sau"
            width="100%"
            height="350"
            className="rounded-lg"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </motion.div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage;
