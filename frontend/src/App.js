import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import SignUpLoginPage from "./pages/SignUpLoginPage";
import InvestmentSection from "./pages/InvestmentSection";
import InvestmentExplorerPage from "./pages/InvestmentExplorerPage";
import FAQPage from "./pages/FAQPage";
import WhitePaper from "./pages/Whitepaper";
import ScrollToTop from "./components/ScrollToTop";
import Dashboard from "./pages/Dashboard";
import SettingsPage from "./pages/SettingsPage";
import StakingPage from "./pages/StakingPage";
import SocialPage from "./pages/SocialPage";
import PropertyDetailPage from "./pages/PropertyDetailPage"; // ✅ New Import

// Protect routes for authenticated users only
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  console.log("PrivateRoute: isAuthenticated =", isAuthenticated);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/auth" replace />;
};

const App = () => {
  useEffect(() => {
    document.body.style.overflowX = "hidden";

    return () => {
      document.body.style.overflowX = "auto";
    };
  }, []);

  return (
    <Router basename="/">
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/auth" element={<SignUpLoginPage />} />
          <Route path="/investments" element={<InvestmentSection />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/whitepaper" element={<WhitePaper />} />

          {/* ✅ Property Details Page */}
          <Route path="/property/:id" element={<PropertyDetailPage />} />

          {/* ✅ Private Routes */}
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path="settings" element={<SettingsPage />} />
            <Route path="investment-explorer" element={<InvestmentExplorerPage />} />
            <Route path="staking-page" element={<StakingPage />} />
            <Route path="social-page" element={<SocialPage />} />
          </Route>

          {/* Catch-all for unknown routes */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
