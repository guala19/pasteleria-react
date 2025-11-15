import React from 'react';
import ProductCard from './ProductCard.jsx';
import { PRODUCTS } from '../data/products.js';
import '../styles/recommended-section.css';

export default function RecommendedSection() {
  // Seleccionar 4 productos recomendados (primeros 4 del array)
  const recommendedProducts = PRODUCTS.slice(0, 4);

  return (
    <section className="recommended-section">
      <div className="recommended-container">
        {/* Título de la sección */}
        <h2 className="recommended-title">Recomendados para Ti</h2>

        {/* Cuadrícula de productos */}
        <div className="recommended-grid">
          {recommendedProducts.map((product) => (
            <ProductCard 
              key={product.code} 
              product={product}
              className="recommended-product-card"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
