import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LinkWalletPage = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLinkWallet = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/link-wallet/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you use JWT or token-based auth
        },
        body: JSON.stringify({ wallet_address: walletAddress }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to link wallet.");
      }

      const data = await response.json();
      setSuccess(data.message);
      setTimeout(() => navigate("/dashboard"), 2000); // Redirect after success
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Link Your Wallet</h1>
        <div className="mb-4">
          <label htmlFor="walletAddress" className="block text-sm mb-2">
            Wallet Address
          </label>
          <input
            type="text"
            id="walletAddress"
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your wallet address"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <button
          onClick={handleLinkWallet}
          className={`w-full bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 rounded-lg text-white hover:from-purple-600 hover:to-blue-600 transition duration-200 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Linking Wallet..." : "Link Wallet"}
        </button>
      </div>
    </div>
  );
};

export default LinkWalletPage;
