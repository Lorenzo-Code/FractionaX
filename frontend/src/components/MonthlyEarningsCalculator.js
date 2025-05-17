import React from "react";

const MonthlyEarningsCalculator = ({ totalTokens, projectedRevenue, onChange, selectedPercentage }) => {
  const calculateMonthlyEarnings = () => {
    const yearlyRevenue = parseFloat(projectedRevenue.replace(/[^\d.]/g, ""));
    const monthlyRevenue = yearlyRevenue / 12;
    const tokenCount = Math.ceil((selectedPercentage / 100) * totalTokens);
    return ((monthlyRevenue / totalTokens) * tokenCount).toFixed(2);
  };

  return (
    <div className="mt-6">
      <p className="text-gray-400 mb-2">
        <strong>Calculate Monthly Earnings:</strong>
      </p>
      <input
        type="range"
        min="1"
        max="100"
        value={selectedPercentage}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
      <div className="mt-2">
        <p className="text-gray-400">
          Percentage of Tokens Selected: <strong>{selectedPercentage}%</strong>
        </p>
        <p className="text-gray-400">
          Quantity of Tokens Selected:{" "}
          <strong>{Math.ceil((selectedPercentage / 100) * totalTokens)}</strong>
        </p>
        <p className="text-gray-400">
          Estimated Monthly Earnings: <strong>${calculateMonthlyEarnings()}</strong>
        </p>
      </div>
    </div>
  );
};

export default MonthlyEarningsCalculator;
