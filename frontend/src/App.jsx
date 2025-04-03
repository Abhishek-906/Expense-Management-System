import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import LoginIn from './components/Pages/Login';
import Home from './components/Pages/Home';
import SignIn from './components/Pages/SignIn';

function App() {

  return (
    <>
      <Routes>
      <Route path="/" element={<LoginIn/>} />   
    {/* <Route path="/signin" element={<SignIn />} />    */}
       <Route path="/register" element={<SignIn />} />   
      <Route path="/login" element={<LoginIn />} />   
      <Route path="/dashboard" element={<Home/>} />    
     </Routes> 
    </>
  )
}

export default App
