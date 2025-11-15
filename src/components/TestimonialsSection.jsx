import React from 'react';
import TestimonialCard from './TestimonialCard.jsx';
import '../styles/testimonials-section.css';

export default function TestimonialsSection() {
  // Array de testimonios de clientes
  const testimonials = [
    {
      id: 1,
      name: 'María González',
      rating: 5,
      testimonial: 'La mejor torta de chocolate que he probado en mi vida. Los detalles, la presentación y el sabor son incomparables. ¡Definitivamente volveré!'
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      rating: 5,
      testimonial: 'Pedí una torta personalizada para el cumpleaños de mi hija y fue un éxito total. El equipo fue muy atento y el resultado superó mis expectativas.'
    },
    {
      id: 3,
      name: 'Ana Martínez',
      rating: 5,
      testimonial: 'Llevo años comprando en Pastelería Mil Sabores. La consistencia en la calidad es lo que más me impresiona. Siempre fresco, siempre delicioso.'
    },
    {
      id: 4,
      name: 'Juan Pérez',
      rating: 5,
      testimonial: 'El servicio al cliente es excepcional. Me ayudaron a elegir la torta perfecta para un evento corporativo. Todos quedaron maravillados.'
    },
    {
      id: 5,
      name: 'Laura Fernández',
      rating: 5,
      testimonial: 'Los postres son una verdadera obra de arte. No solo saben increíble, sino que se ven como si fueran hechos por un artista profesional.'
    },
    {
      id: 6,
      name: 'Diego Sánchez',
      rating: 5,
      testimonial: 'Excelente proporción de sabor y presentación. Cada detalle cuenta. Recomiendo Pastelería Mil Sabores a todos mis amigos sin dudarlo.'
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        {/* Título de la Sección */}
        <h2 className="testimonials-title">Lo Que Dicen Nuestros Clientes</h2>

        {/* Grid de Testimonios */}
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              rating={testimonial.rating}
              testimonial={testimonial.testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
