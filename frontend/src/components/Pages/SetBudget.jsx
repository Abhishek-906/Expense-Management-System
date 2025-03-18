import React, { useState } from "react";

const SetBudget = () => {
  const [budget, setBudget] = useState("");
  const [savedBudget, setSavedBudget] = useState(null);

  const handleBudgetSave = () => {
    if (budget.trim() === "" || isNaN(budget)) {
      alert("Please enter a valid budget amount");
      return;
    }
    setSavedBudget(Number(budget));
    alert(`Budget set to ₹${budget}`);
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Set Budget</h3>
      <input type="number" className="border p-2 rounded w-full" placeholder="Enter your budget" value={budget} onChange={(e) => setBudget(e.target.value)} />
      <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded w-full" onClick={handleBudgetSave}>
        Save Budget
      </button>
      {savedBudget !== null && <p className="mt-2 text-green-600 font-bold">Budget: ₹{savedBudget}</p>}
    </div>
  );
};

export default SetBudget;
