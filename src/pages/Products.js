import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
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

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const res = await api.get('/products');
    setProducts(res.data.content || []);
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data || []);
    } catch {
      setCategories([]);
    }
  };

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
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.name.trim() ||
      form.name.length < 3 ||
      !form.price ||
      parseFloat(form.price) < 0.01 ||
      !form.stockQuantity ||
      parseInt(form.stockQuantity, 10) < 0 ||
      !form.sku.trim()
    ) {
      toast.warning('Compila tutti i campi obbligatori con valori validi!');
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
        toast.success('Prodotto aggiornato!');
      } else {
        await api.post('/products', body);
        toast.success('Prodotto creato!');
      }
      handleClose();
      fetchProducts();
    } catch (e) {
      toast.error('Errore nella richiesta: ' + (e.response?.data?.message || ''));
    }
  };

  // --- AGGIUNGI AL CARRELLO ---
  const addToCart = async (productId) => {
    try {
      await api.post('/cart/items', { productId, quantity: 1 });
      toast.success("Aggiunto al carrello!");
    } catch {
      toast.error("Errore nell'aggiunta al carrello");
    }
  };

  // --- TOASTIFY PER DELETE CONFERMA ---
  const confirmToast = (id) => {
    const toastId = toast.info(
      <div>
        <div className="mb-2"><b>Vuoi davvero eliminare il prodotto?</b></div>
        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-sm btn-danger" onClick={async () => {
            await handleDelete(id);
            toast.dismiss(toastId);
          }}>Elimina</button>
          <button className="btn btn-sm btn-secondary" onClick={() => toast.dismiss(toastId)}>Annulla</button>
        </div>
      </div>,
      {
        autoClose: false, 
        closeOnClick: false, 
        closeButton: false, 
        draggable: false,
        position: "top-right"
      }
    );
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
      toast.success('Prodotto eliminato!');
    } catch {
      toast.error('Errore nell\'eliminazione!');
    }
  };

  return (
    <div className="container my-4">
      <ToastContainer position="top-right" autoClose={2800} />
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="mb-0">Gestione Prodotti</h2>
        <button className="btn btn-primary" onClick={() => handleOpen()}>
          Nuovo Prodotto
        </button>
      </div>

      <div className="row g-4">
        {products.length === 0 && (
          <div className="col-12">
            <div className="alert alert-info">Nessun prodotto trovato.</div>
          </div>
        )}
        {products.map((p) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={p.id}>
            <div className="card h-100 shadow border-0">
              {p.imageUrl && (
                <img 
                  src={p.imageUrl} 
                  alt={p.name} 
                  className="card-img-top" 
                  style={{ maxHeight: 180, objectFit: 'cover' }} 
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title mb-1">{p.name}</h5>
                <div className="mb-2 text-secondary small">
                  {p.categoryName || <span className="fst-italic">Senza categoria</span>}
                </div>
                <div className="mb-2">
                  <span className="badge bg-primary me-1">€ {p.price}</span>
                  <span className={`badge me-1 ${p.isActive ? 'bg-success' : 'bg-danger'}`}>
                    {p.isActive ? "Attivo" : "Disattivo"}
                  </span>
                  <span className="badge bg-secondary">Stock: {p.stockQuantity}</span>
                </div>
                <p className="card-text small flex-grow-1">
                  {p.description?.slice(0, 60)}{p.description?.length > 60 ? "..." : ""}
                </p>
                <div className="mt-auto d-flex flex-wrap gap-2">
                  <button 
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => handleOpen(p)}
                  >
                    Modifica
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => confirmToast(p.id)}
                  >
                    Elimina
                  </button>
                  <button 
                    className="btn btn-sm btn-success"
                    onClick={() => addToCart(p.id)}
                  >
                    Aggiungi al carrello
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Aggiungi/Modifica */}
      <div 
        className={`modal fade ${showModal ? 'show d-block' : ''}`} 
        tabIndex="-1" 
        style={showModal ? { background: 'rgba(0,0,0,.2)' } : {}} 
      >
        <div className="modal-dialog modal-dialog-centered">
          <form className="modal-content" onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">
                {editId ? "Modifica Prodotto" : "Nuovo Prodotto"}
              </h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-2">
                <label className="form-label">Nome*</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })} 
                  required 
                  minLength={3} 
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Descrizione</label>
                <textarea 
                  className="form-control" 
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })} 
                  rows={2} 
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Prezzo*</label>
                <input 
                  type="number" 
                  className="form-control" 
                  value={form.price}
                  onChange={e => setForm({ ...form, price: e.target.value })} 
                  step="0.01" 
                  min={0.01} 
                  required 
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Quantità in stock*</label>
                <input 
                  type="number" 
                  className="form-control" 
                  value={form.stockQuantity}
                  onChange={e => setForm({ ...form, stockQuantity: e.target.value })} 
                  min={0} 
                  required 
                />
              </div>
              <div className="mb-2">
                <label className="form-label">SKU*</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={form.sku}
                  onChange={e => setForm({ ...form, sku: e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, "") })} 
                  maxLength={50} 
                  required 
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Immagine URL</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={form.imageUrl}
                  onChange={e => setForm({ ...form, imageUrl: e.target.value })} 
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Categoria</label>
                <select 
                  className="form-select"
                  value={form.categoryId}
                  onChange={e => setForm({ ...form, categoryId: e.target.value })}
                >
                  <option value="">Senza categoria</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={handleClose}
              >
                Annulla
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
              >
                Salva
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
