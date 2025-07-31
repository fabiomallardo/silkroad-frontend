// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(120deg, #ddeaff 0%, #f4e5ff 100%)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Sfere decorative */}
      <div style={{
        position: "absolute", top: 40, left: 60, width: 160, height: 160, background: "#a5c6fa44", borderRadius: "50%",
        filter: "blur(24px)", zIndex: 0
      }} />
      <div style={{
        position: "absolute", bottom: 30, right: 60, width: 200, height: 200, background: "#d5bfff55", borderRadius: "50%",
        filter: "blur(38px)", zIndex: 0
      }} />
      {/* CARD PRINCIPALE */}
      <div style={{
        background: "rgba(255,255,255,0.82)",
        borderRadius: 24,
        boxShadow: "0 8px 36px #7d7fff18",
        padding: "48px 36px 38px 36px",
        maxWidth: 400,
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backdropFilter: "blur(4px)"
      }}>
        {/* LOGO */}
        <div style={{
          width: 74, height: 74, borderRadius: "50%", background: "#e0e8ff",
          display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22,
          boxShadow: "0 2px 18px #b2beef30"
        }}>
          <img
            src="/logo.png"
            alt="Silkroad Logo"
            style={{ width: 48, height: 48, objectFit: "contain" }}
            onError={e => { e.target.src = "/logo-placeholder.png"; }}
          />
        </div>
        <h1 style={{
          fontWeight: 900,
          fontSize: "2.3rem",
          letterSpacing: "-1.5px",
          background: "linear-gradient(92deg,#7555df 30%,#26b9ff 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: 6
        }}>Benvenuto su<br />SILKROAD</h1>
        <p style={{
          fontSize: "1.16rem",
          color: "#383272",
          maxWidth: 330,
          textAlign: "center",
          margin: "18px 0 28px 0",
          lineHeight: 1.6
        }}>
          Il tuo <b>e-commerce evoluto</b>: gestisci prodotti, clienti e carrelli con facilità.<br />
          <span style={{
            color: "#8262ea",
            fontWeight: 600,
            fontSize: "1.1em"
          }}>Effettua il login o registrati per iniziare!</span>
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
          <Link
            to="/login"
            className="btn btn-primary"
            style={{
              minWidth: 108,
              fontWeight: 600,
              fontSize: 17,
              borderRadius: 30,
              background: "linear-gradient(90deg,#7555df 60%,#26b9ff 100%)",
              border: "none",
              transition: "all .17s",
              boxShadow: "0 2px 14px #7560df18"
            }}
            onMouseOver={e => e.target.style.background = "linear-gradient(90deg,#26b9ff 70%,#7555df 100%)"}
            onMouseOut={e => e.target.style.background = "linear-gradient(90deg,#7555df 60%,#26b9ff 100%)"}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="btn btn-outline-primary"
            style={{
              minWidth: 108,
              fontWeight: 600,
              fontSize: 17,
              borderRadius: 30,
              background: "#fff",
              color: "#7555df",
              border: "2px solid #c6b8f8",
              transition: "all .17s"
            }}
            onMouseOver={e => {
              e.target.style.background = "#ede8fc";
              e.target.style.color = "#444";
              e.target.style.borderColor = "#26b9ff";
            }}
            onMouseOut={e => {
              e.target.style.background = "#fff";
              e.target.style.color = "#7555df";
              e.target.style.borderColor = "#c6b8f8";
            }}
          >
            Registrati
          </Link>
        </div>
      </div>
    </div>
  );
}
