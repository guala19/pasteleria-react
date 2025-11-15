import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/cart-panel.css";

/**
 * CartPanel Component
 * 
 * Panel deslizable que muestra el carrito de compras con funcionalidades de:
 * - Visualización de items en carrito
 * - Ajuste de cantidades
 * - Aplicación de códigos promocionales
 * - Proceder al checkout
 * 
 * @component
 * @returns {React.ReactElement} Panel carrito deslizable
 */
export default function CartPanel() {
  const { items, updateQty, removeIndex, clear, totals, MONEDA, promo, setPromo, count } = useCart();
  const [promoCode, setPromoCode] = useState(promo?.codigo ?? "");
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoMessage, setPromoMessage] = useState("");
  const [promoError, setPromoError] = useState("");
  const navigate = useNavigate();

  const subtotal = totals?.subtotal ?? totals?.subTotal ?? 0;
  const descuentos = totals?.descuentos ?? totals?.discounts ?? 0;
  const total = totals?.total ?? subtotal - descuentos ?? subtotal;

  /**
   * Aplica código promocional con validación
   */
  function aplicarPromo() {
    // Validar que el código no esté vacío
    if (!promoCode.trim()) {
      setPromoError("Ingresa un código promocional");
      setPromoMessage("");
      return;
    }

    setPromoLoading(true);
    setPromoError("");
    setPromoMessage("");

    // Simular delay de validación (en realidad sería una API call)
    setTimeout(() => {
      try {
        // Validar longitud mínima
        if (promoCode.trim().length < 3) {
          throw new Error("El código debe tener al menos 3 caracteres");
        }

        setPromo(prev => ({ ...prev, codigo: promoCode.trim() }));
        setPromoMessage(`✅ Código "${promoCode}" aplicado correctamente`);
        setPromoCode("");
      } catch (error) {
        setPromoError(error.message || "Error al aplicar el código");
      } finally {
        setPromoLoading(false);
      }
    }, 500);
  }

  /**
   * Navega al checkout con validación
   */
  function handlePagar() {
    // Validar que el carrito no esté vacío
    if (items.length === 0) {
      setPromoError("Tu carrito está vacío");
      return;
    }

    closeCart();
    navigate("/checkout");
  }

  /**
   * Cierra el panel del carrito
   */
  function closeCart() { 
    const panel = document.querySelector(".cart-panel-redesigned");
    const backdrop = document.querySelector(".cart-backdrop");
    if (panel) {
      panel.classList.remove("active");
    }
    if (backdrop) {
      backdrop.classList.remove("active");
    }
  }

  function handleBackdropClick(e) {
    // Cierra si hacen clic en el backdrop
    if (e.target.classList.contains("cart-backdrop")) {
      closeCart();
    }
  }

  return (
    <>
      {/* Backdrop - cierra carrito al hacer clic afuera */}
      <div className="cart-backdrop" onClick={handleBackdropClick}></div>
      
      {/* Panel del carrito */}
      <div className="cart-panel-redesigned" id="panelCarrito">
        
        {/* HEADER */}
        <div className="cart-header">
          <h1 className="cart-title">Carrito</h1>
          <div className="cart-counter">{count}</div>
          <button className="cart-close-btn" onClick={closeCart} aria-label="Cerrar carrito">
            ✕
          </button>
        </div>

        {/* CONTENIDO - SCROLLABLE */}
        <div className="cart-content">
          
          {/* LISTA DE PRODUCTOS */}
          {items.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🍰</div>
              <p className="cart-empty-text">Tu carrito está vacío</p>
              <p className="cart-empty-subtext">¡Agrega algo dulce!</p>
            </div>
          ) : (
            <div className="cart-items-list">
              {items.map((it, i) => (
                <div key={i} className="cart-item">
                  {/* Imagen */}
                  <img 
                    src={it.img || "/img/cake.jpg"} 
                    alt={it.name} 
                    className="cart-item-image"
                  />
                  
                  {/* Información */}
                  <div className="cart-item-info">
                    <h3 className="cart-item-name">{it.name}</h3>
                    <p className="cart-item-meta">{it.size}{it.type ? ` · ${it.type}` : ""}</p>
                    <div className="cart-item-price">
                      {MONEDA.format((it.price ?? 0) * (it.qty ?? 1))}
                    </div>
                  </div>

                  {/* Controles */}
                  <div className="cart-item-controls">
                    <div className="quantity-control">
                      <button 
                        className="qty-btn" 
                        onClick={() => updateQty(i, Math.max(1, it.qty - 1))}
                        aria-label="Disminuir cantidad"
                      >
                        −
                      </button>
                      <span className="qty-display">{it.qty}</span>
                      <button 
                        className="qty-btn" 
                        onClick={() => updateQty(i, it.qty + 1)}
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      className="cart-item-remove" 
                      onClick={() => removeIndex(i)}
                      aria-label="Quitar producto"
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CÓDIGO PROMOCIONAL */}
          {items.length > 0 && (
            <div className="cart-promo-section">
              <label htmlFor="codigoPromo" className="cart-promo-label">Código promocional</label>
              <div className="cart-promo-input-group">
                <input 
                  id="codigoPromo" 
                  className="cart-promo-input" 
                  placeholder="FELICES50" 
                  value={promoCode} 
                  onChange={(e) => setPromoCode(e.target.value)}
                  aria-label="Ingresa código promocional"
                />
                <button className="cart-promo-btn" onClick={aplicarPromo}>
                  Aplicar
                </button>
              </div>
              {promo?.codigo && (
                <p className="cart-promo-active">
                  Código aplicado: <strong>{promo.codigo}</strong>
                </p>
              )}
            </div>
          )}
        </div>

        {/* FOOTER - TOTALES Y BOTÓN */}
        {items.length > 0 && (
          <div className="cart-footer">
            
            {/* RESUMEN */}
            <div className="cart-summary">
              <div className="cart-summary-row">
                <span className="cart-summary-label">Subtotal</span>
                <span className="cart-summary-value">{MONEDA.format(subtotal)}</span>
              </div>
              {descuentos > 0 && (
                <div className="cart-summary-row cart-discount">
                  <span className="cart-summary-label">Descuentos</span>
                  <span className="cart-summary-value">-{MONEDA.format(descuentos)}</span>
                </div>
              )}
              <div className="cart-summary-row cart-total">
                <span className="cart-summary-label">Total</span>
                <span className="cart-summary-value">{MONEDA.format(total)}</span>
              </div>
            </div>

            {/* BOTONES */}
            <div className="cart-actions">
              <button 
                className="cart-btn-primary" 
                onClick={handlePagar}
              >
                PAGAR
              </button>
              <button 
                className="cart-btn-secondary" 
                onClick={() => clear()}
              >
                Vaciar carrito
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

/**
 * PropTypes validation para CartPanel
 * Define los tipos de propiedades esperadas por el Context
 */
CartPanel.propTypes = {
  // El componente usa useCart() hook, por lo que sus tipos son:
  // items: PropTypes.arrayOf(PropTypes.object),
  // updateQty: PropTypes.func,
  // removeIndex: PropTypes.func,
  // clear: PropTypes.func,
  // totals: PropTypes.object,
  // MONEDA: PropTypes.any,
  // promo: PropTypes.object,
  // setPromo: PropTypes.func,
  // count: PropTypes.number,
};

CartPanel.defaultProps = {
  // Los valores por defecto vienen del Context CartContext
};

