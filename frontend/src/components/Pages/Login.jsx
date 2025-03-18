import React ,{useState} from "react";
import "../styles/signIn.css";
import SignIn from './SignIn'
import { useNavigate, Link } from "react-router-dom";

const API_BASE_URL =  "http://localhost:3000";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const onhandlelogin = async() => {
    try {
        const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Login Success", data);
        alert("Succesfully Login");
        navigate("/dashboard");
      } else {
        alert(`Error: ${data.message}`);
      }

    }catch(error){
      console.error("Error during Login:", error);
    }
  }

  return (
    <div className="login-container">
        <div className="form-container"> 
        <h2>Login In</h2>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value) } />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>


        <button className="login-in-button" onClick={onhandlelogin}>Login in</button>
        <p id="navToLog" style={{ color: "red" }}>
          New User? <Link to="/signin">Click here</Link>
        </p>
      </div>
    </div>
  ) 
}
      


export default Login;

