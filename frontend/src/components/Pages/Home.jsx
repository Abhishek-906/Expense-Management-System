
import React, { useState } from "react";
import "../../index.css";
import SetBudget from "./SetBudget";
import DashboardPart from "./dashbordpart";

const Home = () => {
  const [activeSection , setActiveSection] = useState('dashboard');


  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-4 bg-gray-100 shadow-md">
        <h2 className="text-xl font-bold">Absence</h2>
        <div className="flex space-x-4">
          <div className="p-2">First</div>
          <h1 className="p-2">Hello</h1>
          <div className="p-2">Second</div>
        </div>
      </nav>

      {/* Dashboard Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="border-r-2 w-55 p-4 bg-gray-50 shadow-md">
          <div className="flex flex-col items-center">
            <img alt="logo" className="w-16 h-16 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwYOdZvDfIIJEjatcCAb8xk5l8fO7mC9cCpA&s" />
            <p className="mt-2 font-bold">Absence</p>
          </div>

          <div className="mt-6 flex flex-col space-y-4">
            <button className={`w-full p-2 ${activeSection === "default" ? "bg-gray-200 font-bold" : ""}`} onClick={()=> setActiveSection('dashboard')} >
              Dashboard
            </button>
            <button className={`w-full p-2 ${activeSection === "transactions" ? "bg-gray-200 font-bold" : ""}`} onClick={()=> setActiveSection('transactions')} >
              Transactions
            </button>
            <button className={`w-full p-2 ${activeSection === "setBudget" ? "bg-gray-200 font-bold" : ""}`} onClick={ ()=>setActiveSection('setBudget')} >
              Set Budget
            </button>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="flex-1 p-6 bg-white border-2 mr-1.5 ">
         { activeSection==="setBudget"?(<SetBudget/>): activeSection==="transactions"?(<h1>Tranaction</h1>):(<DashboardPart/>)}
        </div>
      </div>
    </div>
  );
};

export default Home;
