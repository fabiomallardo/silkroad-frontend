import React, { createContext, useState, useEffect } from 'react';
import api from '../api/axios'; // <-- assicurati che punti all'istanza Axios con baseURL /api

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setUser({ token });
  };

  // AGGIORNA QUI la funzione logout per chiamare il backend!
  const logout = async () => {
    try {
      await api.post('/users/logout'); // chiama il backend per logout "server-side"
    } catch (e) {
      // Non bloccare il logout lato client se il server fallisce (es: token già scaduto)
    }
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
