import React from "react";
import '../../index.css'


const Dashboard = () => {
  return (
    <>

      <nav className="flex items-center justify-between m-4">
        <h2 className="text-xl font-bold" >absence</h2>
        <div className=" flex ">
          <div className="p-2">first</div>
          <h1  className="p-2">hello</h1>
          <div className="p-2">second</div>
        </div>
      </nav>


      <div className="flex h-full  p-2 ">

       <div className="border-2 w-full flex-[1.5]">
          <div>
            <img></img>
            <p>absence</p>
          </div>

          <div>
            setBudget
          </div>
          <div>
            transaction
          </div>
          <div>
            default
          </div>
       </div>




        <div className="border-2 w-full flex-[8.5]  min-h-screen p-6  h-full flex flex-col">
          <div className="flex flex-[1]">
          <h2>Dashboard</h2>
          </div>
        
          <div className=" flex flex-col h-full flex-[6]">

            <div className="flex flex-[2] justify-between ">
              <h4 >Overview</h4>
              <input type="text" placeholder="default"></input>
            </div>

            
            <div className=" flex-[8] grid grid-cols-3 ">
              <div className="card border-2 m-1 border-r-2">
                Total Expenses <br /> <strong>20</strong>
              </div>
              <div className="card border-2 m-1 border-r-2">
                Yesterday Expenses <strong>20</strong>
              </div>
              <div className="card border-2 m-1 border-r-2">
                Last 7 day's Expenses <strong>20</strong>
              </div>
              <div className="card border-2 m-1 border-r-2">
                Last 30 day's Expenses <strong>20</strong>
              </div>
              <div className="card border-2 m-1 border-r-2">
                Monthly Expense<strong>10</strong>
              </div>
              <div className="card border-2 m-1 border-r-2">
                Total Expenses <br /> <strong>1</strong>
              </div>
            </div>


          </div>
          <div className="border-2 w-full flex flex-[3] p-4  flex-col">
            <h3 className="text-xl font-bold mb-2" >Balancing Report</h3>
            <label className="mb-2">
              From: <input type="date" />
            </label>
            <label className="mb-2" >
              To: <input type="date" />
            </label>
            <button className="mt-auto px-4 py-2 bg-blue-500 text-white rounded">Generate Report</button>
          </div>
        </div>
       
      </div>






      {/* <div className="bg-gray-100 p-5 min-h-screen flex justify-center items-start gap-8">
      <div className="bg-white p-6 rounded-lg shadow-md w-2/3">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-blue-100 p-4 rounded text-center">Users <br /> <strong>20</strong></div>
          <div className="bg-blue-100 p-4 rounded text-center">Reports <br /> <strong>20</strong></div>
          <div className="bg-blue-100 p-4 rounded text-center">Mileage <br /> <strong>10</strong></div>
          <div className="bg-blue-100 p-4 rounded text-center">Allowances <br /> <strong>1</strong></div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Balancing Report</h3>
          <div className="flex gap-4 mt-2">
            <label className="block">
              From: <input type="date" className="border p-2 rounded" />
            </label>
            <label className="block">
              To: <input type="date" className="border p-2 rounded" />
            </label>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Generate Report</button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md w-1/3 text-center">
        <h3 className="text-lg font-bold">Expense Report</h3>
        <button className="bg-blue-500 text-white w-full p-3 mt-3 rounded hover:bg-blue-600">New Expense</button>
        <button className="bg-blue-500 text-white w-full p-3 mt-3 rounded hover:bg-blue-600">New Allowance</button>
        <button className="bg-blue-500 text-white w-full p-3 mt-3 rounded hover:bg-blue-600">New Mileage</button>
        <button className="bg-blue-500 text-white w-full p-3 mt-3 rounded hover:bg-blue-600">Create Expense Report</button>
      </div>
    </div> */}
    </>
  );
};

export default Dashboard;








