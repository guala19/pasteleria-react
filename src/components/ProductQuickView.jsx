import React, { useState } from "react";

export default function ProductQuickView({ product, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState("M");
  const [customMessage, setCustomMessage] = useState("");

  const isPersonalizable =
    product.type === "cuadrada" || product.type === "circular";

  const sizeMultiplier = {
    S: 0.8,
    M: 1.0,
    L: 1.2,
  };

  const finalPrice = Math.round(product.price * sizeMultiplier[selectedSize]);

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

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, customMessage);
    onClose();
  };

  return (
    <div className="quick-view-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="qv-title">
      <div className="quick-view-modal" onClick={(e) => e.stopPropagation()}>
        <button className="btn-close-modal" onClick={onClose} aria-label="Cerrar">
          ✕
        </button>

        <div className="qv-content">
          {/* Galería */}
          <div className="qv-gallery">
            <img
              src={product.img}
              alt={product.name}
              className="qv-image"
            />
          </div>

          {/* Detalles */}
          <div className="qv-details">
            {/* Código */}
            <p className="qv-code">{product.code}</p>

            {/* Nombre */}
            <h2 id="qv-title" className="qv-title">
              {product.name}
            </h2>

            {/* Badges */}
            <div className="qv-badges">
              {getDietBadges().map((badge, idx) => (
                <span key={idx} className="qv-badge">
                  {badge === "Sin Azúcar" && "🍫"}
                  {badge === "Sin Gluten" && "🌾"}
                  {badge === "Vegano" && "🌱"}
                  {badge}
                </span>
              ))}
              {getShapeLabel() && (
                <span className="qv-badge qv-shape">
                  {getShapeLabel() === "Cuadrada" && "⬜"}
                  {getShapeLabel() === "Circular" && "⭕"}
                  {getShapeLabel()}
                </span>
              )}
            </div>

            {/* Descripción */}
            {product.description && (
              <p className="qv-description">{product.description}</p>
            )}

            {/* Ingredientes */}
            {product.ingredients && (
              <div className="qv-ingredients">
                <h4>Ingredientes:</h4>
                <ul>
                  {product.ingredients.map((ing, idx) => (
                    <li key={idx}>{ing}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Selector Tamaño */}
            {isPersonalizable && (
              <div className="qv-size-selector">
                <label className="qv-label">Tamaño:</label>
                <div className="size-options">
                  {["S", "M", "L"].map((size) => (
                    <button
                      key={size}
                      className={`size-option ${selectedSize === size ? "active" : ""}`}
                      onClick={() => setSelectedSize(size)}
                      aria-pressed={selectedSize === size}
                    >
                      {size === "S" && "Pequeño"}
                      {size === "M" && "Mediano"}
                      {size === "L" && "Grande"}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Personalización */}
            {isPersonalizable && (
              <div className="qv-personalization">
                <label className="qv-label">Mensaje personalizado:</label>
                <div className="message-input-group">
                  <input
                    type="text"
                    placeholder="Escribe tu mensaje especial aquí..."
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value.slice(0, 100))}
                    maxLength="100"
                    className="qv-message-input"
                    aria-label="Mensaje personalizado"
                  />
                  <small className="character-count">
                    {customMessage.length}/100
                  </small>
                </div>
                {customMessage && (
                  <div className="message-preview">
                    <strong>Preview:</strong> "{customMessage}"
                  </div>
                )}
              </div>
            )}

            {/* Precio final */}
            <div className="qv-pricing">
              <div className="price-base">
                Precio base: ${product.price.toLocaleString("es-CL")}
              </div>
              {selectedSize !== "M" && (
                <div className="price-size-adjustment">
                  Ajuste por tamaño: {selectedSize === "S" ? "-20%" : "+20%"}
                </div>
              )}
              <div className="price-final">
                Subtotal: ${finalPrice.toLocaleString("es-CL")}
              </div>
            </div>

            {/* CTA */}
            <button
              className="btn-qv-add-to-cart"
              onClick={handleAddToCart}
            >
              🛒 Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
