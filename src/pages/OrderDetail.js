// src/pages/OrderDetail.js
import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { useParams } from 'react-router-dom';

export default function OrderDetail() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`/orders/my-orders/${orderId}`)
      .then(res => setOrder(res.data));
  }, [orderId]);

  if (!order) return <div>Caricamento...</div>;

  return (
    <div className="container py-4">
      <h2>Ordine #{order.id}</h2>
      <div>Stato: <b>{order.orderStatusDescription || order.orderStatus}</b></div>
      <div>Totale: <b>€ {order.totalPrice?.toFixed(2)}</b></div>
      {/* Dettaglio prodotti ordinati */}
      <table className="table mt-3">
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
              <td>€ {(it.quantity * it.unitPrice).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
