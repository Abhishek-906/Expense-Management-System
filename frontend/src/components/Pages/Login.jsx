import React from "react";
import "../styles/signIn.css"; 
import SignIn from './SignIn'
import { useNavigate, Link } from "react-router-dom";



const LoginIn = () => {

  
  const navigate = useNavigate();

const onhandlesignIn=()=>{
  navigate('/dashboard');
}

  return (
    <div className="login-container">
      <div className="form-container">
        <h2>Login In</h2>
    
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" />
        </div>
      

        <button className="login-in-button" onClick={onhandlesignIn}>Login in</button>
        <p id="navToLog" style={{ color: "red" }}>
            New User? <Link to="/signin">Click here</Link>
        </p>
      </div>
    </div>
  )
}


export default LoginIn;

