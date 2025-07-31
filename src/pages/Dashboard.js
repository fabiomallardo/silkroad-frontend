// src/pages/Dashboard.js
import React, { useContext, useEffect, useState } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Chip, CircularProgress
} from '@mui/material';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Proteggi la dashboard: redirect se non sei ADMIN
  useEffect(() => {
    if (!user?.authorities?.includes('ROLE_ADMIN')) {
      navigate('/'); // oppure altra pagina, tipo /products
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user?.authorities?.includes('ROLE_ADMIN')) {
      api.get('/orders?page=0&size=20')
        .then(res => setOrders(res.data.content || []))
        .catch(() => setOrders([]))
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (!user?.authorities?.includes('ROLE_ADMIN')) {
    // Mostra un loader/blank, tanto reindirizza poco dopo
    return null;
  }

  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'primary.main' }}>
        Admin Dashboard <span role="img" aria-label="shield">🛡️</span>
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4, color: 'text.secondary' }}>
        Elenco ultimi ordini ricevuti <span style={{ color: "#aaa" }}>(visibile solo agli admin)</span>
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 200 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <Paper elevation={3} sx={{ borderRadius: 2 }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ background: "#f7f8fa" }}>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Data</TableCell>
                  <TableCell>Utente</TableCell>
                  <TableCell>Totale</TableCell>
                  <TableCell>Stato</TableCell>
                  <TableCell>Azioni</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ color: "#888" }}>
                      Nessun ordine trovato.
                    </TableCell>
                  </TableRow>
                )}
                {orders.map(ord => (
                  <TableRow key={ord.id} hover>
                    <TableCell>{ord.id}</TableCell>
                    <TableCell>
                      {ord.orderDate ? new Date(ord.orderDate).toLocaleString() : '-'}
                    </TableCell>
                    <TableCell>
                      {ord.userEmail || '-'}
                    </TableCell>
                    <TableCell>€ {ord.totalPrice?.toFixed(2) ?? '-'}</TableCell>
                    <TableCell>
                      <Chip
                        label={ord.orderStatusDescription || ord.orderStatus}
                        color={
                          ord.orderStatus === 'COMPLETED' ? 'success' :
                          ord.orderStatus === 'CANCELLED' ? 'error' :
                          ord.orderStatus === 'PENDING' ? 'warning' : 'default'
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <span
                        style={{ color: "#4b68d1", cursor: "pointer", fontWeight: 500 }}
                        onClick={() => navigate(`/orders/${ord.id}`)}
                      >
                        Dettagli
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  );
}
