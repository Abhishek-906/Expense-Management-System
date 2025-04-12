import React, { useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const Transaction = () => {
  const [currentTrans, setCurrentTrans] = useState("addTrans");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");
  const [transactions, setTransactions] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [filterDate, setFilterDate] = useState("thismonth");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleteId , setDeleteId] = useState("");

  const token = localStorage.getItem('token');

  const fetchTransactions = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/transaction/getTrans`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
          type: filterType,
          datevalue: filterDate
        })
      });

      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const data = await response.json();
      setTransactions(data.transactions);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addingTrans = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/transaction/addTrans`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },      
        body: JSON.stringify({
          amount,
          category, 
          type
        })
      });
     
      const data = await response.json();
      if (response.ok) {
        setAmount("");
        setType("expense");
        setCategory("food");
        alert("Transaction added successfully!");
      } else {
        throw new Error(data.message || "Failed to add transaction");
      }
    } catch (error) {
      setError(error.message);
      alert("Montly Budget exceeding");

    }
  };


  const deleteTransaction = async (transactionId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/transaction/deleteTrans/${transactionId}`, {
        method: "DELETE",
        headers: {
          'Authorization': token
        }
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }
      
      fetchTransactions();
      alert("Transaction deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete transaction");
    }
  };


  const addTransClass = currentTrans === "addTrans" ? "" : "hidden";
  const getTransClass = currentTrans === "getTrans" ? "" : "hidden";

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="w-1/3 bg-white shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Transaction Panel</h2>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
            >
              Close
            </button>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Transaction Type</label>
            <select
              value={currentTrans}
              onChange={(e) => setCurrentTrans(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="addTrans">Add Transaction</option>
              <option value="getTrans">Get Transaction</option>
            </select>
          </div>

          {/* Add Transaction Form */}
          <form className={`space-y-4 ${addTransClass}`} onSubmit={addingTrans}>
            <div>
              <label className="block text-gray-700 mb-1">Amount</label>
              <input         
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                placeholder="0.00"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Type</label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setType(e.target.value)}
                value={type}
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Category</label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option value="food">Food</option>
                <option value="bills">Bills</option>
                <option value="salary">Salary</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-200"
            >
              Add Transaction
            </button>
          </form>

          {/* Get Transaction Form */}
          <form className={`space-y-4 ${getTransClass}`} onSubmit={(e) => {
            e.preventDefault();
            fetchTransactions();
          }}>
            <div>
              <label className="block text-gray-700 mb-1">Filter by Type</label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Filter by Date</label>  
              <select 
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              >
                <option value="thismonth">This Month</option>
                <option value="lastmonth">Last Month</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-200"
            >
              Filter Transactions
            </button>
          </form>
        </div>
      )}

      {/* Main Content */}
      <div className={`flex-1 p-8 ${!sidebarOpen ? "ml-0" : ""}`}>
        <div className="flex justify-between items-center mb-8">
          {!sidebarOpen && (
            <button 
              onClick={() => setSidebarOpen(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Open Panel
            </button>
          )}
          
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

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            {currentTrans === "addTrans" ? "Add New Transaction" : "Transaction History"}
          </h2>

          {currentTrans === "addTrans" ? (
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h3 className="font-medium text-lg text-blue-800 mb-3">
                How to add a transaction
              </h3>
              <ol className="list-decimal pl-5 space-y-2 text-blue-700">
                <li>Enter the transaction amount in the form</li>
                <li>Select whether it's income or expense</li>
                <li>Choose the appropriate category</li>
                <li>Click the "Add Transaction" button</li>
              </ol>
              <div className="mt-4 p-3 bg-blue-100 text-blue-800 rounded text-sm">
                Tip: Your transaction will appear in the history after you add it.
              </div>
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {loading ? (
                <div className="p-4 text-center">Loading transactions...</div>
              ) : error ? (
                <div className="p-4 text-center text-red-500">{error}</div>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-3 text-left text-gray-700">Amount</th>
                      <th className="p-3 text-left text-gray-700">Type</th>
                      <th className="p-3 text-left text-gray-700">Category</th>
                      <th className="p-3 text-left text-gray-700">Date</th>
                      <th className="p-3 text-left text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.length > 0 ? (
                      transactions.map((transaction) => (
                        <tr key={transaction._id} className="border-t border-gray-200 hover:bg-gray-50">
                          <td className="p-3">${transaction.amount.toFixed(2)}</td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              transaction.type === "income" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-red-100 text-red-800"
                            }`}>
                              {transaction.type}
                            </span>
                          </td>
                          <td className="p-3">
                            {transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1)}
                          </td>
                          <td className="p-3">
                            {new Date(transaction.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-3 flex space-x-2">
                            <button 
                              className="text-gray-500 hover:text-red-500 transition-colors"
                              onClick={() => deleteTransaction(transaction._id)  }
                            >
                              <span role="img" aria-label="Delete">🗑️</span>
                            </button>
                            <button 
                              className="text-gray-500 hover:text-blue-500 transition-colors" 
                              onClick={() => alert('Edit clicked!')}
                            >
                              <span role="img" aria-label="Edit">✏️</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="p-4 text-center text-gray-500">
                          No transactions found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transaction;