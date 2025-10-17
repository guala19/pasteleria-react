import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirige al catálogo después de "iniciar sesión"
    // Puedes reemplazar esto por lógica de autenticación más adelante
    navigate("/catalogo");
  };

  // estilo inline mínimo para asegurar que el texto sea visible (negro)
  const inputStyle = { color: "#000" };

  return (
    <div>
      <Navbar />
      <div className="form-container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <label>Correo</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          /><br /><br />

          <label>Contraseña</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
          /><br /><br />

          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;