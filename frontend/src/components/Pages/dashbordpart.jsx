import React, { useState } from "react";

const DashboardPart = () => {
  return (
    <>
    <div className="flex h-full flex-col ">
      <div className="flex flex-[0.1] ">
        <h2>Dashboard</h2>
      </div>

      <div className="flex flex-col flex-[0.5] h-full ">
        <div className="flex  justify-between flex-[0.1]">
          <h4>Overview</h4>
          <input type="text" placeholder="default" />
        </div>

        <div className=" grid grid-cols-3 flex-[0.9]">
          <div className="card border-2 m-1">
            Total Expenses <br /> <strong>20</strong>
          </div>
          <div className="card border-2 m-1">
            Yesterday Expenses <strong>20</strong>
          </div>
          <div className="card border-2 m-1">
            Last 7 day's Expenses <strong>20</strong>
          </div>
          <div className="card border-2 m-1">
            Last 30 day's Expenses <strong>20</strong>
          </div>
          <div className="card border-2 m-1">
            Monthly Expense <strong>10</strong>
          </div>
          <div className="card border-2 m-1">
            Total Expenses <br /> <strong>1</strong>
          </div>
        </div>
      </div>
      
      <div className="border-2  flex flex-col  p-2 m-1">
        <h3 className="text-xl font-bold mb-2">Balancing Report</h3>
        <label className="mb-2">
          From: <input type="date" />
        </label>
        <label className="mb-2">
          To: <input type="date" />
        </label>
        <button className="mt-auto px-4 py-2 bg-blue-500 text-white rounded">
          Generate Report
        </button>
      </div>
      </div>
    </>
  );
};

export default DashboardPart;
