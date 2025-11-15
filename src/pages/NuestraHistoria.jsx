import React from 'react';
import '../styles/nuestra-historia.css';

/**
 * NuestraHistoria Component
 * 
 * Página editorial que cuenta la historia de la pastelería Mil Sabores.
 * Diseño limpio, legible y minimalista con paleta de colores coherente.
 * 
 * @component
 * @returns {React.ReactElement} Página de historia de la pastelería
 */
export default function NuestraHistoria() {
  return (
    <div className="nuestra-historia-page">
      {/* Contenedor principal de historia */}
      <article className="historia-container">
        
        {/* Título Principal */}
        <header className="historia-header">
          <h1 className="historia-title">Nuestra Historia</h1>
          <p className="historia-subtitle">Medio Siglo de Dulzura</p>
        </header>

        {/* Contenido Editorial */}
        <section className="historia-content">
          <p className="historia-paragraph">
            En 1974, una pequeña pastelería abrió sus puertas en el corazón del barrio, llevando consigo 
            una receta familiar guardada en secreto por tres generaciones. Lo que comenzó como un sueño 
            modesto de doña María García—una maestra pastelera con manos expertas y un corazón generoso—se 
            transformó en un ícono local que trasciende décadas.
          </p>

          <p className="historia-paragraph">
            La receta no era compleja. De hecho, su belleza residía en su simpleza: ingredientes de la 
            más alta calidad, técnicas tradicionales respetadas con disciplina casi monástica, y una dosis 
            inmeasurable de amor en cada creación. Doña María creía que cada pastel contaba una historia, 
            que cada cliente merecía un momento de alegría, y que la excelencia no era un lujo sino una 
            obligación moral.
          </p>

          {/* Bloque de Cita */}
          <blockquote className="historia-quote">
            <p className="quote-text">
              "Nuestra receta secreta no es un ingrediente, es la tradición. Es el tiempo que invertimos, 
              el cuidado que ponemos, y la convicción de que nada vale la pena si no es hecho con el alma."
            </p>
            <p className="quote-author">— Doña María García, Fundadora</p>
          </blockquote>

          <p className="historia-paragraph">
            A lo largo de los años, Mil Sabores no solo sobrevivió, sino prosperó. En una era donde las 
            cadenas masivas y la producción industrial dominaban, nuestra pastelería permaneció fiel a sus 
            principios: artesanía, autenticidad y excelencia. Cada torta de tres pisos, cada petit-four, 
            cada croissant de mantequilla es un testigo de esa promesa ancestral.
          </p>

          <p className="historia-paragraph">
            Hoy, en la era digital, cuando todo se compra con un click y se consume sin pensar, Mil Sabores 
            continúa siendo un refugio. Un lugar donde el tiempo se ralentiza, donde los sabores son 
            verdaderos, y donde cada cliente es tratado no como un número en una hoja de cálculo, sino como 
            alguien especial que merece lo mejor. Porque eso es lo que somos: no solo una pastelería, sino 
            guardianes de una tradición que cambia vidas, bite a bite.
          </p>

          <p className="historia-paragraph">
            Medio siglo después, continuamos escribiendo nuestra historia. Y queremos que seas parte de ella.
          </p>
        </section>
      </article>
    </div>
  );
}
