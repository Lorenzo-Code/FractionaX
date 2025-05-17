import React, { useState, useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Sidebar from "../components/Sidebar";
import DashboardHeroSection from "../components/DashboardHeroSection";
import GamificationDashboard from "../components/GamificationDashboard";
import RegulatoryComplianceSummary from "../components/RegulatoryComplianceSummary";
import LikedInvestments from "../components/LikedInvestments";
import TradeFCTFST from "../components/TradeFCTFST";
import NewsFeed from "../components/NewsFeed";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext"; // Import AuthContext


const Dashboard = () => {
  const { user, authToken } = useAuth(); // Get user and token from AuthContext
  const { likedInvestments, fetchLikedInvestments } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };


  // Check if the current route matches a specific dashboard feature
  const isInvestmentExplorer = location.pathname === "/dashboard/investment-explorer";
  const isSettings = location.pathname === "/dashboard/settings";
  const isStakingPage = location.pathname === "/dashboard/staking-page";
  const isSocialPage = location.pathname === "/dashboard/social-page";

  // Fetch user's liked investments from the backend
  useEffect(() => {
    fetchLikedInvestments(); // ✅ Fetch liked investments when the dashboard loads
  }, [fetchLikedInvestments]);
  

  // Sidebar fixed width and main content layout
  return (
    <div>
      <div className="flex bg-gray-900 text-white min-h-screen">
        {/* Sidebar */}
        <div
          className={`${isSidebarCollapsed ? "-translate-x-full" : "translate-x-0"
            } bg-gray-800 text-white h-screen fixed top-0 left-0 w-64 transition-transform duration-300 z-40`}
        >
          {/* Pass the toggleSidebar function as a prop */}
          <Sidebar toggleSidebar={toggleSidebar} isCollapsed={isSidebarCollapsed} />
        </div>

        {/* Main Content */}
        <div
          className={`flex-1 transition-all duration-300 ${isSidebarCollapsed
              ? "ml-0" // When sidebar is collapsed, no left margin
              : "ml-64" // When sidebar is expanded, 64px left margin for sidebar width
            }`}
          style={{
            maxWidth: "100%", // Set max width to ensure the layout remains fluid
          }}
        >
          {/* Hero Section */}
          <div className="bg-gray-900 sticky top-0 z-10">
            <DashboardHeroSection
              user={user ? `${user.first_name} ${user.last_name}` : "User"} // Display user's full name
              isSidebarCollapsed={isSidebarCollapsed}
              toggleSidebar={toggleSidebar} // Pass toggle function to HeroSection
            />
          </div>

          {/* Conditionally Render Components */}
          {isInvestmentExplorer ? (
            <Outlet context={{ likedInvestments: [], toggleLike: () => {} }} />
          ) : isSettings ? (
            <Outlet />
          ) : isStakingPage ? (
            <Outlet />
          ) :isSocialPage ? (
            <Outlet />
          ) : (
            <>
              {/* Render Other Dashboard Components */}
              <GamificationDashboard />
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Liked Investments */}
                <div className="lg:w-3/4 w-full">
                <LikedInvestments likedInvestments={likedInvestments || []} />
                </div>

                {/* News Feed */}
                <div className="lg:w-1/4 w-full">
                  <NewsFeed />
                </div>
              </div>
              <TradeFCTFST />
              <RegulatoryComplianceSummary />
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;

  