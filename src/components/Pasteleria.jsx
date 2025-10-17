import React, { useState } from "react";
import Navbar from "./Navbar";
import "./css/style.css";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !email || !password) {
      setMensaje("Completa los campos obligatorios.");
      return;
    }
    if (password !== password2) {
      setMensaje("Las contraseñas no coinciden.");
      return;
    }
    
    try {
      const raw = localStorage.getItem("users") || "[]";
      const users = JSON.parse(raw);
      
      const exists = users.some(u => u.email === email);
      if (!exists) {
        users.push({ name: nombre, email });
        localStorage.setItem("users", JSON.stringify(users));
      }
    } catch (err) {
    
    }
    const msg = calcularMensaje();
    setMensaje(msg);
  };

  
}