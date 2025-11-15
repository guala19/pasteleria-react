import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import '../styles/product-card.css';

export default function ProductCard({ product, className = '' }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      code: product.code,
      name: product.name,
      price: product.price,
      img: product.img,
      quantity: 1
    });
  };

  const handleProductClick = () => {
    navigate(`/producto/${product.code}`);
  };

  return (
    <div className={`product-card ${className}`}>
      {/* Imagen del producto */}
      <div className="product-card-image" onClick={handleProductClick} style={{ cursor: 'pointer' }}>
        <img src={product.img} alt={product.name} />
      </div>

      {/* Contenido de la tarjeta */}
      <div className="product-card-content">
        {/* Nombre del producto */}
        <h3 className="product-card-name">{product.name}</h3>

        {/* Descripción corta */}
        <p className="product-card-description">{product.description}</p>

        {/* Fila de acción: Precio y Botón */}
        <div className="product-card-footer">
          <span className="product-card-price">${product.price.toLocaleString('es-CL')}</span>
          <button 
            className="product-card-button"
            onClick={handleAddToCart}
            title="Agregar al carrito"
          >
            🛒 Agregar
          </button>
        </div>
      </div>
    </div>
  );
}