// src/routes.js (o src/AppRoutes.js)
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Products from './pages/Products';
import UserCart from './pages/UserCart';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import { AuthContext } from './context/AuthContext';

export default function AppRoutes() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {/* Home pubblica (landing) */}
      <Route path="/" element={!user ? <Home /> : <Navigate to="/dashboard" replace />} />

      {/* Login e Register solo se NON autenticato */}
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" replace />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" replace />} />

      {/* Rotte protette (solo per utenti autenticati) */}
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" replace />} />
      <Route path="/users" element={user ? <Users /> : <Navigate to="/login" replace />} />
      <Route path="/products" element={user ? <Products /> : <Navigate to="/login" replace />} />

      {/* Carrello e Ordini */}
      <Route path="/cart" element={user ? <UserCart /> : <Navigate to="/login" replace />} />
      {/* Storico ordini utente */}
      <Route path="/orders/my-orders" element={user ? <Orders /> : <Navigate to="/login" replace />} />
      {/* Dettaglio ordine */}
      <Route path="/orders/:orderId" element={user ? <OrderDetail /> : <Navigate to="/login" replace />} />

      {/* Rotte non trovate */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
