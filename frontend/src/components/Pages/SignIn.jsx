import React from "react";
import "../styles/signIn.css"; 
import { useNavigate  , Link} from "react-router-dom";
import LoginIn from "./Login";



const SignIn = () => {

  
  const navigate = useNavigate();

const onhandlesignIn=()=>{
  navigate('/login');
  alert("U are Registered");

}

  return (
    <div className="login-container">
      <div className="form-container">
        <h2>Sign In</h2>
        <div className="input-group">
          <label htmlFor="username">User Name</label>
          <input type="text" id="username" placeholder="Enter your username" />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" />
        </div>

        <div className="input-group">
          <label htmlFor="fullname">Full Name</label>
          <input type="text" id="fullname" placeholder="Enter your full name" />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" />
        </div>

        <div className="input-group">
          <label htmlFor="role">Role</label>
          <select id="role">
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="salary">Monthly Salary</label>
          <input type="number" id="salary" placeholder="Enter your salary" />
        </div>
        <p id="navToLog" style={{ color: "red" }}>
            Already register? <Link to="/">Click here</Link>
        </p>
        <button className="sign-in-button" onClick={onhandlesignIn}>Sign in</button>
      </div>
    </div>
  )
}


export default SignIn;

