import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TradingViewWidget from "react-tradingview-widget";
import TransactionHistory from "./TransactionHistory";

const TradeFCTFST = () => {
    const defaultPriceData = { FCT: 1.5, FST: 2.0 };
    const [priceData] = useState(defaultPriceData);
    const [selectedToken, setSelectedToken] = useState("FCT");
    const [orderType, setOrderType] = useState("market");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(false);

    const [level2Data] = useState({
        bids: [
            { price: 1.48, quantity: 200 },
            { price: 1.47, quantity: 150 },
            { price: 1.46, quantity: 100 },
        ],
        asks: [
            { price: 1.52, quantity: 250 },
            { price: 1.53, quantity: 200 },
            { price: 1.54, quantity: 100 },
        ],
    });

    useEffect(() => {
        setFilteredOrders(orders);
    }, [orders]);

    const handleOrderSubmit = (e) => {
        e.preventDefault();
        if (!quantity || (orderType === "limit" && !price)) {
            alert("Please fill in all required fields.");
            return;
        }

        setLoading(true);
        try {
            const newOrder = {
                id: orders.length + 1,
                token: selectedToken,
                orderType,
                quantity,
                price: orderType === "market" ? priceData[selectedToken] : price,
                status: "Pending",
                timestamp: new Date().toISOString(),
            };

            setOrders((prev) => [newOrder, ...prev]);
            alert("Order placed successfully!");
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Failed to place order. Please try again.");
        } finally {
            setLoading(false);
            setQuantity("");
            setPrice("");
        }
    };

    const toggleToken = () => {
        setSelectedToken((prev) => (prev === "FCT" ? "FST" : "FCT"));
    };

    const filterOrders = (status) => {
        setFilter(status);
        if (status === "all") {
            setFilteredOrders(orders);
        } else {
            setFilteredOrders(orders.filter((order) => order.status === status));
        }
    };

    const downloadTradeHistory = () => {
        const csvContent = [
            ["Order ID", "Token", "Order Type", "Quantity", "Price", "Status", "Timestamp"],
            ...orders.map((order) => [
                order.id,
                order.token,
                order.orderType,
                order.quantity,
                order.price,
                order.status,
                order.timestamp,
            ]),
        ]
            .map((row) => row.join(","))
            .join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "trade_history.csv";
        link.click();
    };


    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="w-full px-6 py-10">
                {/* Top Section */}
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
  {/* TradingView Chart */}
  <div className="order-1 xl:order-2 col-span-1 xl:col-span-3 bg-gray-800 p-4 sm:p-6 rounded-lg">
  <div className="h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px]">
    <TradingViewWidget
      symbol={selectedToken === "FCT" ? "NASDAQ:FCT" : "NASDAQ:FST"}
      theme="dark"
      autosize
    />
  </div>
</div>


  {/* Order Form */}
  <div className="order-2 xl:order-1 col-span-1 bg-gray-800 p-6 rounded-lg">
    <motion.div
      className="text-center mb-8"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl font-bold text-blue-400 ">Trade Tokens</h1>
      <p className="text-gray-400 mt-2">
        Manage your FCT and FST trades with ease.
      </p>
    </motion.div>

    <div className="flex justify-center items-center mb-6">
      <button
        onClick={toggleToken}
        className="px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition"
      >
        Switch to {selectedToken === "FCT" ? "FST" : "FCT"}
      </button>
    </div>

    {/* Level 2 Data */}
    <div className="bg-gray-700 p-4 rounded-lg mt-6">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold mb-4">Order Book (Level 2)</h2>
        <p>
          <strong>Price:</strong> ${priceData[selectedToken]?.toFixed(2) || "N/A"}
        </p>
      </div>
      <div className="flex justify-between">
        <div>
          <h3 className="text-green-400 font-bold">Bids</h3>
          {level2Data.bids.map((bid, index) => (
            <p key={index} className="text-gray-300">
              ${bid.price.toFixed(2)} - {bid.quantity} units
            </p>
          ))}
        </div>
        <div>
          <h3 className="text-red-400 font-bold">Asks</h3>
          {level2Data.asks.map((ask, index) => (
            <p key={index} className="text-gray-300">
              ${ask.price.toFixed(2)} - {ask.quantity} units
            </p>
          ))}
        </div>
      </div>
    </div>

    <form onSubmit={handleOrderSubmit}>
      <div className="mb-4">
        <label className="block text-sm mb-2">Order Type</label>
        <select
          value={orderType}
          onChange={(e) => setOrderType(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"
        >
          <option value="market">Market Order</option>
          <option value="limit">Limit Order</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-2">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"
          placeholder="Enter quantity"
        />
      </div>
      {orderType === "limit" && (
        <div className="mb-4">
          <label className="block text-sm mb-2">Price (USD)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"
            placeholder="Enter price"
          />
        </div>
      )}
      <button
        type="submit"
        className={`w-full px-6 py-3 rounded-lg ${
          selectedToken === "FST"
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-gradient-to-r from-green-500 to-blue-500"
        } text-white font-bold ${loading ? "opacity-50" : ""}`}
        disabled={selectedToken === "FST" || loading}
      >
        {loading ? "Processing..." : `Buy ${selectedToken}`}
      </button>
    </form>
  </div>
</div>


                {/* Order History */}
                <div className="bg-gray-800 p-6 rounded-lg mt-8">
                    <h2 className="text-2xl font-bold mb-4">Order History</h2>
                    <div className="flex space-x-4 mb-6">
                        <button
                            onClick={() => filterOrders("all")}
                            className={`px-4 py-2 rounded-lg ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-600"
                                }`}
                        >
                            All Orders
                        </button>
                        <button
                            onClick={() => filterOrders("Pending")}
                            className={`px-4 py-2 rounded-lg ${filter === "Pending" ? "bg-blue-500 text-white" : "bg-gray-600"
                                }`}
                        >
                            Pending
                        </button>
                        <button
                            onClick={() => filterOrders("Executed")}
                            className={`px-4 py-2 rounded-lg ${filter === "Executed" ? "bg-blue-500 text-white" : "bg-gray-600"
                                }`}
                        >
                            Executed
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse border border-gray-700">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="px-4 py-2 text-blue-400">Order ID</th>
                                    <th className="px-4 py-2 text-blue-400">Token</th>
                                    <th className="px-4 py-2 text-blue-400">Type</th>
                                    <th className="px-4 py-2 text-blue-400">Quantity</th>
                                    <th className="px-4 py-2 text-blue-400">Price</th>
                                    <th className="px-4 py-2 text-blue-400">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.length > 0 ? (
                                    filteredOrders.map((order) => (
                                        <tr key={order.id} className="bg-gray-700">
                                            <td className="px-4 py-2">{order.id}</td>
                                            <td className="px-4 py-2">{order.token}</td>
                                            <td className="px-4 py-2">{order.orderType}</td>
                                            <td className="px-4 py-2">{order.quantity}</td>
                                            <td className="px-4 py-2">${order.price?.toFixed(2)}</td>
                                            <td className="px-4 py-2">{order.status}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4 text-gray-400">
                                            No orders to display.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <button
                        onClick={downloadTradeHistory}
                        className="mt-6 px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold"
                    >
                        Download Trade History
                    </button>
                </div>
                <TransactionHistory />
            </div>
        </div>
    );
}

export default TradeFCTFST;
