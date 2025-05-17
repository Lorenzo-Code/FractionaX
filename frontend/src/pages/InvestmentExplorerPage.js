import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/300x200?text=No+Image";

const InvestmentExplorerPage = () => {
  const { authToken, fetchLikedInvestments, likedInvestments } = useAuth();
  const [investments, setInvestments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 12; // ✅ Show 12 listings per page

  // ✅ Fetch investments from backend (Only TX properties)
  const fetchInvestments = async (query = "") => {
    setLoading(true);
    try {
      const url = query
        ? `http://localhost:8000/api/investments/?address=${encodeURIComponent(query)}&state=TX`
        : "http://localhost:8000/api/investments/?state=TX"; // ✅ Default to Texas properties

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

      const data = await response.json();
      console.log("✅ API Response:", data);

      // ✅ Merge API & database data
      const combinedInvestments = [
        ...data.database_investments,
        ...(data.rentcast || []),
      ];

      setInvestments(combinedInvestments);
      fetchLikedInvestments(); // ✅ Fetch liked investments only after data loads
    } catch (error) {
      console.error("❌ Error fetching investments:", error);
      setError("Failed to load investments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) fetchInvestments();
  }, [authToken]);

  // ✅ Pagination logic
  const paginatedInvestments = useMemo(
    () => investments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [investments, currentPage]
  );

  const totalPages = Math.ceil(investments.length / itemsPerPage);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  if (loading) return <div className="text-center text-blue-400">Loading investments...</div>;
  if (error) return <div className="text-center text-red-400">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-6 text-center">
        <h1 className="text-3xl font-bold text-blue-400">Investment Explorer</h1>
      </header>

      <main className="container mx-auto p-6">
        {/* ✅ Search Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <input
            type="text"
            placeholder="Search by address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 rounded-md bg-gray-800 text-white border border-gray-700 w-full md:w-1/3"
          />
          <button
            onClick={() => fetchInvestments(searchQuery)}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        {/* ✅ Investment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedInvestments.map((investment) => (
            <div key={investment.id} className="bg-gray-800 rounded-lg p-4 shadow-md hover:scale-105 transition transform">
              {/* ✅ Show property image (if available, else use placeholder) */}
              <img
                src={investment.photo || PLACEHOLDER_IMAGE}
                alt={investment.formattedAddress || "Property Image"}
                className="w-full h-48 object-cover rounded"
              />
              
              <h3 className="text-lg font-bold text-blue-400 mt-2">{investment.formattedAddress || investment.addressLine1}</h3>
              <p className="text-sm text-gray-400">Type: {investment.propertyType}</p>
              {investment.bedrooms && <p className="text-sm text-gray-400">Beds: {investment.bedrooms}</p>}
              {investment.bathrooms && <p className="text-sm text-gray-400">Baths: {investment.bathrooms}</p>}
              {investment.squareFootage && <p className="text-sm text-gray-400">Sq Ft: {investment.squareFootage}</p>}
              <p className="text-sm text-gray-400">Location: {investment.city}, {investment.state}</p>

              {/* ✅ View Property Details Button */}
              <Link
                to={`/property/${investment.id}`}
                className="mt-3 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>

        {/* ✅ Pagination Controls */}
        <div className="flex justify-between items-center mt-6">
          <button onClick={prevPage} disabled={currentPage === 1} className="p-2 bg-gray-700 rounded text-white">
            ← Previous
          </button>
          <span className="text-lg">Page {currentPage} of {totalPages}</span>
          <button onClick={nextPage} disabled={currentPage === totalPages} className="p-2 bg-gray-700 rounded text-white">
            Next →
          </button>
        </div>
      </main>
    </div>
  );
};

export default InvestmentExplorerPage;
