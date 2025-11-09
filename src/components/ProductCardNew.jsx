import React, { useState } from "react";
import ProductQuickView from "./ProductQuickView.jsx";

export default function ProductCardNew({ product, onAddToCart }) {
  const [showQuickView, setShowQuickView] = useState(false);
  const [selectedSize, setSelectedSize] = useState("M");
  const [customMessage, setCustomMessage] = useState("");

  const getDietBadges = () => {
    const badges = [];
    if (product.category === "Productos Sin Azúcar") badges.push("Sin Azúcar");
    if (product.category === "Productos sin gluten") badges.push("Sin Gluten");
    if (product.category === "Productos Veganos") badges.push("Vegano");
    return badges;
  };

  const getShapeLabel = () => {
    if (product.type === "cuadrada") return "Cuadrada";
    if (product.type === "circular") return "Circular";
    return null;
  };

  const isPersonalizable =
    product.type === "cuadrada" || product.type === "circular";

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, customMessage);
  };

  const dietBadges = getDietBadges();
  const shapeLabel = getShapeLabel();

  return (
    <>
      <article
        className="product-card"
        data-testid={`card-${product.code}`}
        role="listitem"
      >
        {/* Imagen */}
        <div className="product-image-container">
          <img
            src={product.img}
            alt={product.name}
            className="product-image"
          />

          {/* Badges Dietas (esquina sup. izq.) */}
          {dietBadges.length > 0 && (
            <div className="diet-badges">
              {dietBadges.map((badge, idx) => (
                <span key={idx} className="diet-badge">
                  {badge === "Sin Azúcar" && "🍫"}
                  {badge === "Sin Gluten" && "🌾"}
                  {badge === "Vegano" && "🌱"}
                  <span className="badge-text">{badge}</span>
                </span>
              ))}
            </div>
          )}

          {/* Etiqueta Forma (esquina sup. der.) */}
          {shapeLabel && (
            <div className="shape-badge">
              {shapeLabel === "Cuadrada" && "⬜"}
              {shapeLabel === "Circular" && "⭕"}
              <span className="badge-text">{shapeLabel}</span>
            </div>
          )}

          {/* Overlay Quick View */}
          <div className="image-overlay">
            <button
              className="btn-quick-view"
              onClick={() => setShowQuickView(true)}
              data-testid={`btn-quickview-${product.code}`}
            >
              👁️ Vista Rápida
            </button>
          </div>
        </div>

        {/* Contenido */}
        <div className="product-content">
          {/* Código */}
          <p className="product-code">{product.code}</p>

          {/* Nombre */}
          <h3 className="product-name">{product.name}</h3>

          {/* Precio */}
          <div className="product-price">
            ${product.price.toLocaleString("es-CL")}
          </div>

          {/* Selector Tamaño (si es personalizable) */}
          {isPersonalizable && (
            <div className="size-selector">
              <label htmlFor={`size-${product.code}`} className="size-label">
                Tamaño:
              </label>
              <select
                id={`size-${product.code}`}
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="size-select"
                aria-label="Seleccionar tamaño"
              >
                <option value="S">Pequeño (S)</option>
                <option value="M">Mediano (M)</option>
                <option value="L">Grande (L)</option>
              </select>
            </div>
          )}

          {/* Mensaje personalizado */}
          {isPersonalizable && (
            <div className="personalization">
              <input
                type="text"
                placeholder="Mensaje especial (opcional)"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value.slice(0, 50))}
                maxLength="50"
                className="custom-message-input"
                aria-label="Mensaje personalizado"
              />
              <small className="character-count">
                {customMessage.length}/50
              </small>
            </div>
          )}

          {/* Botones de acción */}
          <div className="product-actions">
            {isPersonalizable && (
              <button
                className="btn-personalize"
                onClick={() => setShowQuickView(true)}
                data-testid={`btn-customize-${product.code}`}
                title="Abrir opciones de personalización"
              >
                ✨ Personalizar
              </button>
            )}
            <button
              className="btn-add-to-cart"
              onClick={handleAddToCart}
              data-testid={`btn-add-${product.code}`}
              title="Agregar al carrito"
            >
              🛒 Agregar
            </button>
          </div>
        </div>
      </article>

      {/* Quick View Modal */}
      {showQuickView && (
        <ProductQuickView
          product={product}
          onClose={() => setShowQuickView(false)}
          onAddToCart={onAddToCart}
        />
      )}
    </>
  );
}
