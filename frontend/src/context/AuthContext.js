import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState(() => localStorage.getItem("authToken"));
  const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem("refreshToken"));
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!authToken);
  const [loading, setLoading] = useState(true);
  const [likedInvestments, setLikedInvestments] = useState([]);
  const [balance, setBalance] = useState(0);

  const logout = useCallback(() => {
    console.log("🚪 Logging out...");
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    setAuthToken(null);
    setRefreshToken(null);
    setIsAuthenticated(false);
    setUser(null);
    setLikedInvestments([]);
    navigate("/login");
  }, [navigate]);

  const refreshAccessToken = useCallback(async () => {
    if (!refreshToken) {
      logout();
      return null;
    }

    try {
      const response = await fetch("http://localhost:8000/o/token/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
          client_id: "mjrU2Q6o3IUFNdh4EaROMr7ymU3h8wtel9HSJ8K7",
          client_secret: "HZK9K1Fi9Z8Tim0wg9CxVCcloePTIx3eR6w51m4LAfEMXQIpfJm16JgPXEViDrmQIjBl6zkSR1ggQLR6MFRPrv0MZnNuigmHUGhNvehGNmEZciT4qgVXG2Y6DhDDH94H",
        }),
      });

      if (!response.ok) throw new Error("Failed to refresh token");

      const data = await response.json();
      localStorage.setItem("authToken", data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);
      setAuthToken(data.access_token);
      setRefreshToken(data.refresh_token);
      return data.access_token;
    } catch (err) {
      console.error("Error refreshing token", err);
      logout();
      return null;
    }
  }, [refreshToken, logout]);

  const fetchUserProfile = useCallback(async (token = authToken) => {
    if (!token) return;

    try {
      const res = await fetch("http://localhost:8000/api/user-profile/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.status === 401) {
        const newToken = await refreshAccessToken();
        if (newToken) return fetchUserProfile(newToken);
        return;
      }

      if (!res.ok) throw new Error(`Failed to fetch profile`);

      const data = await res.json();
      setUser(data);
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Fetch user failed:", err);
      logout();
    }
  }, [authToken, refreshAccessToken, logout]);

  const fetchLikedInvestments = useCallback(async () => {
    if (!authToken) return;

    try {
      const res = await fetch("http://localhost:8000/api/liked-investments/", {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      const data = await res.json();
      setLikedInvestments(data.liked_investments || []);
    } catch (err) {
      console.error("Liked fetch failed", err);
    }
  }, [authToken]);

  const fetchBalance = useCallback(async (accountId) => {
    if (!accountId) return;

    try {
      const res = await fetch(`http://localhost:8000/api/balance/${accountId}/`);
      const data = await res.json();
      if (data.FXT_balance !== undefined) setBalance(data.FXT_balance);
    } catch (err) {
      console.error("Balance fetch failed", err);
    }
  }, []);

  const login = async (accessToken, refreshToken) => {
    localStorage.setItem("authToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setAuthToken(accessToken);
    setRefreshToken(refreshToken);
    setIsAuthenticated(true);
    await fetchUserProfile(accessToken);
    await fetchLikedInvestments();
    navigate("/dashboard");
  };

  useEffect(() => {
    if (authToken) {
      Promise.all([fetchUserProfile(), fetchLikedInvestments()]).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [authToken, fetchUserProfile, fetchLikedInvestments]);

  if (loading) return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <AuthContext.Provider
      value={{
        authToken,
        refreshToken,
        isAuthenticated,
        user,
        balance,
        login,
        logout,
        fetchUserProfile,
        fetchLikedInvestments,
        fetchBalance,
        likedInvestments,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
