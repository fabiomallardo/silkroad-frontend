import React, { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Recupera user info se c'è un token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Recupera info utente dal backend (API: /users/profile)
      api.get('/users/profile')
        .then(res => setUser({ ...res.data, token })) // puoi salvare tutto il profilo utente
        .catch(() => {
          setUser(null);
          localStorage.removeItem('token');
        });
    }
  }, []);

  // LOGIN: salva token e carica profilo utente
  const login = async (token) => {
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      const res = await api.get('/users/profile');
      setUser({ ...res.data, token });
    } catch {
      setUser({ token });
    }
  };

  // LOGOUT: chiama logout backend e pulisce tutto
  const logout = async () => {
    try {
      await api.post('/users/logout');
    } catch (e) {
      // ok: anche se fallisce server-side, esegui comunque logout client
    }
    localStorage.removeItem('token');
    setUser(null);
    delete api.defaults.headers.common['Authorization'];

    // Se usi anche CartContext, qui puoi azzerare il carrello globale:
    // if (window.setCartCount) window.setCartCount(0);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
