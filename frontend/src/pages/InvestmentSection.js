import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import TokenCalculator from "../components/TokenCalculator";
import ProgressBar from "../components/ProgressBar";

const InvestmentSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [views, setViews] = useState({}); // Track views for each property
  const [timeLeft, setTimeLeft] = useState({}); // Track countdown timers for properties
  const navigate = useNavigate();

  // Categories with required data
  const categories = [
    {
      title: "Real Estate",
      description: "Explore premium real estate investments around the globe.",
      items: [
        {
          id: 1,
          name: "Luxury Apartment in NYC",
          image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", // Replace with your URL
          location: "New York, USA",
        },
        {
          id: 2,
          name: "Beachfront Villa",
          image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae", // Replace with your URL
          location: "Malibu, USA",
        },
        {
          id: 3,
          name: "Modern Loft",
          image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", // Replace with your URL
          location: "London, UK",
        },
      ],
    },
    {
      title: "Renewable Energy",
      description: "Invest in the future with renewable energy projects.",
      items: [
        {
          id: 4,
          name: "Solar Farm",
          image: "https://images.unsplash.com/photo-1501451552927-6d1b209e54bc", // Replace with your URL
          location: "Arizona, USA",
        },
        {
          id: 5,
          name: "Wind Turbine Park",
          image: "https://images.unsplash.com/photo-1501666102708-5bc78a7c7099", // Replace with your URL
          location: "Denmark",
        },
        {
          id: 6,
          name: "Hydropower Plant",
          image: "https://images.unsplash.com/photo-1567016589564-3d499be7f1a4", // Replace with your URL
          location: "Brazil",
        },
      ],
    },
    {
      title: "Luxury Goods",
      description: "Own shares in luxury brands and exclusive collections.",
      items: [
        {
          id: 7,
          name: "Classic Car",
          image: "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb", // Replace with your URL
          location: "California, USA",
        },
        {
          id: 8,
          name: "Vintage Watch",
          image: "https://images.unsplash.com/photo-1602940651527-c849f551bd67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", // Replace with your URL
          location: "Geneva, Switzerland",
        },
        {
          id: 9,
          name: "Designer Handbag",
          image: "https://images.unsplash.com/photo-1573497491208-6b1acb260507", // Replace with your URL
          location: "Paris, France",
        },
      ],
    },
  ];;
  // At the top of your component
  const viewsInitialized = useRef(false); // Ensure views are initialized only once

  // Inside your component
  useEffect(() => {
    if (!viewsInitialized.current) {
      const initialViews = {};
      const initialTimers = {};

      categories.forEach((category) =>
        category.items.forEach((item) => {
          initialViews[item.id] = Math.floor(Math.random() * 500); // Simulated random views
          initialTimers[item.id] = item.initialTimeLeft; // Set initial time for each property
        })
      );

      setViews(initialViews);
      setTimeLeft(initialTimers);
      viewsInitialized.current = true; // Mark views as initialized
    }
  }, [categories]);

  // Countdown timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        const updatedTimers = {};
        Object.keys(prevTimeLeft).forEach((id) => {
          updatedTimers[id] = Math.max(prevTimeLeft[id] - 1, 0); // Decrease timer, prevent negative values
        });
        return updatedTimers;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Debounce search term
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId); // Cleanup timeout on component unmount
  }, [searchTerm]);

  const filteredCategories = categories
    .filter(
      (category) => selectedCategory === "All" || category.title === selectedCategory
    )
    .map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          item.name.toLowerCase().includes(debouncedTerm.toLowerCase()) ||
          item.location.toLowerCase().includes(debouncedTerm.toLowerCase())
      ),
    }));

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="bg-gray-900 text-white">
      <Navbar />
      <section className="py-24 px-6 md:px-12 lg:px-24">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-white text-transparent bg-clip-text">
            Investment Opportunities
          </h2>
          <p className="text-lg mt-4 text-gray-300">
            Explore a diverse range of investment options across three
            categories.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search investments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="text-center mt-4">
            <button
              className={`px-4 py-2 mx-1 rounded-lg ${selectedCategory === "All" ? "bg-blue-500" : "bg-gray-700"
                } hover:bg-blue-600 text-white`}
              onClick={() => setSelectedCategory("All")}
            >
              All
            </button>
            {categories.map((cat, index) => (
              <button
                key={index}
                className={`px-5 py-2 mx-1 rounded-lg ${selectedCategory === cat.title ? "bg-blue-500" : "bg-gray-700"
                  } hover:bg-blue-600 text-white`}
                onClick={() => setSelectedCategory(cat.title)}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        {filteredCategories.map((category, catIndex) => (
          <div key={catIndex} className="mb-12">
            <motion.div
              className="mb-8 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.2 }}
            >
              <h3 className="text-3xl font-semibold text-white">
                {category.title}
              </h3>
              <p className="text-gray-400 mt-2">{category.description}</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item) => (
                <motion.div
                  key={item.id}
                  className="bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="rounded-t-lg w-full h-40 object-cover"
                  />

                  {/* Details */}
                  <div className="p-4">
                    <h4 className="text-lg font-bold text-white">{item.name}</h4>
                    <p className="text-sm text-gray-400">{item.location}</p>

                    {/* Token Availability */}
                    <div className="mt-2">
                      <p className="text-gray-400">
                        Tokens Available: {item.tokensAvailable}/{item.totalTokens}
                      </p>
                      <ProgressBar
                        current={item.tokensAvailable}
                        total={item.totalTokens}
                      />
                    </div>

                    {/* Timer */}
                    <div className="mt-2">
                      <p className="text-gray-400">
                        Time Left:{" "}
                        <strong className="text-red-400">
                          {formatTime(timeLeft[item.id])}
                        </strong>
                      </p>
                    </div>

                    {/* View Counter */}
                    <div className="flex items-center mt-2 text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12h.01M12 15h.01M9 12h.01M12 8h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9.03 4.03 9 9z"
                        />
                      </svg>
                      <p>{views[item.id]} views</p>
                    </div>
                    {/* Buttons: Buy Tokens and Learn More */}
                    <div className="mt-4 flex gap-4">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        onClick={() => alert(`Purchased tokens for ${item.name}`)}
                      >
                        Buy Tokens
                      </button>
                      <button
                        className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                        onClick={() => navigate(`/investment/${item.id}`)}
                      >
                        Learn More
                      </button>
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </section>
      <TokenCalculator />
      <Footer />
    </div>
  );
};

export default InvestmentSection;