// src/pages/Orders.js

import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api.get('/orders/my-orders')
      .then(res => {
        if (mounted) setOrders(res.data.content || []);
      })
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
    return () => { mounted = false; };
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4">I tuoi Ordini</h2>
      {loading && <div>Caricamento...</div>}
      {!loading && orders.length === 0 && (
        <div className="alert alert-info">Nessun ordine trovato.</div>
      )}
      {!loading && orders.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Data</th>
                <th>Totale</th>
                <th>Stato</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map(ord => (
                <tr key={ord.id}>
                  <td>{ord.id}</td>
                  <td>{ord.orderDate ? new Date(ord.orderDate).toLocaleString() : '-'}</td>
                  <td>€ {ord.totalPrice?.toFixed(2) ?? '-'}</td>
                  <td>{ord.orderStatusDescription || ord.orderStatus}</td>
                  <td>
                    <Link
                      to={`/orders/${ord.id}`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      Dettagli
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
