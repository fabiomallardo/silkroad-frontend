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

  // Badge colorato in base allo stato ordine
  const statusBadge = (status, label) => {
    let color = "secondary";
    if (!status) return <span className="badge bg-secondary">{label || status}</span>;
    switch (status) {
      case "PENDING": color = "warning"; break;
      case "CONFIRMED": color = "primary"; break;
      case "SHIPPED": color = "info"; break;
      case "DELIVERED": color = "success"; break;
      case "CANCELLED": color = "danger"; break;
      default: color = "secondary"; break;
    }
    return <span className={`badge bg-${color}`} style={{ fontSize: 13 }}>{label || status}</span>;
  };

  return (
    <div className="container py-4" style={{ maxWidth: 1000 }}>
      <h1 className="mb-0 fw-bold" style={{ letterSpacing: '.01em', fontSize: 32 }}>I tuoi Ordini</h1>
      <div className="text-muted mb-4" style={{ fontSize: 17 }}>Visualizza lo storico degli ordini effettuati, il loro stato e i dettagli.</div>

      {loading && <div className="mt-5">Caricamento...</div>}

      {!loading && orders.length === 0 && (
        <div className="alert alert-info mt-4 text-center">
          Nessun ordine trovato.<br />Quando acquisti, gli ordini saranno mostrati qui.
        </div>
      )}

      {!loading && orders.length > 0 && (
        <div className="table-responsive">
          <table
            className="table align-middle"
            style={{
              boxShadow: "0 4px 16px 0 rgba(60,60,130,.06)",
              borderRadius: 14,
              overflow: 'hidden'
            }}>
            <thead style={{ background: '#f7f8fa', position: 'sticky', top: 0, zIndex: 1 }}>
              <tr>
                <th className="fw-bold" style={{ minWidth: 80 }}>ID</th>
                <th className="fw-bold" style={{ minWidth: 150 }}>Data</th>
                <th className="fw-bold" style={{ minWidth: 120 }}>Totale</th>
                <th className="fw-bold" style={{ minWidth: 120 }}>Stato</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map(ord => (
                <tr
                  key={ord.id}
                  style={{
                    transition: "background .13s",
                    cursor: "pointer"
                  }}
                  className="order-row"
                  onMouseEnter={e => e.currentTarget.style.background = "#f2f6ff"}
                  onMouseLeave={e => e.currentTarget.style.background = ""}
                >
                  <td className="fw-semibold" style={{ fontSize: 15, color: "#143364" }}>{ord.id}</td>
                  <td>{ord.orderDate ? new Date(ord.orderDate).toLocaleString() : '-'}</td>
                  <td className="fw-bold" style={{ fontSize: 16, color: "#1976d2" }}>
                    € {ord.totalPrice?.toFixed(2) ?? '-'}
                  </td>
                  <td>{statusBadge(ord.orderStatus, ord.orderStatusDescription)}</td>
                  <td>
                    <Link
                      to={`/orders/${ord.id}`}
                      className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2"
                      title="Visualizza dettagli ordine"
                    >
                      <i className="bi bi-eye"></i> <span>Dettagli</span>
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
