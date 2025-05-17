import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const TopInvestments = ({ investments, onLike }) => {
  const [showAll, setShowAll] = useState(false);
  const [sortOption, setSortOption] = useState("mostViews"); // Default sort option
  const [isCheapest, setIsCheapest] = useState(true); // Toggles between Cheapest and Most Expensive

  const navigate = useNavigate(); // For navigation to detail pages

  // Sorting logic
  const sortedInvestments = useMemo(() => {
    switch (sortOption) {
      case "mostViews":
        return [...investments].sort((a, b) => b.views - a.views);
      case "price": // Handles both Cheapest and Most Expensive
        return isCheapest
          ? [...investments].sort((a, b) => a.price - b.price) // Cheapest
          : [...investments].sort((a, b) => b.price - a.price); // Most Expensive
      case "expiring":
        return [...investments].sort((a, b) => new Date(a.expiration) - new Date(b.expiration));
      case "newListing":
        return [...investments].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case "exclusive":
        return investments.filter((item) => item.isExclusive);
      case "id":
        return [...investments].sort((a, b) => a.id - b.id);
      default:
        return investments;
    }
  }, [investments, sortOption, isCheapest]);

  // Limit to top 5 if not showing all
  const displayedInvestments = showAll ? sortedInvestments : sortedInvestments.slice(0, 5);

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-blue-400 mb-4">Top Investments</h2>

      {/* Sorting Options */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-lg ${
              sortOption === "mostViews" ? "bg-blue-500" : "bg-gray-700"
            } hover:bg-blue-600 text-white`}
            onClick={() => setSortOption("mostViews")}
          >
            Most Views
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              sortOption === "price" ? "bg-blue-500" : "bg-gray-700"
            } hover:bg-blue-600 text-white`}
            onClick={() => {
              setSortOption("price");
              setIsCheapest((prev) => !prev); // Toggle between Cheapest and Most Expensive
            }}
          >
            {isCheapest ? "Cheapest" : "Most Expensive"}
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              sortOption === "expiring" ? "bg-blue-500" : "bg-gray-700"
            } hover:bg-blue-600 text-white`}
            onClick={() => setSortOption("expiring")}
          >
            Expiring
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              sortOption === "newListing" ? "bg-blue-500" : "bg-gray-700"
            } hover:bg-blue-600 text-white`}
            onClick={() => setSortOption("newListing")}
          >
            New Listings
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              sortOption === "exclusive" ? "bg-blue-500" : "bg-gray-700"
            } hover:bg-blue-600 text-white`}
            onClick={() => setSortOption("exclusive")}
          >
            Exclusive
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              sortOption === "id" ? "bg-blue-500" : "bg-gray-700"
            } hover:bg-blue-600 text-white`}
            onClick={() => setSortOption("id")}
          >
            ID Number
          </button>
        </div>
        <button
          className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? "Show Top 5" : "View All"}
        </button>
      </div>

      {/* Investment Listings */}
      <ul className="space-y-4">
        {displayedInvestments.map((investment) => (
          <li
            key={investment.id}
            className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <img
                src={investment.image}
                alt={investment.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-lg font-bold">{investment.name}</h3>
                <p className="text-sm text-gray-400">Location: {investment.location}</p>
                <p className="text-sm text-gray-400">Price: ${investment.price.toLocaleString()}</p>
                <p className="text-sm text-gray-400">Views: {investment.views}</p>
                <p className="text-sm text-gray-400">ID: {investment.id}</p>
                {investment.isExclusive && (
                  <span className="text-green-500 font-semibold text-sm">Exclusive</span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onLike(investment)}
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg"
              >
                Like
              </button>
              <button
                onClick={() => navigate(`/investment/${investment.id}`)}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
              >
                Learn More
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopInvestments;
