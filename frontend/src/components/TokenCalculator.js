import React, { useState, useEffect } from "react";

const InvestmentCalculator = () => {
  const [investmentId, setInvestmentId] = useState(""); // New state for investment ID
  const [tokens, setTokens] = useState(0);
  const [apr, setApr] = useState(0);
  const [fctPrice, setFctPrice] = useState(0.5); // Default FCT price
  const [fstPrice, setFstPrice] = useState(500); // Default FST price
  const [lastUpdatedFCT, setLastUpdatedFCT] = useState("");
  const [lastUpdatedFST, setLastUpdatedFST] = useState("");

  // Sample database of investment identifiers (mock data)
  const investmentData = {
    "INV001": { tokens: 5, apr: 7 },
    "INV002": { tokens: 10, apr: 8 },
    "INV003": { tokens: 15, apr: 10 },
  };

  // API URLs for real-time price updates (replace with actual API endpoints)
  const FCT_PRICE_API = "https://api.example.com/fct-price";
  const FST_PRICE_API = "https://api.example.com/fst-price";

  // Fetch real-time prices for FCT and FST tokens
  const fetchPrices = async () => {
    try {
      const fctResponse = await fetch(FCT_PRICE_API);
      const fstResponse = await fetch(FST_PRICE_API);

      const fctData = await fctResponse.json();
      const fstData = await fstResponse.json();

      setFctPrice(fctData.price); // Update FCT price
      setFstPrice(fstData.price); // Update FST price

      const now = new Date().toLocaleTimeString();
      setLastUpdatedFCT(now);
      setLastUpdatedFST(now);
    } catch (error) {
      console.error("Error fetching token prices:", error);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 15 * 60 * 1000); // Update prices every 15 minutes
    return () => clearInterval(interval);
  }, []);

  // Populate fields based on investment identifier
  const handleInvestmentIdChange = (id) => {
    setInvestmentId(id);

    if (investmentData[id]) {
      setTokens(investmentData[id].tokens);
      setApr(investmentData[id].apr);
    } else {
      setTokens(0);
      setApr(0);
    }
  };

  // Calculations
  const calculateInvestmentCost = () => tokens * fstPrice;
  const calculateExpectedReturn = () => (tokens * fstPrice * apr) / 100;
  const calculateFCTRequired = () => ((tokens * fstPrice) * 0.05) / fctPrice;

  const handleClear = () => {
    setInvestmentId("");
    setTokens(0);
    setApr(0);
  };

  return (
    <section
      className="py-16 px-6 md:px-12 lg:px-24 bg-gray-900 text-white"
      style={{ backgroundColor: "rgb(25, 29, 43)" }}
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-white text-transparent bg-clip-text">
          Investment Calculator
        </h2>
        <p className="text-lg mt-4 text-gray-300">
          Plan your investments and estimate your returns with ease.
        </p>
      </div>

      {/* Real-Time Token Prices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-center">
          <p className="text-lg text-blue-400 font-bold">
            Current FCT Price: ${fctPrice.toFixed(2)} / token
          </p>
          <p className="text-sm text-gray-400">Last updated: {lastUpdatedFCT}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-center">
          <p className="text-lg text-green-400 font-bold">
            Current FST Price: ${fstPrice.toFixed(2)} / token
          </p>
          <p className="text-sm text-gray-400">Last updated: {lastUpdatedFST}</p>
        </div>
      </div>
      <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg mx-auto max-w-full sm:max-w-lg">
  {/* Investment Identifier Input */}
  <div className="mb-6">
    <label className="text-xs sm:text-sm font-bold text-gray-400">
      Investment Identifier (Optional):
    </label>
    <input
      type="text"
      value={investmentId}
      onChange={(e) => handleInvestmentIdChange(e.target.value)}
      placeholder="Enter investment ID (e.g., INV001)"
      className="w-full mt-2 p-3 rounded-lg bg-gray-700 text-white text-sm focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Number of Tokens */}
  <div className="mb-6">
    <label className="text-xs sm:text-sm font-bold text-gray-400">
      Number of FST Tokens:
    </label>
    <input
      type="number"
      value={tokens}
      onChange={(e) => setTokens(Number(e.target.value))}
      placeholder="Enter number of tokens"
      className="w-full mt-2 p-3 rounded-lg bg-gray-700 text-white text-sm focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* APR Input */}
  <div className="mb-6">
    <label className="text-xs sm:text-sm font-bold text-gray-400">
      Expected APR (%):
    </label>
    <input
      type="number"
      value={apr}
      onChange={(e) => setApr(Number(e.target.value))}
      placeholder="Enter expected APR"
      className="w-full mt-2 p-3 rounded-lg bg-gray-700 text-white text-sm focus:ring-2 focus:ring-blue-500"
    />
  </div>


        {/* Results */}
        <div className="mt-8 text-center">
          <h3 className="text-lg font-bold text-blue-400 mb-4">Results</h3>
          <p className="text-gray-300">
            <strong>Total Investment Cost:</strong>{" "}
            ${calculateInvestmentCost().toLocaleString()}
          </p>
          <p className="text-gray-300 mt-2">
            <strong>Expected Annual Return:</strong>{" "}
            ${calculateExpectedReturn().toLocaleString()}
          </p>
          <p className="text-gray-300 mt-2">
            <strong>FCT Tokens Required for Fees:</strong>{" "}
            {calculateFCTRequired().toLocaleString()} FCT
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={handleClear}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
          >
            Clear
          </button>
          <button
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition duration-200"
          >
            Buy FCT Tokens
          </button>
        </div>
      </div>
    </section>
  );
};

export default InvestmentCalculator;
