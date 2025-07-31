import React, { useState } from 'react';
import api from '../api/axios';
import {
  Button, TextField, Paper, Typography, Box, Snackbar
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    telephone: ''
  });
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/users/register', form);
      setSnackbar({ open: true, message: 'Registrazione completata! Ora puoi fare login.' });
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError('Errore nella registrazione. Controlla i dati inseriti o se l\'utente esiste già.');
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
          width: 400,
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
            SILKROAD – Registrazione
          </Typography>
        </Box>
        <form onSubmit={handleSubmit} autoComplete="off">
          <TextField
            label="Nome"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            sx={{
              bgcolor: "#f5f7fa",
              borderRadius: 1,
              '& .MuiInputBase-input': { fontWeight: 500 }
            }}
          />
          <TextField
            label="Cognome"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            sx={{
              bgcolor: "#f5f7fa",
              borderRadius: 1,
              '& .MuiInputBase-input': { fontWeight: 500 }
            }}
          />
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            fullWidth
            margin="normal"
            required
            sx={{
              bgcolor: "#f5f7fa",
              borderRadius: 1,
              '& .MuiInputBase-input': { fontWeight: 500 }
            }}
          />
          <TextField
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            fullWidth
            margin="normal"
            required
            helperText="Almeno 8 caratteri. Usa maiuscole, minuscole, numeri e simboli."
            sx={{
              bgcolor: "#f5f7fa",
              borderRadius: 1,
              '& .MuiInputBase-input': { fontWeight: 500 }
            }}
          />
          <TextField
            label="Indirizzo"
            name="address"
            value={form.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            sx={{
              bgcolor: "#f5f7fa",
              borderRadius: 1,
              '& .MuiInputBase-input': { fontWeight: 500 }
            }}
          />
          <TextField
            label="Telefono"
            name="telephone"
            value={form.telephone}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            helperText="Solo numeri, anche con +. Es: +393331234567"
            sx={{
              bgcolor: "#f5f7fa",
              borderRadius: 1,
              '& .MuiInputBase-input': { fontWeight: 500 }
            }}
          />
          {error && <Typography color="error" variant="body2" mt={1}>{error}</Typography>}
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
            Registrati
          </Button>
        </form>
        <Typography align="center" sx={{ mt: 3 }}>
          <Link
            to="/login"
            style={{
              textDecoration: 'none',
              color: "#b94cf2",
              fontWeight: 700,
              letterSpacing: ".01em"
            }}
            onMouseOver={e => (e.target.style.color = "#5A56E9")}
            onMouseOut={e => (e.target.style.color = "#b94cf2")}
          >
            Hai già un account? Login
          </Link>
        </Typography>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={2000}
          onClose={() => setSnackbar({ open: false, message: '' })}
          message={snackbar.message}
        />
      </Paper>
    </Box>
  );
}
