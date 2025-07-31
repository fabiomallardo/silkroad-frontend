import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { Button, TextField, Paper, Typography, Box } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/users/login', { email, password });
      login(res.data.token);
      navigate('/');
    } catch (err) {
      setError('Login fallito. Verifica username/password.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(120deg, #e8eaf6 30%, #ffe0f5 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 4,
          width: 370,
          borderRadius: 5,
          boxShadow: "0 8px 32px rgba(80,80,180,0.14)",
          background: "rgba(255,255,255,0.94)",
          backdropFilter: "blur(2px)"
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
          <img
            src="/logo.png"
            alt="SILKROAD"
            style={{
              width: 60,
              height: 60,
              objectFit: "contain",
              marginBottom: 6,
              filter: "drop-shadow(0 2px 6px #cec1fc)"
            }}
            onError={e => { e.target.src = '/logo-placeholder.png'; }}
          />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: "#5A56E9",
              letterSpacing: ".06em",
              fontFamily: 'Montserrat, sans-serif',
              textShadow: "0 2px 10px #ede9ff"
            }}
            align="center"
          >
            SILKROAD – Login
          </Typography>
        </Box>
        <form onSubmit={handleSubmit} autoComplete="off">
          <TextField
            label="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            autoFocus
            sx={{
              bgcolor: "#f5f7fa",
              borderRadius: 1,
              '& .MuiInputBase-input': { fontWeight: 500 }
            }}
          />
          <TextField
            label="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            fullWidth
            margin="normal"
            sx={{
              bgcolor: "#f5f7fa",
              borderRadius: 1,
              '& .MuiInputBase-input': { fontWeight: 500 }
            }}
          />
          {error && <Typography color="error" variant="body2" mt={1} mb={0}>{error}</Typography>}
          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              py: 1.3,
              borderRadius: 2,
              fontWeight: 700,
              letterSpacing: ".03em",
              fontSize: "1.07rem",
              background: "linear-gradient(90deg, #5A56E9, #c283fd 70%)"
            }}
            type="submit"
          >
            Login
          </Button>
        </form>
        <Typography align="center" sx={{ mt: 3 }}>
          <Link
            to="/register"
            style={{
              textDecoration: 'none',
              color: "#b94cf2",
              fontWeight: 700,
              letterSpacing: ".01em"
            }}
            onMouseOver={e => (e.target.style.color = "#5A56E9")}
            onMouseOut={e => (e.target.style.color = "#b94cf2")}
          >
            Non hai un account? Registrati
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
