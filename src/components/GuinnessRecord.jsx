import React from 'react';
import '../styles/guinness-record.css';

export default function GuinnessRecord() {
  return (
    <section className="guinness-record-section">
      <div className="guinness-record-card">
        <div className="guinness-record-container">
          {/* Columna Izquierda: Contenido y Texto */}
          <div className="guinness-record-content">
            {/* Icono del Trofeo */}
            <div className="guinness-trophy-icon">🏆</div>

            {/* Título */}
            <h2 className="guinness-record-title">Récord Guinness</h2>

            {/* Párrafos de Texto */}
            <p className="guinness-record-text">
              En 1995, Pastelería Mil Sabores hizo historia al crear la torta más grande jamás 
              elaborada en Chile, logrando un reconocimiento oficial en el Libro Guinness de 
              Récords Mundiales.
            </p>

            <p className="guinness-record-text">
              Este hito no fue solo un desafío técnico, sino un testimonio de nuestra dedicación 
              a la excelencia, innovación y a la calidad incompromisable que hemos mantenido 
              durante 50 años.
            </p>

            <p className="guinness-record-text">
              Cada pastry que sale de nuestros hornos honra ese compromiso histórico: la búsqueda 
              constante de la perfección, el uso de ingredientes premium y la creatividad sin límites.
            </p>
          </div>

          {/* Columna Derecha: Imagen */}
          <div className="guinness-record-image">
            <img 
              src="/img/tortaGuiness.png" 
              alt="Récord Guinness - Torta más grande de Chile 1995 - Pastelería Mil Sabores"
              className="guinness-record-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
