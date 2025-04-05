import React, { useState } from "react";
const API_BASE_URL =  "http://localhost:3000";

// const SetBudget = () => {
//   const [monthlyBudget, updateBudget] = useState("");
//   const [savedBudget, setSavedBudget] = useState(null); 

//   const handleBudgetSave = async (event) => {

//     event.preventDefault(); 
//     const token = localStorage.getItem('token'); 

//     if (!token) {
//       alert("You are not logged in. Please log in first.");
//       return;
//     }

//     if (monthlyBudget.trim() === "" || isNaN(monthlyBudget)) {
//       alert("Please enter a valid budget amount");
//       return;
//     }

//     try {
//       const response = await fetch(`${API_BASE_URL}/user/monthlyBudget`, { 
//         method: "POST",  
//         headers: { "Content-Type": "application/json" ,   Authorization: token},
//         body: JSON.stringify({ monthlyBudget: Number(monthlyBudget) })
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update budget");
//       }

//       const data = await response.json();
//       console.log("Budget updated:", data);
//       setSavedBudget(data.updatedBudget); 
//       alert("Budget Update successfully");
//     } catch (error) {
//       console.error("Error during budget update:", error);
//     }
//   };

//   return (
//     <div>
//       <h3 className="text-lg font-bold mb-2">Set Budget</h3>
//       <form onSubmit={handleBudgetSave}>
//         <input 
//           type="number" 
//           className="border p-2 rounded w-full" 
//           placeholder="Enter your budget" 
//           value={monthlyBudget} 
//           onChange={(e) => updateBudget(e.target.value)} 
//         />
//         <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded w-full">
//           Save Budget
//         </button>
//       </form>
//     </div>
//   );
// };

const SetBudget = ({ transactions }) => {

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Financial Summary</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-medium text-green-800">Total Income</h3>
          <p className="text-2xl font-bold">2300</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="font-medium text-red-800">Total Expense</h3>
          <p className="text-2xl font-bold">123</p>
        </div>
      </div>

      <h3 className="font-medium mb-3">Expense Breakdown</h3>
      <div className="space-y-4">
          <div >
            <div className="flex justify-between mb-1">
              <span className="capitalize">food</span>
              <span>233 45%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
              
              ></div>
            </div>
          </div>
        
      </div>
    </div>
  );
};

export default SetBudget;
