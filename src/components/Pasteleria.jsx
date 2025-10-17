import React, { useState } from "react";
import Navbar from "./Navbar";
import "../styles/style.css";

const STORAGE_KEY = "demo_accounts_v1";

export default function Pasteleria() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [edad, setEdad] = useState("");
  const [codigo, setCodigo] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [mensaje, setMensaje] = useState(null);

  function calcularMensaje() {
    let msg = "";
    if (email.includes("@duocuc.cl")) msg += "Tienes una torta gratis 🎂\n";
    if (Number(edad) >= 50) msg += "Tienes un 50% de descuento\n";
    if (codigo.trim().toLowerCase() === "felices 50") msg += "Tienes un 10% de descuento\n";
    if (msg === "") msg = "No tienes beneficios";
    return msg;
  }

  function saveAccountToDemoAccounts({ name, email, password }) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      // evitar duplicados por email
      const exists = Array.isArray(parsed) && parsed.some(a => a.email === email);
      if (exists) return false;
      const nextId = Array.isArray(parsed) && parsed.length ? Math.max(...parsed.map(a => a.id)) + 1 : 1;
      const newAcc = { id: nextId, name, email, password };
      const next = [newAcc, ...(Array.isArray(parsed) ? parsed : [])];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return true;
    } catch (err) {
      console.error("Error guardando cuenta demo:", err);
      return false;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje(null);

    if (!nombre.trim() || !email.trim() || !password.trim()) {
      setMensaje("Completa los campos obligatorios (nombre, email, contraseña).");
      return;
    }
    if (password !== password2) {
      setMensaje("Las contraseñas no coinciden.");
      return;
    }

    
    const ok = saveAccountToDemoAccounts({ name: nombre.trim(), email: email.trim(), password: password });
    if (!ok) {
      setMensaje("Ya existe una cuenta con ese email.");
      return;
    }

    const msg = calcularMensaje();
    setMensaje("Registro ok. " + msg);

    //limpiar formulario
    setNombre("");
    setEmail("");
    setEdad("");
    setCodigo("");
    setPassword("");
    setPassword2("");
    
  };

  return (
    <div>
      <Navbar />
      <main className="form-container">
        <h2>Registro / Demo</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="form-label small">Nombre *</label>
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} className="form-control" />
          </div>

          <div className="mb-2">
            <label className="form-label small">Email *</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" type="email" />
          </div>

          <div className="mb-2">
            <label className="form-label small">Edad</label>
            <input value={edad} onChange={(e) => setEdad(e.target.value)} className="form-control" type="number" />
          </div>

          <div className="mb-2">
            <label className="form-label small">Código (opcional)</label>
            <input value={codigo} onChange={(e) => setCodigo(e.target.value)} className="form-control" />
          </div>

          <div className="mb-2">
            <label className="form-label small">Contraseña *</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" type="password" />
          </div>

          <div className="mb-2">
            <label className="form-label small">Repetir contraseña *</label>
            <input value={password2} onChange={(e) => setPassword2(e.target.value)} className="form-control" type="password" />
          </div>

          <button type="submit" className="btn btn-primary mt-2 w-100">Registrar</button>
        </form>

        {mensaje && <div className="nota mt-3">{mensaje}</div>}
      </main>
    </div>
  );
}