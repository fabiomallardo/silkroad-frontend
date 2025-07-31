// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #ddeaff, #f4e5ff 90%)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <h1 style={{ fontWeight: 700, fontSize: "2.7rem" }}>Benvenuto su SILKROAD</h1>
      <p style={{ fontSize: "1.25rem", color: "#3a3569", maxWidth: 400, textAlign: "center", margin: "20px 0" }}>
        Il tuo e-commerce evoluto, dove puoi gestire prodotti, utenti e carrelli in modo semplice e sicuro.<br />
        <span style={{ color: "#8262ea" }}>Effettua il login oppure registrati per iniziare!</span>
      </p>
      <div>
        <Link to="/login" className="btn btn-primary me-2" style={{ marginRight: 16 }}>Login</Link>
        <Link to="/register" className="btn btn-outline-primary">Registrati</Link>
      </div>
    </div>
  );
}
