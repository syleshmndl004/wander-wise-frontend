
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => {
  return (
  
    <BrowserRouter> 
    <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/about" element={<About />} /> 
    <Route path="/contact" element ={<Contact />} />
    <Route path="/Login" element={<Login/>} />
    <Route path="/Register" element={<Register/>} />

    </Routes>

    </BrowserRouter>
  )
}


export default App