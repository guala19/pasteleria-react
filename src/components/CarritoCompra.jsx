// improvements/CarritoCompra.refactor.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { useCart } from '../context/CartContext.jsx';

/*
  Refactor notes:
  - Keep UI and logic separated.
  - Use small handlers and validate inputs.
  - Avoid inline anonymous functions inside JSX where it may cause re-renders.
*/

export default function CarritoCompraRefactor({ onCheckout }) {
  const { items = [], updateQty, removeIndex, totals = {} } = useCart();

  const handleCheckout = () => {
    if (!items.length) return;
    const total = totals.finalTotal ?? totals.subtotal ?? 0;
    onCheckout(total);
  };

  return (
    <div className="carrito-compra">
      <h3>Carrito ({items.length})</h3>
      {items.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <ul className="list-unstyled">
          {items.map((it, idx) => (
            <li key={it.id ?? idx} className="d-flex align-items-center mb-2">
              <div className="me-2" style={{ minWidth: 60 }}>
                <img src={it.img || '/placeholder.png'} alt={it.nombre || 'producto'} width={60} height={60} />
              </div>
              <div className="flex-grow-1">
                <div className="fw-bold">{it.nombre}</div>
                <div className="small text-muted">{it.descripcion || ''}</div>
              </div>
              <div className="d-flex align-items-center">
                <button
                  aria-label={`Disminuir cantidad de ${it.nombre}`}
                  onClick={() => updateQty(idx, Math.max(0, (it.cantidad || 1) - 1))}
                >
                  -
                </button>
                <div className="px-2">{it.cantidad}</div>
                <button aria-label={`Aumentar cantidad de ${it.nombre}`} onClick={() => updateQty(idx, (it.cantidad || 1) + 1)}>
                  +
                </button>
                <button className="btn btn-link ms-2" onClick={() => removeIndex(idx)}>
                  Quitar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-3 d-flex justify-content-between align-items-center">
        <div>
          <div className="small text-muted">Total:</div>
          <div className="h5">{totals.finalTotal ?? totals.subtotal ?? 0}</div>
        </div>
        <div>
          <button className="btn btn-primary me-2" disabled={!items.length} onClick={handleCheckout}>
            Pagar
          </button>
        </div>
      </div>
    </div>
  );
}

CarritoCompraRefactor.propTypes = {
  onCheckout: PropTypes.func
};

CarritoCompraRefactor.defaultProps = {
  onCheckout: () => {}
};