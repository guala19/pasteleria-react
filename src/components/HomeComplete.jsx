import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products.js';
import RecommendedSection from './RecommendedSection.jsx';
import SocialCommitment from './SocialCommitment.jsx';
import GuinnessRecord from './GuinnessRecord.jsx';
import TestimonialsSection from './TestimonialsSection.jsx';
import '../styles/home-redesign.css';

export default function HomeComplete() {
  const navigate = useNavigate();

  return (
    <div className="home-complete">
      <section className="hero-section">
        <div className="hero-background"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            Celebrando <span className="hero-title-highlight">50 Años</span> de Dulzura y Tradición
          </h1>
          <p className="hero-subtitle">
            Medio siglo creando momentos inolvidables con nuestras recetas artesanales
          </p>
          <div className="hero-buttons">
            <button 
              className="btn-primary-hero"
              onClick={() => navigate('/catalogo')}
            >
              Ver Catálogo
            </button>
            <button 
              className="btn-secondary-hero"
              onClick={() => navigate('/historia')}
            >
              Nuestra Historia
            </button>
          </div>
        </div>
      </section>

      <div className="promo-banner-hero">
        <div className="promo-content">
          <span className="promo-icon">🎉</span>
          <span className="promo-text">¡Celebra con nosotros! Usa el código</span>
          <span className="promo-code">FELICES50</span>
          <span className="promo-text">y obtén 10% de descuento</span>
        </div>
      </div>

      {/* ==================== SECCIÓN RECOMENDADOS PARA TI ==================== */}
      <RecommendedSection />

      {/* ==================== SECCIÓN NUESTRO COMPROMISO SOCIAL ==================== */}
      <SocialCommitment />

      {/* ==================== SECCIÓN RÉCORD GUINNESS ==================== */}
      <GuinnessRecord />

      {/* ==================== SECCIÓN TESTIMONIOS ==================== */}
      <TestimonialsSection />
    </div>
  );
}
