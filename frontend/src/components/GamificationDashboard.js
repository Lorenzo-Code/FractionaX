import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext"; // ✅ Import useAuth to get user data

const GamificationDashboard = () => {
  const { user, balance } = useAuth(); // ✅ Get user details & FXT balance from AuthContext

  // ✅ UseState for financial stats (ensures updates trigger UI re-render)
  const [fctHoldings, setFctHoldings] = useState(0);
  const [fstHoldings, setFstHoldings] = useState(0);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [stakingRewards, setStakingRewards] = useState(0);
  const [earnings, setEarnings] = useState({ total: 0, percentage: 0 });
  const [fctRate, setFctRate] = useState(0);
  const [fstRate, setFstRate] = useState(0);
  const [totalMade, setTotalMade] = useState({ total: 0, percentage: 0 });

  // ✅ Manage user information
  const [userData, setUserData] = useState({
    username: user ? `${user.first_name} ${user.last_name}` : "User",
    email: user?.email || "user@example.com",
    level: user?.level || 1,  
    xp: user?.xp || 0,        
    xpForNextLevel: user?.xp_for_next_level || 100,  
    achievements: user?.achievements || [],  
  });

  // ✅ Populate Data When User is Available
  useEffect(() => {
    if (user) {
      setUserData({
        username: `${user.first_name} ${user.last_name}`,
        email: user.email,
        level: user.level || 1,
        xp: user.xp || 0,
        xpForNextLevel: user.xpForNextLevel || 100,
        achievements: user.achievements || [],
      });

      // ✅ Update Financial Data
      setFctHoldings(user.fctHoldings || 0);
      setFstHoldings(user.fstHoldings || 0);
      setPortfolioValue(user.portfolioValue || 0);
      setStakingRewards(user.stakingRewards || 0);
      setEarnings(user.earnings || { total: 0, percentage: 0 });
      setFctRate(user.fctRate || 0);
      setFstRate(user.fstRate || 0);
      setTotalMade(user.totalMade || { total: 0, percentage: 0 });
    }
  }, [user]); // ✅ Runs when `user` updates

  const xpPercentage = (userData.xp / userData.xpForNextLevel) * 100;

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md w-full mx-auto">
      <div className="space-y-6">
        {/* User Summary Section */}
        <div className="flex flex-col md:flex-row items-start bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-lg shadow-md">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-blue-400">Welcome, {userData.username}</h3>
            <p className="text-gray-400 text-sm">Level: {userData.level}</p>
            <div className="mt-2">
              <div className="text-sm text-gray-400 mb-1">XP Progress:</div>
              <div className="w-full bg-gray-700 h-3 rounded-lg overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${xpPercentage}%` }}
                  className={`${
                    xpPercentage > 75
                      ? "bg-green-500"
                      : xpPercentage > 50
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  } h-full`}
                  transition={{ duration: 0.8 }}
                ></motion.div>
              </div>
              <p className="text-gray-400 text-sm mt-2">
                {userData.xp} / {userData.xpForNextLevel} XP
              </p>
            </div>
          </div>
        </div>

        {/* ✅ Achievements Section */}
        <div className="bg-gray-800 p-4 rounded-md shadow-md">
          <h3 className="text-blue-400 text-lg font-bold mb-3">Achievements</h3>
          {userData.achievements.length > 0 ? (
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {userData.achievements.map((achievement) => (
                <li key={achievement.id} className="p-3 bg-gray-700 rounded-md shadow-md text-center">
                  <span className="text-2xl">{achievement.icon}</span>
                  <p className="text-sm mt-2">{achievement.name}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-sm">No achievements unlocked yet.</p>
          )}
        </div>

        {/* ✅ User Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-800 rounded-md shadow-md text-center">
            <h3 className="text-blue-400 text-sm">Portfolio Value</h3>
            <p className="text-xl font-bold">${portfolioValue.toLocaleString()}</p>
          </div>

          {/* ✅ FXT Balance Display */}
          <div className="p-4 bg-gray-800 rounded-md shadow-md text-center">
            <h3 className="text-blue-400 text-sm">FXT Holdings</h3>
            <p className="text-xl font-bold">{balance.toLocaleString()} FXT</p>
          </div>

          <div className="p-4 bg-gray-800 rounded-md shadow-md text-center">
            <h3 className="text-blue-400 text-sm">FCT Holdings</h3>
            <p className="text-xl font-bold">{fctHoldings.toLocaleString()} FCT</p>
          </div>
          
          <div className="p-4 bg-gray-800 rounded-md shadow-md text-center">
            <h3 className="text-blue-400 text-sm">FST Holdings</h3>
            <p className="text-xl font-bold">{fstHoldings.toLocaleString()} FST</p>
          </div>
          
          <div className="p-4 bg-gray-800 rounded-md shadow-md text-center">
            <h3 className="text-blue-400 text-sm">Staking Rewards</h3>
            <p className="text-xl font-bold">${stakingRewards.toLocaleString()}</p>
          </div>
          
          <div className="p-4 bg-gray-800 rounded-md shadow-md text-center">
            <h3 className="text-blue-400 text-sm">Earnings</h3>
            <p className="text-xl font-bold">${earnings.total.toLocaleString()} ({earnings.percentage}%)</p>
          </div>
          
          <div className="p-4 bg-gray-800 rounded-md shadow-md text-center">
            <h3 className="text-blue-400 text-sm">FCT Rate</h3>
            <p className="text-xl font-bold">{fctRate}%</p>
          </div>
          
          <div className="p-4 bg-gray-800 rounded-md shadow-md text-center">
            <h3 className="text-blue-400 text-sm">FST Rate</h3>
            <p className="text-xl font-bold">{fstRate}%</p>
          </div>
          
          <div className="p-4 bg-gray-800 rounded-md shadow-md text-center">
            <h3 className="text-blue-400 text-sm">Total Made</h3>
            <p className="text-xl font-bold">${totalMade.total.toLocaleString()} ({totalMade.percentage}%)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamificationDashboard;
