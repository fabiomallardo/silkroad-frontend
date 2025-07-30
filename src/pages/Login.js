import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { Button, TextField, Paper, Typography, Box } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom'; // AGGIUNGI Link QUI

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
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f5f7fb">
      <Paper elevation={3} sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" align="center" mb={2}>SILKROAD – Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} fullWidth margin="normal" />
          <TextField label="Password" value={password} onChange={e => setPassword(e.target.value)} type="password" fullWidth margin="normal" />
          {error && <Typography color="error" variant="body2">{error}</Typography>}
          <Button variant="contained" fullWidth sx={{ mt: 2 }} type="submit">Login</Button>
        </form>
        {/* BLOCCO AGGIUNTO: link registrazione */}
        <Typography align="center" sx={{ mt: 2 }}>
          <Link to="/register" style={{ textDecoration: 'none', color: '#5A56E9' }}>
            Non hai un account? Registrati
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
