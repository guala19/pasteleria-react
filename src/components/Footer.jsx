import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      console.log('Suscripción:', email);
      setEmail('');
      // Aquí iría la lógica para enviar el email a un servicio
    }
  };

  return (
    <footer className="footer">
      {/* ==================== PARTE A: BARRA DE SUSCRIPCIÓN (NEWSLETTER) ==================== */}
      <div className="footer-newsletter">
        <div className="newsletter-container">
          <h2 className="newsletter-title">Únete a Nuestra Familia Dulce</h2>
          <p className="newsletter-subtitle">
            Recibe recetas exclusivas, promociones especiales y las últimas novedades de Pastelería Mil Sabores
          </p>

          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <div className="newsletter-input-group">
              <input
                type="email"
                className="newsletter-input"
                placeholder="Tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-button">
                Suscribirme
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ==================== PARTE B: PIE DE PÁGINA PRINCIPAL (ENLACES) ==================== */}
      <div className="footer-main">
        <div className="footer-container">
          {/* Columna 1: Marca */}
          <div className="footer-column">
            <div className="footer-logo">
              <span className="footer-logo-icon">🥐</span>
              <h3 className="footer-logo-text">Mil Sabores</h3>
            </div>
            <p className="footer-description">
              50 años creando momentos dulces, forjando tradiciones y compartiendo la pasión por la repostería artesanal con toda nuestra comunidad.
            </p>
          </div>

          {/* Columna 2: Categorías */}
          <div className="footer-column">
            <h4 className="footer-column-title">Categorías</h4>
            <ul className="footer-links">
              <li><a href="/catalogo">Ver Catálogo</a></li>
              <li><a href="/catalogo">Tortas Especiales</a></li>
              <li><a href="/catalogo">Postres</a></li>
              <li><a href="/catalogo">Pasteles</a></li>
              <li><a href="/catalogo">Pan Dulce</a></li>
            </ul>
          </div>

          {/* Columna 3: Información */}
          <div className="footer-column">
            <h4 className="footer-column-title">Información</h4>
            <ul className="footer-links">
              <li><a href="/historia">Nuestra Historia</a></li>
              <li><a href="/guinness">Récord Guinness</a></li>
              <li><a href="/compromiso-social">Impacto Comunitario</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/contacto">Contacto</a></li>
            </ul>
          </div>

          {/* Columna 4: Síguenos */}
          <div className="footer-column">
            <h4 className="footer-column-title">Síguenos</h4>
            <div className="footer-social">
              <a href="https://facebook.com/pasteleriasilsabores" className="social-link" title="Facebook">
                📘
              </a>
              <a href="https://instagram.com/pasteleriasilsabores" className="social-link" title="Instagram">
                📷
              </a>
              <a href="https://twitter.com/pasteleriasilsabores" className="social-link" title="Twitter">
                𝕏
              </a>
              <a href="https://youtube.com/pasteleriasilsabores" className="social-link" title="YouTube">
                ▶️
              </a>
            </div>
            
            <div className="footer-contact">
              <p className="footer-contact-item">
                <span className="contact-icon">📧</span>
                <a href="mailto:info@pasteleriasilsabores.cl">info@pasteleriasilsabores.cl</a>
              </p>
              <p className="footer-contact-item">
                <span className="contact-icon">📞</span>
                <a href="tel:+56912345678">+56 9 1234 5678</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== PARTE C: BARRA DE DERECHOS DE AUTOR (COPYRIGHT) ==================== */}
      <div className="footer-copyright">
        <p className="copyright-text">
          © 2025 Pastelería Mil Sabores. Todos los derechos reservados. | 
          <a href="/terminos">Términos y Condiciones</a> | 
          <a href="/privacidad">Política de Privacidad</a>
        </p>
      </div>
    </footer>
  );
}
