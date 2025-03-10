import React, { useState } from "react";
import "../styles/signIn.css";
import { useNavigate, Link } from "react-router-dom";

const API_BASE_URL =  "http://localhost:3000";

const SignIn = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [monthlySalary, setMonthlySalary] = useState("");

  const handleSignIn = async () => {
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
        console.log("Registration Successful", data);
        alert("You are registered successfully!");
        navigate("/");
      } else {
        console.error("Registration Failed:", data.message);
        alert(`Login Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };
  
  return (
    <div className="login-container">
      <div className="form-container">
        <h2>Sign In</h2>

        <div className="input-group">
          <label htmlFor="username">User Name</label>
          <input type="text" id="username" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="input-group">
          <label htmlFor="fullname">Full Name</label>
          <input type="text" id="fullname" placeholder="Enter your full name" value={fullname} onChange={(e) => setFullname(e.target.value)} />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="input-group">
          <label htmlFor="role">Role</label>
          <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="salary">Monthly Salary</label>
          <input type="number" id="salary" placeholder="Enter your salary" value={monthlySalary} onChange={(e) => setMonthlySalary(e.target.value)} />
        </div>

        <p id="navToLog" style={{ color: "red" }}>
          Already registered? <Link to="/">Click here</Link>
        </p>
        <button className="sign-in-button" onClick={handleSignIn}>
          Sign in
        </button>
      </div>
    </div>
  );
};

export default SignIn;
