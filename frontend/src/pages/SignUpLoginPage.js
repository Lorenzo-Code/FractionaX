import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const registerUrl = "http://localhost:8000/api/register/";




const SignUpLoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    rememberMe: false,
  });
  const [isSignUp, setIsSignUp] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const register = async (formData) => {
    const response = await fetch(registerUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Registration failed");
    }

    return await response.json();
  };
  
  
  const loginHandler = async ({ email, password }) => {
    try {
      const response = await fetch("http://localhost:8000/o/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "password",
          client_id: "mjrU2Q6o3IUFNdh4EaROMr7ymU3h8wtel9HSJ8K7",  // ✅ Use correct Client ID
          client_secret: "HZK9K1Fi9Z8Tim0wg9CxVCcloePTIx3eR6w51m4LAfEMXQIpfJm16JgPXEViDrmQIjBl6zkSR1ggQLR6MFRPrv0MZnNuigmHUGhNvehGNmEZciT4qgVXG2Y6DhDDH94H",  // ✅ Use correct Client Secret
          username: email,
          password: password,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ Login failed:", errorData);
        alert(errorData.error_description || "Login failed.");
        return null;
      }
  
      const data = await response.json();
      console.log("✅ Login successful, received OAuth2 token:", data);
  
      localStorage.setItem("authToken", data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);
      return data;
    } catch (error) {
      console.error("❌ Network error during login:", error);
      alert("An error occurred during login.");
      return null;
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      if (isSignUp) {
        // 🔹 Handle Sign-Up
        await register({
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          firstName: formData.firstName,
          lastName: formData.lastName,
        });
  
        alert("Registration successful! Please sign in.");
        setIsSignUp(false);  // 🔹 Switch to Login mode after registration
      } else {
        // 🔹 Handle Login (OAuth2)
        const data = await loginHandler({
          email: formData.email,
          password: formData.password,
        });
  
        if (!data || !data.access_token) {
          throw new Error("Authentication failed: No access token received.");
        }
  
        login(data.access_token);  // ✅ Store OAuth2 token in AuthContext
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        navigate("/dashboard");
      }
  
      // Handle "Remember Me"
      if (formData.rememberMe) {
        localStorage.setItem("rememberedEmail", formData.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };
  

  const toggleMode = () => {
    setIsSignUp((prev) => !prev);
    setError(null);
  };

  useEffect(() => {
    // Load remembered email from localStorage
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setFormData((prevData) => ({ ...prevData, email: savedEmail, rememberMe: true }));
    }
  }, []);



  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-r from-blue-500 to-purple-600">
      <Navbar />
      <div className="flex items-center justify-center flex-grow">
        <div className="w-full max-w-md bg-gray-800 text-white p-6 rounded-lg shadow-lg">
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-3xl font-bold mb-2">
              {isSignUp ? "Create Account" : "Welcome Back!"}
            </h1>
            <p className="text-gray-400">
              {isSignUp
                ? "Sign up to access premium features."
                : "Sign in to your account."}
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {isSignUp && (
              <>
                <div className="mb-4">
                  <label htmlFor="firstName" className="block text-sm mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="lastName" className="block text-sm mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </>
            )}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            {isSignUp && (
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}
            <div className="mb-4 flex items-center">
              <input type="checkbox" id="rememberMe" name="rememberMe" checked={formData.rememberMe} onChange={handleInputChange} className="mr-2" />
              <label htmlFor="rememberMe" className="text-sm">Remember Me</label>
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className={`w-full bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 rounded-lg text-white hover:from-purple-600 hover:to-blue-600 transition duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={loading}
            >
              {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </motion.form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-700" />
            <span className="px-4 text-gray-500">OR</span>
            <hr className="flex-grow border-gray-700" />
          </div>

          {/* Grayed-Out Options */}
          <button
            disabled
            className="w-full px-6 py-3 rounded-lg bg-gray-600 text-gray-400 mb-4 cursor-not-allowed"
          >
            Sign in with Gmail (Coming Soon)
          </button>
          <button
            disabled
            className="w-full px-6 py-3 rounded-lg bg-gray-600 text-gray-400 cursor-not-allowed"
          >
            Sign in with Crypto Wallet (Coming Soon)
          </button>

          {/* Toggle Button */}
          <div className="text-center mt-4">
            <button
              onClick={toggleMode}
              className="text-blue-400 hover:text-blue-600 transition"
            >
              {isSignUp
                ? "Already have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpLoginPage;
