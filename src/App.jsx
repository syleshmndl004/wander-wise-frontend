
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import useAuth from './hooks/useAuth'
import jwtDecode from 'jwt-decode';

const App = () => {
  const { token, onLogout } = useAuth();


  const ProtectedRoutes = () => {
    try {
      const decodedToken = token ? jwtDecode(token) : null;
      const userId = decodedToken?.userId;


      if (decodedToken && decodedToken.exp) {
        const currentTime = Date.now() / 1000;
        if (currentTime > decodedToken?.exp) {
          onLogout();
          return <Navigate to="/login" />;
        }
      }


      if (!token || !userId) {
        onLogout();
        return <Navigate to="/login" />;
      }


      return <AppLayout />;
    } catch (err) {
      console.error(err);
      onLogout();
      return <Navigate to="/login" />;
    }
  };

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