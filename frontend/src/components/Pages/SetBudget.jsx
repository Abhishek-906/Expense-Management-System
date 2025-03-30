import React, { useState } from "react";
const API_BASE_URL =  "http://localhost:3000";
const SetBudget = () => {
  const [monthlyBudget, updateBudget] = useState("");
  const [savedBudget, setSavedBudget] = useState(null); 

  const handleBudgetSave = async (event) => {
    event.preventDefault(); 

    const token = localStorage.getItem('token'); 

    if (!token) {
      alert("You are not logged in. Please log in first.");
      return;
    }


    if (monthlyBudget.trim() === "" || isNaN(monthlyBudget)) {
      alert("Please enter a valid budget amount");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/user/monthlyBudget`, { 
        method: "POST",  
        headers: { "Content-Type": "application/json" ,   Authorization: token},
        body: JSON.stringify({ monthlyBudget: Number(monthlyBudget) })
      });

      if (!response.ok) {
        throw new Error("Failed to update budget");
      }

      const data = await response.json();
      console.log("Budget updated:", data);
      setSavedBudget(data.updatedBudget); 
    } catch (error) {
      console.error("Error during budget update:", error);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Set Budget</h3>
      <form onSubmit={handleBudgetSave}>
        <input 
          type="number" 
          className="border p-2 rounded w-full" 
          placeholder="Enter your budget" 
          value={monthlyBudget} 
          onChange={(e) => updateBudget(e.target.value)} 
        />
        <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded w-full">
          Save Budget
        </button>
      </form>
    </div>
  );
};

export default SetBudget;
