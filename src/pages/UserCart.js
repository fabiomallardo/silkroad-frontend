import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export default function UserCart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showOrderForm, setShowOrderForm] = useState(false);

  // Campi form ordine
  const [address, setAddress] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('CREDIT_CARD');
  const navigate = useNavigate();

  // Carica il carrello al mount
  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await api.get('/cart');
      setCart(res.data);
    } catch {
      setCart(null);
      toast.error('Errore nel caricamento del carrello');
    }
    setLoading(false);
  };

  // Modifica quantità di un prodotto nel carrello
  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      toast.warn("Minimo 1 pezzo");
      return;
    }
    try {
      await api.put(`/cart/items/${itemId}`, { quantity: newQuantity });
      toast.success('Quantità aggiornata');
      fetchCart();
    } catch (e) {
      toast.error(e.response?.data?.message || 'Errore aggiornamento quantità');
    }
  };

  // Rimuovi item dal carrello
  const removeItem = async (itemId) => {
    try {
      await api.delete(`/cart/items/${itemId}`);
      toast.info('Prodotto rimosso dal carrello');
      fetchCart();
    } catch {
      toast.error('Errore nella rimozione');
    }
  };

  // Svuota l'intero carrello
  const clearCart = async () => {
    try {
      await api.delete('/cart/clear');
      toast.info('Carrello svuotato');
      fetchCart();
    } catch {
      toast.error('Errore nello svuotamento');
    }
  };

  // Procedi all’ordine (con form di indirizzo)
  const handleCheckout = () => {
    setShowOrderForm(true);
  };

  // Conferma ordine - invia dati al backend (con campi richiesti)
  const confirmOrder = async (e) => {
    e.preventDefault();
    if (!address.trim()) {
      toast.warn("Inserisci un indirizzo di spedizione valido");
      return;
    }
    if (!paymentMethod) {
      toast.warn("Seleziona un metodo di pagamento");
      return;
    }
    try {
      const dto = {
        shippingAddress: address,
        billingAddress: billingAddress,
        notes,
        paymentMethod,
      };
      const res = await api.post('/orders', dto);
      toast.success('Ordine creato! 🔥');
      setShowOrderForm(false);
      // Svuota i campi form
      setAddress('');
      setBillingAddress('');
      setNotes('');
      setPaymentMethod('CREDIT_CARD');
      fetchCart();
      navigate(`/orders/${res.data.id}`);
    } catch (e) {
      toast.error(
        e.response?.data?.message ||
        (e.response?.data?.errors && Object.values(e.response.data.errors).join(', ')) ||
        'Errore durante la creazione dell’ordine!'
      );
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Caricamento...</div>;
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="container mt-5">
        <ToastContainer />
        <div className="alert alert-info text-center">
          Il carrello è vuoto!
        </div>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <ToastContainer />
      <h2 className="mb-4">Il tuo Carrello</h2>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Prodotto</th>
              <th>Prezzo</th>
              <th>Quantità</th>
              <th>Totale</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.items.map(item => (
              <tr key={item.id}>
                <td className="d-flex align-items-center gap-2">
                  {item.productImageUrl &&
                    <img src={item.productImageUrl} alt={item.productName} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 4 }} />
                  }
                  <span>{item.productName}</span>
                </td>
                <td>€ {item.unitPrice}</td>
                <td style={{ width: 120 }}>
                  <div className="input-group input-group-sm">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >-</button>
                    <input
                      type="number"
                      className="form-control text-center"
                      style={{ maxWidth: 40 }}
                      value={item.quantity}
                      min={1}
                      readOnly
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >+</button>
                  </div>
                </td>
                <td>€ {(item.unitPrice * item.quantity).toFixed(2)}</td>
                <td>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => removeItem(item.id)}>
                    <i className="bi bi-trash"></i> Rimuovi
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={3} className="text-end fw-bold">Totale:</td>
              <td className="fw-bold">€ {cart.totalPrice?.toFixed(2)}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-between">
        <button className="btn btn-outline-danger" onClick={clearCart}>
          Svuota Carrello
        </button>
        <button className="btn btn-success" onClick={handleCheckout}>
          Procedi all'ordine
        </button>
      </div>

      {/* MODALE ORDINE */}
      {showOrderForm && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,.25)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <form className="modal-content" onSubmit={confirmOrder}>
              <div className="modal-header">
                <h5 className="modal-title">Conferma Ordine</h5>
                <button type="button" className="btn-close" onClick={() => setShowOrderForm(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-2">
                  <label className="form-label">Indirizzo di spedizione*</label>
                  <input type="text" className="form-control"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Indirizzo di fatturazione</label>
                  <input type="text" className="form-control"
                    value={billingAddress}
                    onChange={e => setBillingAddress(e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Metodo di pagamento*</label>
                  <select className="form-select"
                    value={paymentMethod}
                    onChange={e => setPaymentMethod(e.target.value)}
                    required
                  >
                    <option value="CREDIT_CARD">Carta di Credito</option>
                    <option value="DEBIT_CARD">Carta di Debito</option>
                    <option value="PAYPAL">PayPal</option>
                    <option value="BANK_TRANSFER">Bonifico Bancario</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="form-label">Note</label>
                  <textarea className="form-control"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    rows={2}
                  />
                </div>
                <div className="alert alert-warning small">
                  Controlla che i dati siano corretti prima di procedere!
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowOrderForm(false)}>Annulla</button>
                <button type="submit" className="btn btn-success">Conferma Ordine</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
