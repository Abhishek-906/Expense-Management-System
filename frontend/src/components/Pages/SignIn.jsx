import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [monthlySalary, setMonthlySalary] = useState("");

  const handleSignIn = async (event) => {
    event.preventDefault();
    if (!username || !email || !password || !fullname || !role || monthlySalary === "") {
      alert("Please fill all fields.");
      return;
    }
  
    try {
      const response = await fetch(`${API_BASE_URL}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          fullname,
          role,
          monthlySalary: Number(monthlySalary)
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("You are registered successfully!");
        navigate("/");
      } else {
        alert(`Registration Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Create Account</h2>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Username</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter full name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>     

          <div>
            <label className="block text-gray-700 mb-1">Role</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Monthly Salary ($)</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter salary"
              value={monthlySalary}
              onChange={(e) => setMonthlySalary(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            Sign Up
          </button>

          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
























// import React, { useState } from "react";
// import "../styles/signIn.css";
// import { useNavigate, Link } from "react-router-dom";

// const API_BASE_URL =  "http://localhost:3000";

// const SignIn = () => {
//   const navigate = useNavigate();

//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [fullname, setFullname] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("user");
//   const [monthlySalary, setMonthlySalary] = useState("");

//   const handleSignIn = async () => {

//     event.preventDefault();
//     if (!username || !email || !password || !fullname || !role || monthlySalary === "") {
//       alert("Please fill all fields.");
//       return;
//     }
  
//     try {
      
//       const response = await fetch(`${API_BASE_URL}/user/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           username,
//           email,
//           password,
//           fullname,
//           role,
//           monthlySalary: Number(monthlySalary)
//         }),
//       });
  
//       const data = await response.json();
  
//       if (response.ok) {
//         console.log("Registration Successful", data);
//         alert("You are registered successfully!");
//         navigate("/");
//       } else {
//         console.error("Registration Failed:", data.message);
//         alert(`Login Error: ${data.message}`);
//       }
//     } catch (error) {
//       console.error("Error during registration:", error);
//     }
//   };
  
//   return (
//     <div className="login-container">
//       <form onSubmit={handleSignIn} className="form-container">
//         <h2>Sign In</h2>

//         <div className="input-group">
//           <label htmlFor="username">User Name</label>
//           <input type="text" id="username" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
//         </div>

//         <div className="input-group">
//           <label htmlFor="email">Email</label>
//           <input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         </div>

//         <div className="input-group">
//           <label htmlFor="fullname">Full Name</label>
//           <input type="text" id="fullname" placeholder="Enter your full name" value={fullname} onChange={(e) => setFullname(e.target.value)} />
//         </div>

//         <div className="input-group">
//           <label htmlFor="password">Password</label>
//           <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         </div>

//         <div className="input-group">
//           <label htmlFor="role">Role</label>
//           <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
//             <option value="admin">Admin</option>
//             <option value="user">User</option>
//           </select>
//         </div>

//         <div className="input-group">
//           <label htmlFor="salary">Monthly Salary</label>
//           <input type="number" id="salary" placeholder="Enter your salary" value={monthlySalary} onChange={(e) => setMonthlySalary(e.target.value)} />
//         </div>

//         <p id="navToLog" style={{ color: "red" }}>
//           Already registered? <Link to="/">Click here</Link>
//         </p>
//         <button className="sign-in-button">
//           Sign in
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SignIn;



