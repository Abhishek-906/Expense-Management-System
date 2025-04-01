import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import SetBudget from "./SetBudget";
import DashboardPart from "./dashbordpart";
import Transaction from "./transaction";

const Home = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load user data from localStorage when component mounts
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  const handleLogout = () => {
    // Clear user data and token
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  const handleEditProfile = () => {
    // Add your edit profile logic here
    console.log("Edit profile clicked");
    setShowDropdown(false);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="h-16 flex items-center justify-between p-4 bg-gray-100 shadow-md">
        <h2 className="text-xl font-bold">Absence</h2>
        <div className="flex space-x-4">
          <div className="p-2">First</div>
          <h1 className="p-2">Hello</h1>
          <div className="p-2">Second</div>
          
          {/* Profile Section with Dropdown */}
          <div className="relative p-2">
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <img 
                src="https://i.imgur.com/JLWfBWOs.jpg"
                alt="User" 
                className="w-8 h-8 rounded-full"
              />
              {userData && (
                <span className="ml-2">{userData.username}</span>
              )}
            </div>
            
            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                <div className="px-4 py-2 border-b">
                  {userData && (
                    <>
                      <p className="text-sm font-medium">{userData.username}</p>
                      <p className="text-xs text-gray-500">{userData.email}</p>
                    </>
                  )}
                </div>
                <button
                  onClick={handleEditProfile}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Left Sidebar */}
        <div className="w-56 bg-gray-200 p-4">
          <button 
            className={`w-full p-2 mb-2 text-left ${activeSection === "dashboard" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
            onClick={() => setActiveSection("dashboard")}
          >
            Dashboard
          </button>
          <button 
            className={`w-full p-2 mb-2 text-left ${activeSection === "set-budget" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
            onClick={() => setActiveSection("set-budget")}
          >
            Set Budget
          </button>
          <button 
            className={`w-full p-2 text-left ${activeSection === "transactions" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
            onClick={() => setActiveSection("transactions")}
          >
            Transactions
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 overflow-auto p-6">
          {activeSection === "dashboard" && <DashboardPart />}
          {activeSection === "set-budget" && <SetBudget />}
          {activeSection === "transactions" && <Transaction />}
        </div>
      </div>
    </div>
  );
};

export default Home;