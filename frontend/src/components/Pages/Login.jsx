
// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import "../styles/signIn.css";

// const API_BASE_URL = "http://localhost:3000";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate(); 

//   const onHandleLogin = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch(`${API_BASE_URL}/user/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();
      
//       if (!response.ok) {
//         throw new Error(data.message || "Login failed");
//       }

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("userData", JSON.stringify({
//         username: data.user.name,
//         email: data.user.email,
//         role: data.user.role
//       }));

//       navigate("/dashboard");
//     } catch (error) {
//       setError(error.message || "An error occurred during login");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Left Info Panel - Your Original Design */}
//       <div className="hidden md:flex md:w-1/2 bg-blue-600 text-white p-12 flex-col justify-between">
//         <div>
//           <h1 className="text-4xl font-bold mb-6">Welcome Back</h1>
//           <p className="text-xl mb-8">
//             Track your expenses and manage your budget effectively with our platform.
//           </p>
//         </div>
        
//         <div className="space-y-4">
//           <div className="flex items-center">
//             <div className="bg-blue-500 rounded-full p-2 mr-4">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//               </svg>
//             </div>
//             <span>Real-time expense tracking</span>
//           </div>
//           <div className="flex items-center">
//             <div className="bg-blue-500 rounded-full p-2 mr-4">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//               </svg>
//             </div>
//             <span>Custom budget categories</span>
//           </div>
//           <div className="flex items-center">
//             <div className="bg-blue-500 rounded-full p-2 mr-4">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//               </svg>
//             </div>
//             <span>Detailed financial reports</span>
//           </div>
//         </div>
//       </div>

//       {/* Right Login Form */}
//       <div className="w-full md:w-1/2 flex items-center justify-center p-8">
//         <div className="w-full max-w-md">
//           <div className="text-center mb-8 md:hidden">
//             <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
//             <p className="text-gray-600 mt-2">Sign in to your account</p>
//           </div>

//           {error && (
//             <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
//               {error}
//             </div>
//           )}

//           <form onSubmit={onHandleLogin} className="space-y-6">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                 placeholder="your@email.com"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                 placeholder="••••••••"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
//                 loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
//               }`}
//             >
//               {loading ? "Signing in..." : "Sign In"}
//             </button>
//           </form>

//           <div className="mt-6 text-center">
//             <p className="text-gray-600">
//               Don't have an account?{" "}
//               <Link to="/register" className="text-blue-600 font-medium hover:underline">
//                 Sign up
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


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

  const onHandleLogin = async (event) => {
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

      // Store token and user data exactly matching your backend response
      localStorage.setItem("token", data.token);
      localStorage.setItem("userData", JSON.stringify({
        username: data.user.name,  // Using name as username
        email: data.user.email,
        role: data.user.role      // Including role from response
      }));

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

          <form onSubmit={onHandleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
                loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </div>
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










