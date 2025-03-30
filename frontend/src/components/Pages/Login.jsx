import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/signIn.css";

const API_BASE_URL = "http://localhost:3000";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onhandlelogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={onhandlelogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/signin" className="text-blue-600 font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          By continuing, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
};

export default Login;











// import React, { useState } from "react";
// import "../styles/signIn.css";
// import SignIn from './SignIn';
// import { useNavigate, Link } from "react-router-dom";

// const API_BASE_URL = "http://localhost:3000";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   const onhandlelogin = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await fetch(`${API_BASE_URL}/user/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email,
//           password,
//         }),
//       });
//       const data = await response.json(); 
//       const token = data.token; 
//       if (token) {
//         localStorage.setItem("token", token);
//         console.log("Login successful");
        
//         navigate("/dashboard"); 
//       } else {
//         console.error("No token received, login failed");
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//     }
//   };

//   return (
//     <div className="login-container">
//       <form onSubmit={onhandlelogin} className="form-container">
//         <h2>Login In</h2>

//         <div className="input-group">
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             placeholder="abc@gmail.com"
//             value={email}
//             autoComplete="username"
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>

//         <div className="input-group">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             placeholder="Enter your password"
//             value={password}
//             autoComplete="current-password"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>

//         <button type="submit" className="login-in-button">
//           Login in
//         </button>
//         <p id="navToLog" style={{ color: "red" }}>
//           New User? <Link to="/signin">Click here</Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;










