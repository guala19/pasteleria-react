import React, { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";
import "../styles/product-detail.css";

export default function ProductNew() {
  const { code } = useParams();
  const product = useMemo(() => PRODUCTS.find(p => p.code === code), [code]);
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(0);
  const [showPersonalization, setShowPersonalization] = useState(false);
  const [personalMessage, setPersonalMessage] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="product-detail-container">
        <div className="empty-state">
          <h2>Producto no encontrado</h2>
          <Link to="/catalogo" className="btn-back">
            Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  // Mapeo de tamaños
  const sizes = ["S", "M", "L"];
  const sizeMultipliers = { S: 0.8, M: 1, L: 1.2 };
  const finalPrice = Math.round(product.price * sizeMultipliers[selectedSize]);

  // Imágenes (usando la misma por ahora, pero estructura para múltiples)
  const productImages = [product.img, product.img, product.img, product.img];

  // Productos relacionados (mismo tipo o categoría)
  const relatedProducts = PRODUCTS.filter(
    p => p.category === product.category && p.code !== product.code
  ).slice(0, 3);

  const handleAddToCart = () => {
    addToCart({
      code: product.code,
      name: product.name,
      price: finalPrice,
      img: product.img,
      quantity: quantity,
      size: selectedSize,
      message: personalMessage || undefined
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  return (
    <div className="product-detail-container">
      {/* ==================== BREADCRUMBS ==================== */}
      <nav className="breadcrumbs-product">
        <Link to="/">Inicio</Link>
        <span className="breadcrumb-sep">/</span>
        <Link to="/catalogo">Catálogo</Link>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-active">{product.name}</span>
      </nav>

      {/* ==================== MAIN CONTENT (2 COLUMNS) ==================== */}
      <div className="product-main-content">
        {/* LEFT COLUMN - IMAGE */}
        <div className="product-image-column">
          {/* Main Image */}
          <div className="image-main-wrapper">
            <img
              src={productImages[mainImage]}
              alt={product.name}
              className="image-main"
            />
          </div>

          {/* Image Carousel */}
          <div className="image-carousel">
            {productImages.map((img, idx) => (
              <button
                key={idx}
                className={`carousel-thumbnail ${mainImage === idx ? "active" : ""}`}
                onClick={() => setMainImage(idx)}
              >
                <img src={img} alt={`Miniatura ${idx + 1}`} />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN - INFO */}
        <div className="product-info-column">
          {/* Product Name */}
          <h1 className="product-detail-title">{product.name}</h1>

          {/* Category Subtitle */}
          <p className="product-category-label">{product.category}</p>

          {/* Description */}
          <p className="product-description">{product.description}</p>

          {/* Diet Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="diet-tags">
              {product.tags.map((tag) => {
                const tagLabel = {
                  sin_azucar: "Sin Azúcar",
                  sin_gluten: "Sin Gluten",
                  vegano: "Vegano"
                }[tag];
                return (
                  <span key={tag} className="diet-tag">
                    {tagLabel}
                  </span>
                );
              })}
            </div>
          )}

          {/* Price */}
          <div className="price-section">
            <span className="price-label">Precio</span>
            <h2 className="price-display">
              ${finalPrice.toLocaleString("es-CL")}
            </h2>
          </div>

          {/* Size Selector */}
          <div className="selector-section">
            <label className="selector-label">Tamaño</label>
            <div className="size-chips">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`size-chip ${selectedSize === size ? "active" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="selector-section">
            <label className="selector-label">Cantidad</label>
            <div className="quantity-selector">
              <button
                className="qty-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                −
              </button>
              <span className="qty-display">{quantity}</span>
              <button
                className="qty-btn"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Main Action Buttons */}
          <div className="action-buttons">
            <button
              className="btn-add-to-cart"
              onClick={handleAddToCart}
            >
              🛒 Agregar al carrito
            </button>
            <button
              className="btn-personalize"
              onClick={() => setShowPersonalization(!showPersonalization)}
            >
              ✨ Personalizar torta
            </button>
          </div>

          {/* Feedback Message */}
          {addedToCart && (
            <div className="feedback-message">
              ✓ ¡Producto agregado al carrito! 🍰
            </div>
          )}

          {/* Personalization Section */}
          {showPersonalization && (
            <div className="personalization-section">
              <h3 className="personalization-title">Personaliza tu torta</h3>
              <div className="personalization-form">
                <div className="form-group">
                  <label htmlFor="message">Mensaje personalizado (opcional)</label>
                  <textarea
                    id="message"
                    maxLength={60}
                    value={personalMessage}
                    onChange={(e) => setPersonalMessage(e.target.value)}
                    placeholder="Ej: ¡Feliz cumpleaños!"
                  />
                  <span className="char-count">{personalMessage.length}/60</span>
                </div>
                <div className="form-group">
                  <label>Color de crema</label>
                  <div className="color-options">
                    <button className="color-option" style={{ backgroundColor: "#FFB6C1" }} title="Rosa" />
                    <button className="color-option" style={{ backgroundColor: "#8B4513" }} title="Chocolate" />
                    <button className="color-option" style={{ backgroundColor: "#FFFFFF" }} title="Blanco" />
                    <button className="color-option" style={{ backgroundColor: "#F5DEB3" }} title="Vainilla" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Decoraciones opcionales</label>
                  <div className="decoration-options">
                    <label className="decoration-checkbox">
                      <input type="checkbox" />
                      <span>Fresas frescas (+$3.000)</span>
                    </label>
                    <label className="decoration-checkbox">
                      <input type="checkbox" />
                      <span>Velas decorativas (+$2.000)</span>
                    </label>
                    <label className="decoration-checkbox">
                      <input type="checkbox" />
                      <span>Sprinkles de chocolate (+$1.500)</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ==================== RELATED PRODUCTS ==================== */}
      {relatedProducts.length > 0 && (
        <section className="related-products-section">
          <h2 className="related-title">Más delicias como esta 🍰</h2>
          <div className="related-grid">
            {relatedProducts.map((relProduct) => (
              <Link
                key={relProduct.code}
                to={`/producto/${relProduct.code}`}
                className="related-card-link"
              >
                <div className="related-card">
                  <div className="related-image-wrapper">
                    <img src={relProduct.img} alt={relProduct.name} />
                  </div>
                  <h3 className="related-name">{relProduct.name}</h3>
                  <p className="related-price">
                    ${relProduct.price.toLocaleString("es-CL")}
                  </p>
                  <button className="related-btn">Ver producto</button>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
