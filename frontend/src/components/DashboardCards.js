import React from "react";

const DashboardCards = ({ earnings, fctRate, fstRate, totalMade }) => {
    return (
      <div className="space-y-4">
        {/* Other Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {/* Total Earnings Card */}
          <div className="bg-gray-800 p-4 rounded-md shadow-md text-center">
            <h2 className="text-sm font-semibold text-blue-400 mb-1">Total Earnings</h2>
            <p className="text-lg font-bold text-white">${earnings.total.toLocaleString()}</p>
            <p className="text-xs text-green-400">↑ {earnings.percentage}% since last month</p>
          </div>
  
          {/* FCT Staking Rate Card */}
          <div className="bg-gray-800 p-4 rounded-md shadow-md text-center">
            <h2 className="text-sm font-semibold text-blue-400 mb-1">
              30-Day Interest Rate (FCT)
            </h2>
            <p className="text-lg font-bold text-white">{fctRate}%</p>
          </div>
  
          {/* FST Staking Rate Card */}
          <div className="bg-gray-800 p-4 rounded-md shadow-md text-center">
            <h2 className="text-sm font-semibold text-blue-400 mb-1">
              30-Day Interest Rate (FST)
            </h2>
            <p className="text-lg font-bold text-white">{fstRate}%</p>
          </div>
  
          {/* Total Made Card */}
          <div className="bg-gray-800 p-4 rounded-md shadow-md text-center">
            <h2 className="text-sm font-semibold text-blue-400 mb-1">Total Made on Platform</h2>
            <p className="text-lg font-bold text-white">${totalMade.total.toLocaleString()}</p>
            <p className="text-xs text-green-400">
              ↑ {totalMade.percentage}% since last quarter
            </p>
          </div>
        </div>
      </div>
    );
  };

export default DashboardCards;
