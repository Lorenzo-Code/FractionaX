import React, { useState, useEffect } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
  } from "chart.js";
  
  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
  );
  

const FractionaXAnalytics = () => {
  const [expanded, setExpanded] = useState(null);

  // Mock data for analytics
  const complianceDetails = [
    {
      id: 1,
      title: "Token Classification",
      description:
        "FCT is classified as a utility token, while FST represents fractional ownership of assets.",
      icon: "🛡️",
      status: "Compliant",
      deadline: null,
      history: [
        { date: "2024-01-01", status: "In Progress" },
        { date: "2024-03-01", status: "Compliant" },
      ],
    },
    {
      id: 2,
      title: "Licensing",
      description:
        "FractionaX operates as a Virtual Asset Service Provider (VASP) in key jurisdictions.",
      icon: "📜",
      status: "Compliant",
      deadline: null,
      history: [
        { date: "2023-12-01", status: "In Progress" },
        { date: "2024-02-15", status: "Compliant" },
      ],
    },
    {
      id: 3,
      title: "KYC/AML Compliance",
      description: "Enforces KYC and AML protocols for secure onboarding.",
      icon: "🔍",
      status: "Pending",
      deadline: "2025-01-31",
      history: [{ date: "2024-12-01", status: "Pending" }],
    },
  ];

  const usageStats = {
    activeUsers: 1245,
    newUsers: 150,
    transactions: 23500,
    totalVolume: 5000000, // in USD
  };

  const revenueData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Monthly Revenue ($)",
        data: [10000, 15000, 18000, 25000, 22000, 30000],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const complianceChartData = {
    labels: ["Compliant", "Pending"],
    datasets: [
      {
        data: [
          complianceDetails.filter((item) => item.status === "Compliant")
            .length,
          complianceDetails.filter((item) => item.status === "Pending").length,
        ],
        backgroundColor: ["#10b981", "#f59e0b"],
      },
    ],
  };

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const renderBadge = (status) => {
    const colors = {
      Compliant: "bg-green-500",
      Pending: "bg-yellow-500",
      "In Progress": "bg-blue-500",
    };
    return (
      <span
        className={`text-white text-sm font-bold px-2 py-1 rounded-full ${colors[status]}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-blue-400 mb-6">FractionaX Analytics</h2>

      {/* Platform Usage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <h3 className="text-lg font-bold text-blue-400 mb-2">Active Users</h3>
          <p className="text-2xl text-green-400">{usageStats.activeUsers}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <h3 className="text-lg font-bold text-blue-400 mb-2">New Users</h3>
          <p className="text-2xl text-yellow-400">{usageStats.newUsers}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <h3 className="text-lg font-bold text-blue-400 mb-2">Transactions</h3>
          <p className="text-2xl text-green-400">{usageStats.transactions}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <h3 className="text-lg font-bold text-blue-400 mb-2">Total Volume</h3>
          <p className="text-2xl text-green-400">
            ${usageStats.totalVolume.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Monthly Revenue Chart */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-bold text-blue-400 mb-4">Monthly Revenue</h3>
        <Line
          data={revenueData}
          options={{ maintainAspectRatio: false }}
          className="h-64"
        />
      </div>

      {/* Compliance Status Chart */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-bold text-blue-400 mb-4">
          Compliance Overview
        </h3>
        <Doughnut data={complianceChartData} />
      </div>

      {/* Compliance Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {complianceDetails.map((item) => (
          <div
            key={item.id}
            className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="text-3xl mr-4">{item.icon}</span>
                <h3 className="text-lg font-bold text-blue-400">
                  {item.title}
                </h3>
              </div>
              {renderBadge(item.status)}
            </div>
            <p className="text-gray-400 mb-4">{item.description}</p>
            {item.deadline && (
              <p className="text-sm text-red-400">Deadline: {item.deadline}</p>
            )}
            <button
              onClick={() => toggleExpand(item.id)}
              className="text-blue-400 hover:underline"
            >
              {expanded === item.id ? "Show Less" : "Show More"}
            </button>
            {expanded === item.id && (
              <div className="mt-4 text-sm text-gray-300">
                <h4 className="font-bold mb-2">Status History:</h4>
                <ul className="space-y-1">
                  {item.history.map((history, idx) => (
                    <li key={idx}>
                      {history.date}: {history.status}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FractionaXAnalytics;
