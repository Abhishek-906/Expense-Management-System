import React, { useState, useEffect } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const DashboardPart = () => {
  const [timeRange, setTimeRange] = useState("monthly");
  const [analyticsData, setanalyticsData] = useState(null);
  const [loading, setLoading] = useState(false);

  const dateFormat = (date) => {
    return new Date(date).toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "food":
        return "🍔";
      case "bills":
        return "💡";
      case "salary":
        return "💰";
      case "other":
        return "📦";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/user/get-user-overview`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        });

        const result = await res.json();
        setanalyticsData(result.data);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalyticsData();
    setLoading(false);
  }, []);

  if (loading || !analyticsData) {
    return <div className="p-4 text-center text-gray-500">Loading dashboard...</div>;
  }

  const financialCards = [
    { title: "Monthly Budget", value: analyticsData.monthlyBudget.amount, icon: "💰", trend: "up" },
    { title: "This Month Expenses", value: analyticsData.thisMonthExpenses.amount, icon: "💸", trend: "down" },
    { title: "This Month Income", value: analyticsData.thisMonthIncome.amount, icon: "📈", trend: "up" },
    { title: "Last Month Expenses", value: analyticsData.lastMonthExpenses.amount, icon: "🔄", trend: "down" }
  ];

  const spendingCategories = [
    { name: "Food", amount: analyticsData.food.amount, percentage: analyticsData.food.percentage, color: "bg-amber-400" },
    { name: "Bills", amount: analyticsData.bills.amount, percentage: analyticsData.bills.percentage, color: "bg-blue-500" },
    { name: "Salary", amount: analyticsData.salary.amount, percentage: analyticsData.salary.percentage, color: "bg-purple-500" },
    { name: "Other", amount: analyticsData.other.amount, percentage: analyticsData.other.percentage, color: "bg-purple-500" }
  ];

  const recentActivity = [
    {
      icon: getCategoryIcon(analyticsData.lastTrans?.category),
      description: analyticsData.lastTrans?.category || "--",
      amount: analyticsData.lastTrans?.amount || 0,
      time: analyticsData.lastTrans ? dateFormat(analyticsData.lastTrans.createdAt) : "--",
      type: analyticsData.lastTrans?.type || "expense"
    },
    {
      icon: getCategoryIcon(analyticsData.secondlastTrans?.category),
      description: analyticsData.secondlastTrans?.category || "--",
      amount: analyticsData.secondlastTrans?.amount || 0,
      time: analyticsData.secondlastTrans ? dateFormat(analyticsData.secondlastTrans.createdAt) : "--",
      type: analyticsData.secondlastTrans?.type || "expense"
    },
    {
      icon: getCategoryIcon(analyticsData.thirdLastTrans?.category),
      description: analyticsData.thirdLastTrans?.category || "--",
      amount: analyticsData.thirdLastTrans?.amount || 0,
      time: analyticsData.thirdLastTrans ? dateFormat(analyticsData.thirdLastTrans.createdAt) : "--",
      type: analyticsData.thirdLastTrans?.type || "expense"
    }
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                <span className={`font-semibold ${activity?.type === "expense" ? "text-red-500" : "text-green-500"}`}>
                  {activity?.type === "expense" ? `-₹${activity?.amount || 0}` : `+₹${activity?.amount || 0}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPart;




