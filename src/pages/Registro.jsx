import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

/**
 * Registro Component
 * Página de registro para nuevos clientes
 * Mismo diseño que Login pero con campos adicionales
 */
export default function Registro() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validación básica
    if (!formData.nombre.trim()) {
      setError("Por favor ingresa tu nombre completo");
      setLoading(false);
      return;
    }

    if (!formData.email.trim()) {
      setError("Por favor ingresa tu correo electrónico");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Por favor ingresa un correo válido");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    // Simular registro exitoso
    setTimeout(() => {
      setSuccess("✓ Registro exitoso. Redirigiendo a login...");
      setFormData({ nombre: "", email: "", password: "", confirmPassword: "" });
      
      // Redirigir a login después de 1.5 segundos
      setTimeout(() => {
        navigate("/login");
      }, 1500);
      
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
          <span className="login-logo-icon">🎂</span>
        </div>

        {/* Título */}
        <h1 className="login-title">Crear Cuenta</h1>
        <p className="registro-subtitle">Únete a nuestra familia de clientes</p>

        {/* Error Message */}
        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="registro-success">
            {success}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="login-form">
          {/* Nombre Input */}
          <div className="login-group">
            <label htmlFor="nombre" className="login-label">
              Nombre Completo
            </label>
            <input
              id="nombre"
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Tu nombre completo"
              className="login-input"
              disabled={loading}
              required
              autoComplete="name"
            />
          </div>

          {/* Email Input */}
          <div className="login-group">
            <label htmlFor="email" className="login-label">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Crea tu contraseña"
                className="login-input"
                disabled={loading}
                required
                autoComplete="new-password"
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

          {/* Confirm Password Input */}
          <div className="login-group">
            <label htmlFor="confirmPassword" className="login-label">
              Confirmar Contraseña
            </label>
            <div className="login-password-wrapper">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirma tu contraseña"
                className="login-input"
                disabled={loading}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                className="login-toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={loading}
                title={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          {/* Terms Acceptance */}
          <p className="registro-terms">
            Al registrarte, aceptas nuestros términos y condiciones de privacidad.
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Crear Cuenta"}
          </button>
        </form>

        {/* Login Link */}
        <p className="login-register">
          ¿Ya tienes una cuenta? <a href="/login" className="login-register-link">Inicia sesión aquí</a>
        </p>
      </div>
    </div>
  );
}
