import React, { useState, useEffect } from "react";

const Transaction = () => {

  return(
    <div className="flex h-screen bg-gray-50">

      <div className="w-1/3 bg-white shadow-lg p-6" >

       <div>
       <h2 className="text-xl font-bold text-gray-800">Transaction Panel</h2>
        <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm">Close Slidebar</button>
       </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" >Select Transaction Type</label>
          <select className="w-full border border-gray-300 rounded-md focus:outline-none  focus:ring-2 focus:ring-blue-500">
            <option >Add Transaction</option>
            <option >Get Transaction</option>
          </select>
        </div>
       
       <form className="space-y-4">
        <div>
        <label className="block text-gray-700 mb-1">Amount</label>
        <input type="text" placeholder="0.00"  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
      
        <div>
            <label className="block text-gray-700 mb-1">Type</label>
            <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Income</option>
              <option>Expense</option>
            </select>
          </div>


          <div>
            <label className="block text-gray-700 mb-1">Category</label>
            <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Food</option>
              <option>Bills</option>
              <option>Salary</option>
              <option>Other</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-200"
          >
            Proceed Transaction
          </button>
       </form>
      </div>


      

      {/* for showing transaction */}
      <div className="flex-1 p-8">

         <div className="flex justify-between items-center mb-8">
           <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md" >Open Sidebar</button>
          
           <div className="flex items-center space-x-2 w-1/2">
            <input
              type="text"
              placeholder="Search transactions..."
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md">
              Search
            </button>
          </div>
        </div>


        
         <div>
          <h2>Transaction History</h2>
         </div>


      </div>
    </div>
  )
};

export default Transaction;





























// import { useNavigate } from "react-router-dom";
// import React, { useState } from "react";

// const API_BASE_URL = "http://localhost:3000";

// const Transaction = () => {
//   const [transactionType , setTransactionType] = useState("addTransaction");

//   const [amount, setAmount] = useState("");
//   const [type, setType] = useState("");
//   const [category, setCategory] = useState("");

//   const handleTransaction = async (event) => {
//     event.preventDefault();

//     const token = localStorage.getItem('token'); 

//     if (!token) {
//       alert("You are not logged in. Please log in first.");
//       return;
//     }

//     try {
//       const response = await fetch(`${API_BASE_URL}/transaction/addTrans`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token, 
//         },
//         body: JSON.stringify({
//           amount,
//           category,
//           type,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         console.log("Transaction Success", data);
//         alert("Transaction added successfully!");
//       } else {
//         alert(`Error: ${data.message}`);
//       }
//     } catch (error) {
//       console.error("Error during Transaction:", error);
//       alert("An error occurred. Please try again.");
//     }
//   };

//   return (

// <>
//       <div>
//          <h3>Select Transacion type</h3>
//          <div>
//           <select>
//             <option value="addTransaction" value={addTransaction} onChange={(e)=>setTransactionType(e.target.value)} >Add Transaction</option>
//             <option value="getTransaction" >Get Transaction</option>
//           </select>
//          </div>
//       </div>


//     <div className="form-container border-2 p-4 max-w-md mx-auto bg-white rounded-lg">
//       <form onSubmit={handleTransaction} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Amount</label>
//           <input
//             type="text"
//             placeholder="ex: 400"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Type</label>
//           <input
//             type="text"
//             placeholder="expense/income"
//             value={type}
//             onChange={(e) => setType(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Category</label>
//           <input
//             type="text"
//             placeholder="Food/travel..."
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div className="mt-6">
//           <button
//             type="submit"
//             className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             Proceed
//           </button>
//         </div>
//       </form>
//     </div>
//     </>
//   );
// };

// export default Transaction;