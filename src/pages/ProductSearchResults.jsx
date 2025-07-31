import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { useLocation } from 'react-router-dom';

export default function ProductSearchResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const location = useLocation();

  // Prende la query dalla URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('query') || '';
    setQuery(q);
    if (q.trim()) {
      setLoading(true);
      api.get(`/products/search?name=${encodeURIComponent(q)}`)
        .then(res => setResults(res.data.content || []))
        .catch(() => setResults([]))
        .finally(() => setLoading(false));
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [location.search]);

  return (
    <div className="container mt-4">
      <h3>Risultati per: <span className="text-primary">{query}</span></h3>
      {loading ? (
        <div>Caricamento...</div>
      ) : results.length === 0 ? (
        <div className="alert alert-info">Nessun prodotto trovato.</div>
      ) : (
        <div className="row g-4 mt-2">
          {results.map(prod => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={prod.id}>
              <div className="card h-100 shadow-sm border-0">
                {prod.imageUrl &&
                  <img src={prod.imageUrl} alt={prod.name} className="card-img-top" style={{ maxHeight: 160, objectFit: 'cover' }} />
                }
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title mb-1">{prod.name}</h5>
                  <div className="mb-2 text-secondary small">
                    {prod.categoryName || <span className="fst-italic">Senza categoria</span>}
                  </div>
                  <div className="mb-2">
                    <span className="badge bg-primary me-1">€ {prod.price}</span>
                    <span className={`badge me-1 ${prod.isActive ? 'bg-success' : 'bg-danger'}`}>
                      {prod.isActive ? "Attivo" : "Disattivo"}
                    </span>
                  </div>
                  <p className="card-text small flex-grow-1">{prod.description?.slice(0, 60)}{prod.description?.length > 60 ? "..." : ""}</p>
                  {/* ...eventuali pulsanti "Aggiungi al carrello" */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
