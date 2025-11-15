import React, { useState } from 'react';
import '../styles/contacto.css';

/**
 * Contacto Component
 * 
 * Página de contacto con formulario y datos de contacto directo.
 * Diseño limpio, profesional y balanceado en dos columnas.
 * 
 * @component
 * @returns {React.ReactElement} Página de contacto
 */
export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica
    if (!formData.nombre.trim()) {
      setErrorMessage('Por favor ingresa tu nombre');
      return;
    }

    if (!formData.email.trim()) {
      setErrorMessage('Por favor ingresa tu correo');
      return;
    }

    if (!formData.mensaje.trim()) {
      setErrorMessage('Por favor escribe un mensaje');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Por favor ingresa un correo válido');
      return;
    }

    // Simular envío
    setTimeout(() => {
      setSuccessMessage('✓ Mensaje enviado exitosamente. Te contactaremos pronto.');
      setErrorMessage('');
      setFormData({ nombre: '', email: '', mensaje: '' });
    }, 500);
  };

  return (
    <div className="contacto-page">
      <div className="contacto-container">
        {/* Título Principal */}
        <header className="contacto-header">
          <h1 className="contacto-title">Ponte en Contacto</h1>
        </header>

        {/* Contenido Principal: Dos Columnas */}
        <div className="contacto-content">
          {/* Columna Izquierda: Formulario */}
          <section className="contacto-formulario">
            <h2 className="columna-title">Envíanos un Mensaje</h2>

            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )}

            {errorMessage && (
              <div className="alert alert-error">{errorMessage}</div>
            )}

            <form className="form-contacto" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nombre" className="form-label">Nombre Completo</label>
                <input
                  id="nombre"
                  type="text"
                  name="nombre"
                  className="form-input"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Tu nombre"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Correo Electrónico</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="tu@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="mensaje" className="form-label">Tu Mensaje</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  className="form-textarea"
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  placeholder="Cuéntanos qué necesitas..."
                  rows="5"
                ></textarea>
              </div>

              <button type="submit" className="btn btn-submit">
                Enviar Mensaje
              </button>
            </form>
          </section>

          {/* Columna Derecha: Información Directa */}
          <aside className="contacto-info">
            <h2 className="columna-title">Contacto Directo</h2>

            <div className="contact-list">
              {/* Visítanos */}
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div className="contact-details">
                  <h3 className="contact-item-title">Visítanos</h3>
                  <p className="contact-item-text">
                    Álvarez 2366, Chorrillos<br />
                    Viña del Mar
                  </p>
                </div>
              </div>

              {/* Llámanos */}
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div className="contact-details">
                  <h3 className="contact-item-title">Llámanos</h3>
                  <p className="contact-item-text">
                    <a href="tel:+56322268600" className="contact-link">
                      +56 32 226 8600
                    </a>
                  </p>
                </div>
              </div>

              {/* Escríbenos */}
              <div className="contact-item">
                <div className="contact-icon">✉️</div>
                <div className="contact-details">
                  <h3 className="contact-item-title">Escríbenos</h3>
                  <p className="contact-item-text">
                    <a href="mailto:hola@milsabores.cl" className="contact-link">
                      hola@milsabores.cl
                    </a>
                  </p>
                </div>
              </div>

              {/* Horario */}
              <div className="contact-item">
                <div className="contact-icon">🕐</div>
                <div className="contact-details">
                  <h3 className="contact-item-title">Horario</h3>
                  <p className="contact-item-text">
                    Lunes a Sábado<br />
                    09:00 a 19:00 hrs
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
