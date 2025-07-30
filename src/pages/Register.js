import React, { useState } from 'react';
import api from '../api/axios';
import { Button, TextField, Paper, Typography, Box, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f5f7fb">
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" align="center" mb={2}>SILKROAD – Registrazione</Typography>
        <form onSubmit={handleSubmit} autoComplete="off">
          <TextField
            label="Nome"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Cognome"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
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
          />
          <TextField
            label="Indirizzo"
            name="address"
            value={form.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
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
          />
          {error && <Typography color="error" variant="body2">{error}</Typography>}
          <Button variant="contained" fullWidth sx={{ mt: 2 }} type="submit">
            Registrati
          </Button>
        </form>
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
