import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/login.css";

/**
 * Login Component
 * Página de autenticación unificada para clientes y administradores
 * Detecta automáticamente el rol y redirija a la sección correspondiente
 * 
 * Credenciales de prueba:
 * - Cliente: juan@email.com / password123
 * - Admin: admin@pasteleria.cl / admin123
 */
export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  /**
   * Maneja el envío del formulario
   * Detecta el rol y redirija a la sección correspondiente
   */
  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simular delay de validación
    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        // Detectar rol y redirigir
        if (result.role === "admin") {
          navigate("/admin/dashboard");
        } else if (result.role === "client") {
          navigate("/");
        }
      } else {
        setError(result.error || "Email o contraseña inválidos");
        setPassword("");
      }
      setLoading(false);
    }, 500);
  }

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Botón de Retroceso */}
        <button 
          className="login-back-btn"
          onClick={() => navigate('/')}
          title="Volver al inicio"
        >
          ← Volver
        </button>

        {/* Logo */}
        <div className="login-logo">
          <span className="login-logo-icon">🏛️</span>
        </div>

        {/* Título */}
        <h1 className="login-title">Bienvenido</h1>

        {/* Error Message */}
        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="login-form">
          {/* Email Input */}
          <div className="login-group">
            <label htmlFor="email" className="login-label">
              Correo
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="login-input"
              disabled={loading}
              required
              autoComplete="email"
            />
          </div>

          {/* Password Input */}
          <div className="login-group">
            <label htmlFor="password" className="login-label">
              Contraseña
            </label>
            <div className="login-password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="tu contraseña"
                className="login-input"
                disabled={loading}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="login-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
                title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <a href="#" className="login-forgot-password">
            ¿Olvidaste tu contraseña?
          </a>

          {/* Submit Button */}
          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        {/* Register Link */}
        <p className="login-register">
          ¿No tienes una cuenta? <a href="/registro" className="login-register-link">Regístrate aquí</a>
        </p>

        {/* Demo Credentials */}
        <div className="login-demo">
          <details>
            <summary>🔐 Ver credenciales de demostración</summary>
            <div className="login-demo-content">
              <div className="demo-item">
                <p><strong>Cliente:</strong></p>
                <p>Email: <code>juan@email.com</code></p>
                <p>Contraseña: <code>password123</code></p>
              </div>
              <div className="demo-item">
                <p><strong>Administrador:</strong></p>
                <p>Email: <code>admin@pasteleria.cl</code></p>
                <p>Contraseña: <code>admin123</code></p>
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
