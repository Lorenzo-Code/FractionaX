import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaWallet, FaCoins, FaGift, FaInfoCircle, FaMoon, FaSun, FaShareAlt } from "react-icons/fa";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSwipeable } from "react-swipeable";
import StakingOverview from "../components/StakingOverview"; // Adjust path based on file structure
import TransactionHistory from "../components/TransactionHistory"; // Adjust path based on file structure

ChartJS.register(BarElement, CategoryScale, LinearScale);

const StakingPage = () => {
  // States for managing data
  const [userBalance, setUserBalance] = useState(0);
  const [stakedAmount, setStakedAmount] = useState(0);
  const [rewards, setRewards] = useState(0);
  const [stakeAmount, setStakeAmount] = useState("");
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState("FX");
  const [currencyConversionRate, setCurrencyConversionRate] = useState(1);
  const [apr, setApr] = useState(12); // Default APR
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Success message
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [nextRewardTime, setNextRewardTime] = useState(new Date());
  const [themeAccentColor, setThemeAccentColor] = useState("blue");
  const [notification, setNotification] = useState(null); // Notification system
  const [networkStats, setNetworkStats] = useState({ totalStaked: 0, averageAPR: 0 });
  const [selectedDuration, setSelectedDuration] = useState("30D"); // Default lock-up duration



  const API_BASE_URL = "https://api.fractionax.com"; // Replace with actual backend URL





  // Tokens supported for staking
  const tokenList = [
    {
      symbol: "FX",
      name: "FractionaX Token",
      apr: { "30D": 5, "90D": 8, "1Y": 12 },
    },
    {
      symbol: "BTC",
      name: "Bitcoin",
      apr: { "30D": 3, "90D": 6, "1Y": 10 },
    },
    {
      symbol: "XRP",
      name: "Ripple",
      apr: { "30D": 4, "90D": 7, "1Y": 11 },
    },
  ];
  const lockUpOptions = [
    { period: "30D", displayPeriod: "30 days", apr: 5 },
    { period: "90D", displayPeriod: "90 days", apr: 8 },
    { period: "1Y", displayPeriod: "1 year", apr: 12 },
  ];


  const [selectedLockUp, setSelectedLockUp] = useState(lockUpOptions[0]); // Default lock-up option

  // Function to calculate rewards based on selected lock-up
  const calculateRewards = () => {
    if (!stakeAmount || stakeAmount <= 0) return 0;
    return ((stakeAmount * selectedLockUp.apr) / 100).toFixed(2); // Calculate rewards
  };



  const [selectedToken, setSelectedToken] = useState(tokenList[0]); // Default token

  // Tab Management for Overview and Transactions
  const [activeTab, setActiveTab] = useState("overview");

  // On component mount
  useEffect(() => {
    fetchStakingData();
    fetchTransactionHistory();
    fetchCurrencyConversion();
    fetchNetworkStats();
    startRewardCountdown();

    // Simulated WebSocket for rewards updates
    const interval = setInterval(() => {
      setRewards((prev) => prev + parseFloat(Math.random().toFixed(2)));
    }, 5000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Fetch user staking data
  const fetchStakingData = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/staking/${selectedToken.symbol}`);
      setUserBalance(data.balance || 0);
      setStakedAmount(data.stakedAmount || 0);
      setRewards(Number(data.rewards) || 0);
    } catch (error) {
      console.error("Error fetching staking data:", error);
      setRewards(0); // Fallback on error
    }
  };

  // Fetch transaction history
  const fetchTransactionHistory = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/transactions?page=${currentPage}`);
      setTransactionHistory((prev) => [...prev, ...data.transactions]);
      setHasMore(data.hasMore);
      setCurrentPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching transaction history:", error);
    }
  };

  // Fetch currency conversion rates
  const fetchCurrencyConversion = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/currency-conversion`);
      setCurrencyConversionRate(data.rate || 1);
    } catch (error) {
      console.error("Error fetching currency conversion rate:", error);
    }
  };

  // Fetch network stats
  const fetchNetworkStats = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/network-stats`);
      setNetworkStats(data);
    } catch (error) {
      console.error("Error fetching network stats:", error);
    }
  };

  // Countdown timer for next rewards
  const startRewardCountdown = () => {
    const interval = setInterval(() => {
      setNextRewardTime((prev) => new Date(prev.getTime() - 1000));
    }, 1000);
    return () => clearInterval(interval);
  };

  // Handle staking action
  const handleStake = async () => {
    if (!stakeAmount || stakeAmount <= 0) {
      setErrorMessage("Enter a valid amount to stake.");
      return;
    }
    if (stakeAmount > userBalance) {
      setErrorMessage("Insufficient balance.");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/stake`, { amount: stakeAmount, token: selectedToken.symbol });
      setStakeAmount("");
      setErrorMessage("");
      setSuccessMessage(`Stake successful! You staked ${stakeAmount} ${selectedToken.symbol}.`);
      fetchStakingData();
      fetchTransactionHistory();
    } catch (error) {
      console.error("Error staking:", error);
      setErrorMessage("Failed to stake tokens.");
    }
  };

  // Handle unstaking action
  const handleUnstake = async () => {
    if (!stakeAmount || stakeAmount <= 0) {
      setErrorMessage("Enter a valid amount to unstake.");
      return;
    }
    if (stakeAmount > stakedAmount) {
      setErrorMessage("Cannot unstake more than staked amount.");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/unstake`, { amount: stakeAmount, token: selectedToken.symbol });
      setStakeAmount("");
      setErrorMessage("");
      setSuccessMessage(`Unstake successful! You unstaked ${stakeAmount} ${selectedToken.symbol}.`);
      fetchStakingData();
      fetchTransactionHistory();
    } catch (error) {
      console.error("Error unstaking:", error);
      setErrorMessage("Failed to unstake tokens.");
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => setActiveTab("transactions"), // Switch to Transactions
    onSwipedRight: () => setActiveTab("overview"),   // Switch to Overview
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // Enable swiping with a mouse (useful for testing on desktop)
  });

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <div>Staking Overview Content</div>; // Replace with <StakingOverview />
      case "transactions":
        return <div>Transaction History Content</div>; // Replace with <TransactionHistory />
      default:
        return <div>Staking Overview Content</div>;
    }
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen`}>
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Environment Banner */}
        <div className="flex flex-wrap justify-between items-center bg-red-500 text-white py-2 px-4 rounded mb-6 shadow-lg">
          <p>Environment: Testnet</p>
        </div>

        {/* Header Section */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <h1 className="text-4xl font-extrabold">FractionaX Staking</h1>
          <p className="text-lg">
            You are ranked <span className="font-bold text-green-400">#42</span> out of
            <span className="font-bold text-green-400"> 10,000 stakers</span>.
          </p>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${darkMode ? "bg-blue-700 hover:bg-blue-600" : "bg-gray-700 hover:bg-gray-600"} text-white transition`}
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard icon={<FaWallet />} label="Your Balance" value={`${(userBalance || 0).toFixed(2)} FX`} />
          <StatCard icon={<FaCoins />} label="Staked Amount" value={`${(stakedAmount || 0).toFixed(2)} FX`} />
          <StatCard icon={<FaGift />} label="Rewards" value={`${(rewards || 0).toFixed(2)} FX`} badge />
        </div>

        {/* Staking Section */}
        <div className="bg-gray-800 p-6 rounded-lg mb-6 shadow-lg">
          <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
            {/* Title */}
            <h2 className="text-2xl font-bold">Stake or Unstake {selectedToken.name}</h2>

            {/* Token Selection */}
            <div className="flex gap-2">
              {tokenList.map((token) => (
                <button
                  key={token.symbol}
                  onClick={() => setSelectedToken(token)}
                  className={`px-3 py-1 rounded-lg text-sm ${selectedToken.symbol === token.symbol ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-400"
                    }`}
                >
                  {token.symbol}
                </button>
              ))}
            </div>

            {/* Lock-Up Period Selection */}
            <div className="flex gap-2">
              {lockUpOptions.map((option) => (
                <button
                  key={option.period}
                  onClick={() => setSelectedLockUp(option)}
                  className={`px-3 py-1 rounded-lg text-sm ${selectedLockUp.period === option.period ? "bg-green-500 text-white" : "bg-gray-700 text-gray-400"
                    }`}
                >
                  {option.period} - {option.apr}% APR
                </button>
              ))}
            </div>
          </div>

          {/* Stake/Unstake Input */}
          <p>
            <span className="font-bold text-green-400">10,245 users</span> have staked a total of
            <span className="font-bold text-green-400"> 2,034,456 FX</span>.
          </p>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
          <div className="flex gap-4 mt-4">
            <input
              type="number"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"
              placeholder={`Enter amount (${selectedToken.symbol})`}
            />
            <button
              onClick={handleStake}
              className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600"
            >
              Stake
            </button>
            <button
              onClick={handleUnstake}
              className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600"
            >
              Unstake
            </button>
          </div>

          {/* Staking Overview */}
          <ProgressBar label="Staked Percentage" value={(stakedAmount / (userBalance + stakedAmount)) * 100 || 0} />
          {/* Penalty Notice */}
          {selectedLockUp && (
            <p className="text-red-500 text-sm mt-2">
              Note: Unstaking before <span className="font-bold">{selectedLockUp.displayPeriod}</span> will incur a
              <span className="font-bold"> {selectedLockUp.apr + 5}% penalty</span>.
            </p>
          )}
          <p className="text-gray-400 text-sm mt-4">
            Estimated Rewards: <span className="font-bold text-green-400">{calculateRewards()} {selectedToken.symbol}</span>
          </p>
          <p className="text-gray-400 text-sm">
            Estimated Value: <span className="font-bold text-green-400">
              ${(stakedAmount * currencyConversionRate).toFixed(2)} USD
            </span>
          </p>
        </div>

        {/* Predicted Rewards Section */}
        <div className="bg-gray-800 p-6 rounded-lg mb-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Predicted Rewards</h2>
          <p>
            Based on your lock-up period and selected token, your rewards could grow to:
            <span className="font-bold text-green-400">
              ${(stakeAmount * (1 + selectedLockUp.apr / 100)).toFixed(2)} {selectedToken.symbol}
            </span>
          </p>
        </div>

        {/* Compound Staking Simulation */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Compound Staking Simulation</h2>
          <p>
            If you enable compounding, your rewards could grow to:
            <span className="font-bold text-green-400">
              {selectedToken && selectedToken.apr && selectedToken.apr[selectedLockUp.period] ? (
                `$${((rewards || 0) * (1 + selectedToken.apr[selectedLockUp.period] / 100)).toFixed(2)} USD`
              ) : (
                "N/A"
              )}
            </span>
            by the end of the staking duration.
          </p>
        </div>


        {/* Social Sharing Button */}
        <button
          className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600 flex items-center gap-2"
          onClick={() =>
            window.open(
              `https://twitter.com/intent/tweet?text=I%20just%20staked%201000%20FX%20on%20FractionaX!%20Check%20it%20out:%20https://fractionax.com`,
              "_blank"
            )
          }
        >
          <FaShareAlt /> Share on Twitter
        </button>

        {/* Transaction History */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-6">
          <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
          <TransactionTable transactions={transactionHistory} />
          {hasMore && (
            <div className="flex gap-2 mt-4">
              <button
                onClick={fetchTransactionHistory}
                className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600"
              >
                Load More
              </button>
              <button
                onClick={() => setCurrentPage(1)}
                className="bg-gray-500 px-4 py-2 rounded-lg text-white hover:bg-gray-600"
              >
                Reset
              </button>
            </div>
          )}
        </div>

        {/* Achievements */}
        <div className="bg-gray-800 p-6 rounded-lg mb-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Achievements</h2>
          <div className="flex gap-4">
            <div className="bg-yellow-500 text-white px-4 py-2 rounded-lg">1000 FX Staked</div>
            <div className="bg-green-500 text-white px-4 py-2 rounded-lg">1 Year Staker</div>
            <div className="bg-blue-500 text-white px-4 py-2 rounded-lg">Top 10 Staker</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Utility Components
const StatCard = ({ icon, label, value, badge }) => (
  <div className="bg-gray-800 p-6 rounded-lg text-center shadow-lg relative">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-lg font-semibold">{label}</h3>
    <p className="text-2xl font-bold">{value}</p>
    {badge && <div className="absolute top-2 right-2 bg-yellow-400 w-4 h-4 rounded-full animate-ping" />}
  </div>
);

const ProgressBar = ({ label, value }) => (
  <div>
    <label className="block text-sm text-gray-300 mb-2">{label}</label>
    <div className="w-full bg-gray-700 rounded-full h-4">
      <div
        className="bg-blue-500 h-4 rounded-full transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
    <p className="text-sm text-gray-400 mt-2">{(value || 0).toFixed(2)}% of your total balance is staked.</p>
  </div>
);

const TransactionTable = ({ transactions }) => (
  <table className="w-full table-auto text-left">
    <thead>
      <tr className="border-b border-gray-700">
        <th className="px-4 py-2">Type</th>
        <th className="px-4 py-2">Amount</th>
        <th className="px-4 py-2">Date</th>
      </tr>
    </thead>
    <tbody>
      {transactions.length > 0 ? (
        transactions.map((tx, index) => (
          <tr key={index} className="border-b border-gray-700">
            <td className="px-4 py-2">{tx.type}</td>
            <td className="px-4 py-2">{tx.amount} FX</td>
            <td className="px-4 py-2">{new Date(tx.date).toLocaleString()}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="3" className="text-center py-4">No transactions yet.</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default StakingPage;
