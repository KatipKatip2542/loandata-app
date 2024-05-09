
import './App.css'
import { Navigate, Route, Routes } from "react-router-dom";

import CheckRouter from './Routers/CheckRouter';
import Login from './auth/Login'

function App() {

  let Token = localStorage.getItem("Token");
 
  return (
    <div>
    {Token ? (
      <CheckRouter />
    ) : (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    )}
  </div>
  )
}

export default App
