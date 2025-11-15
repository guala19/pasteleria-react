import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/social-commitment.css';

export default function SocialCommitment() {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate('/historia');
  };

  return (
    <section className="social-commitment">
      <div className="social-commitment-container">
        {/* Columna Izquierda: Contenido y Texto */}
        <div className="social-commitment-content">
          <h2 className="social-commitment-title">Nuestro Compromiso Social</h2>
          
          <p className="social-commitment-text">
            En Pastelería Mil Sabores creemos que la repostería va más allá de un producto: es una 
            oportunidad de transformar vidas y fortalecer nuestra comunidad.
          </p>
          
          <p className="social-commitment-text">
            Cada compra que realizas contribuye directamente a nuestro programa de becas en 
            gastronomía con Duoc UC, ayudando a jóvenes talentosos a perseguir sus sueños en 
            el mundo culinario.
          </p>
          
          <p className="social-commitment-text">
            Creemos que el éxito se mide no solo en pasteles, sino en las sonrisas de quienes 
            trabajan con nosotros y las oportunidades que sembramos en la próxima generación.
          </p>

          <button 
            className="social-commitment-button"
            onClick={handleLearnMore}
            title="Conoce más sobre nuestro programa social"
          >
            Conoce más sobre nuestro programa
          </button>
        </div>

        {/* Columna Derecha: Imagen */}
        <div className="social-commitment-image">
          <img 
            src="/img/home-estudiantes.jpg" 
            alt="Estudiantes de gastronomía en Duoc UC - Programa de Becas Pastelería Mil Sabores"
            className="social-commitment-img"
          />
        </div>
      </div>
    </section>
  );
}
