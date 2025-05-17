import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // Import authentication context

const SettingsPage = () => {
  // State for user profile
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  // State for settings
  const [theme, setTheme] = useState("light");
  const [emailNotifications, setEmailNotifications] = useState(true);
  // const [pushNotifications, setPushNotifications] = useState(false);
  // const [smsNotifications, setSmsNotifications] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [connected, setConnected] = useState(false);

  // Access authentication token from context
  const { authToken } = useAuth();

  // Fetch user profile from backend when component mounts
  useEffect(() => {
    console.log("Auth Token at Mount:", authToken); // ✅ Debug: Check if the token exists when component loads
  
    if (!authToken) {
      console.error("No authentication token found.");
      return;
    }
  
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user-profile/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`,
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch profile data.");
        }
  
        const data = await response.json();
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setEmail(data.email);
        setWalletAddress(data.wallet_address || "");
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
  
    fetchUserProfile();
  }, [authToken]); // ✅ Runs when authToken changes
  
  // Save user profile changes to backend
  const handleSave = async () => {
    console.log("Auth Token:", authToken); // ✅ Debugging: Check if the token exists
  
    if (!authToken) {
      alert("User is not authenticated.");
      return;
    }
  
    try {
      setIsSaving(true);
      const response = await fetch("http://localhost:8000/api/user-profile/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          wallet_address: walletAddress,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to save profile details.");
      }
  
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to save profile:", error);
      alert("Failed to save profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };  

  // Handle wallet connection and disconnection
  const handleConnectWallet = () => {
    const address = prompt("Please enter your wallet address:");
    if (address) {
      setWalletAddress(address);
      setConnected(true);
    }
  };

  const handleDisconnectWallet = () => {
    setWalletAddress("");
    setConnected(false);
    alert("Wallet disconnected.");
  };

  // Export and Import settings
  const handleExportSettings = () => {
    const settings = {
      firstName,
      lastName,
      email,
      theme,
      walletAddress,
    };
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "settings.json";
    a.click();
  };

  const handleImportSettings = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const importedSettings = JSON.parse(event.target.result);
      setFirstName(importedSettings.firstName || "");
      setLastName(importedSettings.lastName || "");
      setEmail(importedSettings.email || "");
      setTheme(importedSettings.theme || "light");
      setWalletAddress(importedSettings.walletAddress || "");
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-blue-400">Settings</h1>
      </header>

      <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
        {/* Profile Section */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">Profile</h2>
          <div className="flex flex-col gap-4">
            <label className="flex flex-col">
              <span className="text-gray-400">First Name</span>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="p-2 rounded bg-gray-700 text-white border border-gray-600"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-gray-400">Last Name</span>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="p-2 rounded bg-gray-700 text-white border border-gray-600"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-gray-400">Email</span>
              <input
                type="email"
                value={email}
                className="p-2 rounded bg-gray-700 text-white border border-gray-600"
                disabled
              />
            </label>
          </div>
        </section>

        {/* Crypto Wallet Section */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">Crypto Wallet</h2>
          <div className="flex flex-col gap-4">
            {!connected ? (
              <button onClick={handleConnectWallet} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Connect Wallet
              </button>
            ) : (
              <div>
                <p className="text-gray-400">Connected Wallet Address:</p>
                <p className="text-blue-400 font-mono">{walletAddress}</p>
                <button onClick={handleDisconnectWallet} className="px-4 py-2 mt-4 bg-red-500 text-white rounded hover:bg-red-600">
                  Disconnect Wallet
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Notification Settings */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">Notifications</h2>
          <div className="flex flex-col gap-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={emailNotifications} onChange={() => setEmailNotifications(!emailNotifications)} />
              <span className="text-gray-400">Receive Email Notifications</span>
            </label>
          </div>
        </section>

        {/* Export & Import Settings */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">Backup & Restore Settings</h2>
          <button onClick={handleExportSettings} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Export Settings
          </button>
          <input type="file" accept=".json" onChange={handleImportSettings} className="mt-2 text-gray-400" />
        </section>

        {/* Save Button */}
        <div className="text-center">
          <button onClick={handleSave} className={`px-4 py-2 rounded ${isSaving ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
