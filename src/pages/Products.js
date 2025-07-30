import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import {
  Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody,
  Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Snackbar, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stockQuantity: '',
    sku: '',
    imageUrl: '',
    categoryId: ''
  });
  const [editId, setEditId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  // Fetch prodotti
  const fetchProducts = async () => {
    const res = await api.get('/products');
    setProducts(res.data.content || []);
  };

  // Fetch categorie
  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data || []);
    } catch {
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleOpen = (product = null) => {
    if (product) {
      setForm({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        stockQuantity: product.stockQuantity || '',
        sku: product.sku || '',
        imageUrl: product.imageUrl || '',
        categoryId: product.categoryId || ''
      });
      setEditId(product.id);
    } else {
      setForm({
        name: '',
        description: '',
        price: '',
        stockQuantity: '',
        sku: '',
        imageUrl: '',
        categoryId: ''
      });
      setEditId(null);
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    // Validazione minima
    if (
      !form.name.trim() ||
      form.name.length < 3 ||
      !form.price ||
      parseFloat(form.price) < 0.01 ||
      !form.stockQuantity ||
      parseInt(form.stockQuantity, 10) < 0 ||
      !form.sku.trim()
    ) {
      setSnackbar({ open: true, message: 'Compila tutti i campi obbligatori con valori validi!' });
      return;
    }
    try {
      const body = {
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        stockQuantity: parseInt(form.stockQuantity, 10),
        sku: form.sku.toUpperCase(),
        imageUrl: form.imageUrl,
        categoryId: form.categoryId ? parseInt(form.categoryId, 10) : null
      };
      if (editId) {
        await api.put(`/products/${editId}`, body);
        setSnackbar({ open: true, message: 'Prodotto aggiornato!' });
      } else {
        await api.post('/products', body);
        setSnackbar({ open: true, message: 'Prodotto creato!' });
      }
      handleClose();
      fetchProducts();
    } catch (e) {
      setSnackbar({ open: true, message: 'Errore nella richiesta: ' + (e.response?.data?.message || '') });
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
      setSnackbar({ open: true, message: 'Prodotto eliminato.' });
    } catch {
      setSnackbar({ open: true, message: 'Errore nell\'eliminazione!' });
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" mb={2}>Gestione Prodotti</Typography>
      <Button variant="contained" onClick={() => handleOpen()}>Nuovo Prodotto</Button>
      <Table sx={{ mt: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Prezzo</TableCell>
            <TableCell>Quantità</TableCell>
            <TableCell>SKU</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>Attivo</TableCell>
            <TableCell>Immagine</TableCell>
            <TableCell>Azioni</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(products || []).map(p => (
            <TableRow key={p.id}>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.price}</TableCell>
              <TableCell>{p.stockQuantity}</TableCell>
              <TableCell>{p.sku}</TableCell>
              <TableCell>{p.categoryName || p.categoryId}</TableCell>
              <TableCell>{p.isActive ? '✔️' : '❌'}</TableCell>
              <TableCell>
                {p.imageUrl && (
                  <img src={p.imageUrl} alt={p.name} style={{ width: 50, maxHeight: 50, objectFit: 'cover', borderRadius: 5 }} />
                )}
              </TableCell>
              <TableCell>
                <Button size="small" onClick={() => handleOpen(p)}>Modifica</Button>
                <Button size="small" color="error" onClick={() => handleDelete(p.id)}>Elimina</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Dialog aggiunta/modifica prodotto */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editId ? "Modifica Prodotto" : "Nuovo Prodotto"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Descrizione"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            fullWidth
            margin="normal"
            multiline
            rows={2}
          />
          <TextField
            label="Prezzo"
            type="number"
            value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })}
            fullWidth
            margin="normal"
            required
            inputProps={{ step: "0.01", min: 0.01, max: 999999.99 }}
          />
          <TextField
            label="Quantità in stock"
            type="number"
            value={form.stockQuantity}
            onChange={e => setForm({ ...form, stockQuantity: e.target.value })}
            fullWidth
            margin="normal"
            required
            inputProps={{ min: 0 }}
          />
          <TextField
            label="SKU"
            value={form.sku}
            onChange={e => setForm({ ...form, sku: e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, "") })}
            fullWidth
            margin="normal"
            required
            inputProps={{ maxLength: 50 }}
          />
          <TextField
            label="Immagine URL"
            value={form.imageUrl}
            onChange={e => setForm({ ...form, imageUrl: e.target.value })}
            fullWidth
            margin="normal"
          />
          {/* Select categoria */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="categoria-label">Categoria</InputLabel>
            <Select
              labelId="categoria-label"
              value={form.categoryId}
              label="Categoria"
              onChange={e => setForm({ ...form, categoryId: e.target.value })}
            >
              <MenuItem value="">
                <em>Nessuna</em>
              </MenuItem>
              {categories.map(c =>
                <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
              )}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annulla</Button>
          <Button onClick={handleSubmit}>Salva</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbar.open} autoHideDuration={3500} onClose={() => setSnackbar({ open: false, message: '' })} message={snackbar.message} />
    </Paper>
  );
}
