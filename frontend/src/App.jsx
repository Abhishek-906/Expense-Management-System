import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Login from './components/Pages/Login'
import SignIn from './components/Pages/SignIn'
import DashBoard from './components/Pages/DashBoard'

function App() {
  const [count, setCount] = useState(0)

  return (
    
    <Routes>
    <Route path="/" element={<Login />} />   
    <Route path="/signin" element={<SignIn />} />   
    <Route path="/login" element={<Login />} />   
    <Route path="/dashboard" element={<DashBoard/>} />   
    </Routes>
    
  )
}

export default App
