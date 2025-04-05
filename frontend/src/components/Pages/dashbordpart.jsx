

import React, { useState } from "react";

const DashboardPart = () => {
  const [timeRange, setTimeRange] = useState("monthly");

  // Financial cards data
  const financialCards = [
    { title: "Total Balance", value: "₹87,650", icon: "💰", trend: "up" },
    { title: "This Month Expenses", value: "₹15,345", icon: "💸", trend: "down" },
    { title: "This Month Income", value: "₹45,000", icon: "📈", trend: "up" },
    { title: "Last Month Expenses", value: "₹16,200", icon: "🔄", trend: "down" },
    { title: "Weekly Average", value: "₹3,836", icon: "📅", trend: "down" },
    { title: "Daily Budget Left", value: "₹1,022", icon: "🛡️", trend: "up" }
  ];

  // Spending categories
  const spendingCategories = [
    { name: "Food & Dining", amount: "₹4,500", percentage: 30, color: "bg-amber-400" },
    { name: "Transportation", amount: "₹2,300", percentage: 15, color: "bg-blue-500" },
    { name: "Entertainment", amount: "₹1,800", percentage: 12, color: "bg-purple-500" }
  ];

  // Simplified recent activity - easier to implement
  const recentActivity = [
    { icon: "🍔", description: "Food delivery", amount: "₹350", time: "2h ago" },
    { icon: "⛽", description: "Fuel", amount: "₹1,200", time: "Yesterday" },
    { icon: "🎬", description: "Movie tickets", amount: "₹600", time: "Nov 25" }
  ];

  return (
    <div className="flex flex-col h-full p-4 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <p className="text-gray-600">Your financial overview</p>
        </div>
        <select 
          className="border rounded-lg px-3 py-2 bg-white"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      {/* Financial Cards - 6 blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {financialCards.map((card, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <p className="text-xl font-bold">{card.value}</p>
              </div>
              <span className="text-2xl">{card.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spending Breakdown */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-xl font-bold mb-4">Spending Categories</h3>
          <div className="space-y-4">
            {spendingCategories.map((category, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span>{category.name}</span>
                  <span>{category.amount} ({category.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${category.color}`}
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity - Simplified */}
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center pb-2 border-b">
                <span className="text-2xl mr-3">{activity.icon}</span>
                <div className="flex-1">
                  <p className="font-medium">{activity.description}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
                <span className="text-red-500">-{activity.amount}</span>
              </div>
            ))}
            <button className="text-blue-500 mt-2 text-sm">View all transactions</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPart;