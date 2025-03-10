import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {  Router, Routes, Route } from 'react-router-dom';
import LoginIn from './components/Pages/Login';
import Dashboard from './components/Pages/DashBoard';
import SignIn from './components/Pages/SignIn';

function App() {

  return (
    <>
      <Routes>
      <Route path="/" element={<LoginIn/>} />   
       <Route path="/signin" element={<SignIn />} />   
      <Route path="/login" element={<LoginIn />} />   
      <Route path="/dashboard" element={<Dashboard/>} />    
     </Routes> 
   {/* <h1 className='text-red-500'>hello</h1> */}
    </>
  )
}

export default App
