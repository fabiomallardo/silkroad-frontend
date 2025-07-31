import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Products from './pages/Products';
import { AuthContext } from './context/AuthContext';

export default function AppRoutes() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {/* Home pubblica */}
      <Route path="/" element={!user ? <Home /> : <Navigate to="/dashboard" replace />} />

      {/* Login e Register solo se non autenticato */}
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" replace />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" replace />} />

      {/* Rotte protette */}
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" replace />} />
      <Route path="/users" element={user ? <Users /> : <Navigate to="/login" replace />} />
      <Route path="/products" element={user ? <Products /> : <Navigate to="/login" replace />} />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
