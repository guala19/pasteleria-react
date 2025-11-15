import React from 'react';
import '../styles/testimonial-card.css';

export default function TestimonialCard({ name, rating, testimonial }) {
  // Crear array de estrellas basado en el rating
  const stars = Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < rating ? 'star filled' : 'star empty'}>
      ★
    </span>
  ));

  return (
    <div className="testimonial-card">
      {/* Encabezado: Icono, Nombre y Estrellas */}
      <div className="testimonial-header">
        <div className="testimonial-avatar">👤</div>
        
        <div className="testimonial-info">
          <h3 className="testimonial-name">{name}</h3>
          <div className="testimonial-rating">
            {stars}
          </div>
        </div>
      </div>

      {/* Cuerpo: Cita del Testimonio */}
      <p className="testimonial-text">
        {testimonial}
      </p>
    </div>
  );
}
