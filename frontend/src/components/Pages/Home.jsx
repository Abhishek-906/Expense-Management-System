import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import SetBudget from "./SetBudget";
import DashboardPart from "./dashbordpart";
import Transaction from "./transaction";
const API_BASE_URL = "http://localhost:3000";

const Home = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [fullname, setfullname] = useState("");
  const [monthlysalary , setmonthlysalary] = useState("");
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showEditPage, setShowEditPage] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  const handleLogout = () => {
    // Clear user data and token
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  const handleEditClick = () => {
    // setShowDropdown(false);
    setShowEditPage(true);
  };

  /*
  const handleChanges = async (event) => {
    try {
      event.preventDefault(); 

      const response = await fetch(`${API_BASE_URL}/user/editUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          fullname,
          monthlySalary,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

    } catch (error) {
    console.log("An error occurred during value update")
    }
  };

  */

  const handleChanges = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch(`${API_BASE_URL}/user/editUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': token
        },
        body: JSON.stringify({
          username,
          email,
          password,
          monthlysalary, 
        }),
      });
  
      const data = await response.json();
      console.log("Response:", data); 
  
      if (!response.ok) {
        throw new Error(data.message || "Update failed");
      }
      navigate('/login')
    } catch (error) {
      console.error("An error occurred during value update:", error);
    }
  };
  
  return (
    <div className="h-screen flex flex-col">
      {/* Top Navigation Bar  */}
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
              {userData && <span className="ml-2">{userData.username}</span>}
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
                  onClick={handleEditClick}
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

      {showEditPage && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <form
            className="bg-white p-8 rounded-lg shadow-lg w-96"
            onSubmit={handleChanges}
          >
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Edit Profile
            </h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1" >
                Username
              </label>
              <input
                type="text"  value={username} onChange={(e)=>setusername(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email" value={email} onChange={(e)=>setemail(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                type="password"  value={password} onChange={(e)=>setpassword(e.target.value)}
                placeholder="password"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-1">
                Monthly Budget
              </label>
              <input
                type="number" value={monthlysalary} onChange={(e)=>setmonthlysalary(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setShowEditPage(false)}
                className="flex-1 bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Left Sidebar */}
        <div className="w-56 bg-gray-200 p-4">
          <button
            className={`w-full p-2 mb-2 text-left ${
              activeSection === "dashboard"
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
            onClick={() => setActiveSection("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`w-full p-2 mb-2 text-left ${
              activeSection === "set-budget"
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
            onClick={() => setActiveSection("set-budget")}
          >
            Set Budget
          </button>
          <button
            className={`w-full p-2 text-left ${
              activeSection === "transactions"
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
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
