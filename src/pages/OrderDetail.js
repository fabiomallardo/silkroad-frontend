// src/pages/OrderDetail.js
import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { useParams, Link } from 'react-router-dom';

export default function OrderDetail() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`/orders/my-orders/${orderId}`)
      .then(res => setOrder(res.data));
  }, [orderId]);

  // Badge colorato per stato ordine
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

  if (!order) return <div className="text-center my-5">Caricamento...</div>;

  return (
    <div className="container py-4" style={{ maxWidth: 900 }}>
      <div className="mb-4 d-flex align-items-center gap-2">
        <Link to="/orders/my-orders" className="btn btn-light btn-sm" title="Torna agli ordini">
          <i className="bi bi-arrow-left"></i>
        </Link>
        <h2 className="mb-0 fw-bold" style={{ color: "#1976d2", letterSpacing: ".01em" }}>
          <i className="bi bi-receipt-cutoff me-2"></i> Ordine #{order.id}
        </h2>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="border rounded p-3 h-100 bg-light-subtle">
            <div className="mb-1"><b>Stato:</b> {statusBadge(order.orderStatus, order.orderStatusDescription)}</div>
            <div className="mb-1"><b>Effettuato il:</b> {order.orderDate ? new Date(order.orderDate).toLocaleString() : '-'}</div>
            <div className="mb-1"><b>Indirizzo di spedizione:</b> <br /><span style={{ fontSize: 14 }}>{order.shippingAddress}</span></div>
            {order.notes && (
              <div className="mb-1"><b>Note:</b> <br /><span style={{ fontSize: 14 }}>{order.notes}</span></div>
            )}
            <div className="mt-2">
              <span className="badge bg-dark fs-6">
                Totale: € {order.totalPrice?.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-8">
          <div className="border rounded p-3 h-100">
            <h5 className="fw-bold mb-3"><i className="bi bi-box-seam me-1"></i>Prodotti Ordinati</h5>
            <div className="table-responsive">
              <table className="table align-middle table-hover mb-0">
                <thead>
                  <tr>
                    <th>Prodotto</th>
                    <th>Quantità</th>
                    <th>Prezzo unitario</th>
                    <th>Subtotale</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map(it => (
                    <tr key={it.id}>
                      <td>{it.productName}</td>
                      <td>{it.quantity}</td>
                      <td>€ {it.unitPrice?.toFixed(2)}</td>
                      <td className="fw-bold">€ {(it.quantity * it.unitPrice).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <Link to="/orders/my-orders" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left"></i> Torna alla lista ordini
        </Link>
      </div>
    </div>
  );
}
