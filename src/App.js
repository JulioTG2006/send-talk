import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";


function App() {
  return (
<Routes>
  <Route path="*" element={<Navigate to="/login" replace />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
 <Route path="/home" element={
  <PrivateRoute>
    <Home />
  </PrivateRoute>
} />
  <Route path="*" element={<Navigate to="/login" replace />} />
</Routes>
  
  );
}

export default App;
