import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import {
  Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody,
  Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Snackbar
} from '@mui/material';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ username: '', email: '' });
  const [editId, setEditId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const fetchUsers = async () => {
    const res = await api.get('/users');
    setUsers(res.data);
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleOpen = (user = null) => {
    if (user) {
      setForm({ username: user.username, email: user.email });
      setEditId(user.id);
    } else {
      setForm({ username: '', email: '' });
      setEditId(null);
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    try {
      if (editId) {
        await api.put(`/users/${editId}`, form);
        setSnackbar({ open: true, message: 'Utente aggiornato!' });
      } else {
        await api.post('/users', form);
        setSnackbar({ open: true, message: 'Utente creato!' });
      }
      handleClose();
      fetchUsers();
    } catch {
      setSnackbar({ open: true, message: 'Errore nella richiesta!' });
    }
  };

  const handleDelete = async (id) => {
    await api.delete(`/users/${id}`);
    fetchUsers();
    setSnackbar({ open: true, message: 'Utente eliminato.' });
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" mb={2}>Gestione Utenti</Typography>
      <Button variant="contained" onClick={() => handleOpen()}>Nuovo Utente</Button>
      <Table sx={{ mt: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Azioni</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(u => (
            <TableRow key={u.id}>
              <TableCell>{u.username}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>
                <Button size="small" onClick={() => handleOpen(u)}>Modifica</Button>
                <Button size="small" color="error" onClick={() => handleDelete(u.id)}>Elimina</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editId ? "Modifica Utente" : "Nuovo Utente"}</DialogTitle>
        <DialogContent>
          <TextField label="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} fullWidth margin="normal" />
          <TextField label="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} fullWidth margin="normal" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annulla</Button>
          <Button onClick={handleSubmit}>Salva</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ open: false, message: '' })} message={snackbar.message} />
    </Paper>
  );
}
