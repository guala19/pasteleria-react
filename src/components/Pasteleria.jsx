// src/components/Pasteleria.jsx

import { useState } from "react";
import Navbar from "./Navbar.jsx"; // Asumiendo que Navbar existe
import "../styles/style.css"; // Asumiendo que existe el archivo de estilos

const STORAGE_KEY = "demo_accounts_v1";

export default function Pasteleria() {
    // 🏛️ Gestión de Estados del formulario
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [edad, setEdad] = useState("");
    const [codigo, setCodigo] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [mensaje, setMensaje] = useState(null);

    // 💡 Lógica de negocio (Promociones fuera del carrito, basada en los requisitos)
    function calcularMensaje() {
        let msg = "";
        
        // 🎂 Beneficio DUOC (basado en dominio)
        if (email.includes("@duocuc.cl")) msg += "Tienes una torta gratis 🎂\n";
        
        // 🎉 50 Aniversario (basado en edad)
        if (Number(edad) >= 50) msg += "Tienes un 50% de descuento\n";
        
        // 💰 Código Promocional
        if (codigo.trim().toLowerCase() === "felices 50") msg += "Tienes un 10% de descuento\n";
        
        if (msg === "") msg = "No tienes beneficios";
        return msg;
    }

    // 💾 Lógica de Guardado en localStorage
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

    // 📩 Manejador de Envío de Formulario
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

        // Limpiar formulario
        setNombre("");
        setEmail("");
        setEdad("");
        setCodigo("");
        setPassword("");
        setPassword2("");
        
    };

    // 🌐 Renderizado del formulario (Diseño Responsivo con clases de Bootstrap)
    return (
        <div>
            {/* Si tu Navbar tiene errores, coméntalo para que el formulario se muestre */}
            <Navbar /> 
            
            <main className="form-container container my-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="card p-4 shadow-sm">
                            <h2 className="text-center mb-4">Registro / Demo</h2>

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

                                <button type="submit" className="btn btn-primary mt-3 w-100">Registrar</button>
                            </form>

                            {mensaje && <div className={`nota mt-3 alert ${mensaje.includes('ok') ? 'alert-success' : 'alert-danger'}`}>{mensaje}</div>}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}