import { useState, useEffect } from "react";
import { PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";
import "../styles/slideshow.css";

export default function ProductSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { MONEDA } = useCart();

  // Productos para el slideshow (primeros 6)
  const slideshowProducts = PRODUCTS.slice(0, 6);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slideshowProducts.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slideshowProducts.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Auto-avanzar cada 5 segundos
  useEffect(() => {
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [slideshowProducts.length]);

  const currentProduct = slideshowProducts[currentIndex];
  const basePrice = currentProduct.price;
  const maxPrice = currentProduct.price + 10000;

  return (
    <div className="slideshow-container">
      {/* Imagen principal */}
      <div className="slideshow-image-wrapper">
        <img
          src={currentProduct.img}
          alt={currentProduct.name}
          className="slideshow-image"
        />

        {/* Overlay con nombre y precio */}
        <div className="slideshow-overlay">
          <div className="slideshow-product-info">
            <h3 className="slideshow-product-name">{currentProduct.name}</h3>
            <div className="slideshow-price-box">
              <span className="slideshow-price">
                {MONEDA.format(basePrice)} - {MONEDA.format(maxPrice)}
              </span>
            </div>
          </div>
        </div>

        {/* Flechas de navegación */}
        <button
          className="slideshow-arrow slideshow-arrow-left"
          onClick={goToPrevious}
          aria-label="Producto anterior"
        >
          &#10094;
        </button>

        <button
          className="slideshow-arrow slideshow-arrow-right"
          onClick={goToNext}
          aria-label="Producto siguiente"
        >
          &#10095;
        </button>
      </div>

      {/* Indicadores de puntos */}
      <div className="slideshow-dots">
        {slideshowProducts.map((_, index) => (
          <span
            key={index}
            className={`slideshow-dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Ir al producto ${index + 1}`}
          ></span>
        ))}
      </div>
    </div>
  );
}
