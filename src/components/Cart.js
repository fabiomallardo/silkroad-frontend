import React, { useEffect, useState } from 'react';
import api from '../api/axios'; // La tua istanza Axios già autenticata!
import { Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { CartContext } from '../context/CartContext';

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // 1. Carica carrello al mount
  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await api.get('/cart');
      setCart(res.data);
    } catch (err) {
      toast.error('Errore nel caricamento del carrello');
    }
    setLoading(false);
  };

  useEffect(() => { fetchCart(); }, []);

  // 2. Aggiorna quantità
  const handleQuantityChange = async (itemId, newQty) => {
    if (newQty < 1 || newQty > 100) return;
    setUpdating(true);
    try {
      await api.put(`/cart/items/${itemId}`, { quantity: newQty });
      fetchCart();
      toast.success('Quantità aggiornata');
    } catch {
      toast.error('Errore nell\'aggiornare la quantità');
    }
    setUpdating(false);
  };

  // 3. Rimuovi singolo prodotto
  const handleRemove = async (itemId) => {
    setUpdating(true);
    try {
      await api.delete(`/cart/items/${itemId}`);
      fetchCart();
      toast.info('Prodotto rimosso dal carrello');
    } catch {
      toast.error('Errore nella rimozione');
    }
    setUpdating(false);
  };

  // 4. Svuota tutto
  const handleClearCart = async () => {
    setUpdating(true);
    try {
      await api.delete(`/cart/clear`);
      fetchCart();
      toast.info('Carrello svuotato');
    } catch {
      toast.error('Errore nello svuotamento');
    }
    setUpdating(false);
  };

  // 5. Checkout: optional (crea ordine)
  const handleCheckout = async () => {
    try {
      await api.post('/orders', { note: 'Acquisto da carrello' });
      fetchCart();
      toast.success('Ordine creato!');
    } catch {
      toast.error('Errore nel checkout');
    }
  };

  // -- RENDER --
  if (loading) return <div className="text-center my-5"><Spinner animation="border" /></div>;

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container my-4 text-center">
        <h2>Il tuo carrello è vuoto!</h2>
        <Button variant="outline-primary" href="/products">Vai ai prodotti</Button>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h2>Carrello</h2>
      <table className="table align-middle mt-3">
        <thead>
          <tr>
            <th>Prodotto</th>
            <th>Quantità</th>
            <th>Prezzo unitario</th>
            <th>Totale</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.items.map(item => (
            <tr key={item.id}>
              <td>
                <img src={item.productImageUrl} alt="" width={48} style={{borderRadius: 4, marginRight: 8}} />
                <strong>{item.productName}</strong> <span className="text-muted small">({item.productSku})</span>
              </td>
              <td>
                <input
                  type="number"
                  min="1"
                  max={item.stockQuantity}
                  value={item.quantity}
                  onChange={e => handleQuantityChange(item.id, Number(e.target.value))}
                  className="form-control"
                  style={{width: 80, display: 'inline'}}
                  disabled={updating}
                />
              </td>
              <td>€ {item.unitPrice}</td>
              <td>€ {(item.unitPrice * item.quantity).toFixed(2)}</td>
              <td>
                <Button size="sm" variant="danger" onClick={() => handleRemove(item.id)} disabled={updating}>
                  Rimuovi
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>
          <Button variant="outline-danger" onClick={handleClearCart} disabled={updating}>
            Svuota Carrello
          </Button>
        </div>
        <div>
          <h4>Totale: € {cart.totalPrice}</h4>
        </div>
        <div>
          <Button variant="success" onClick={handleCheckout} disabled={updating || cart.items.length === 0}>
            Procedi all'ordine
          </Button>
        </div>
      </div>
    </div>
  );
}
