import React, { useContext } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import AuthProvider, { AuthContext } from './context/AuthContext';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function MainLayout() {
  const { user } = useContext(AuthContext);

  // Sidebar e Navbar SOLO se autenticato
  if (!user) {
    return (
      <Box>
        <AppRoutes />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <AppRoutes />
      </Box>
    </Box>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
        <ToastContainer position="top-center" autoClose={2800} />
          <MainLayout />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
