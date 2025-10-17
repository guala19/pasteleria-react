import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./context/CartContext";

export default function CartPanel() {
  const { items, updateQty, removeIndex, clear, totals, MONEDA, promo, setPromo, count } = useCart();
  const [promoCode, setPromoCode] = useState(promo?.codigo ?? "");
  const navigate = useNavigate();

  const subtotal = totals?.subtotal ?? totals?.subTotal ?? 0;
  const descuentos = totals?.descuentos ?? totals?.discounts ?? 0;
  const total = totals?.total ?? subtotal - descuentos ?? subtotal;

  function aplicarPromo() { setPromo(prev => ({ ...prev, codigo: promoCode })); }
  function handlePagar() { navigate("/pedidos"); }

  return (
    <div className="offcanvas offcanvas-end" tabIndex="-1" id="panelCarrito" aria-labelledby="tituloCarrito">
      <div className="offcanvas-header">
        <h2 className="offcanvas-title h4" id="tituloCarrito">Carrito ({count})</h2>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Cerrar"></button>
      </div>
      <div className="offcanvas-body d-flex flex-column">
        <ul className="list-unstyled vstack gap-3">
          {items.length === 0 && <li className="text-muted">No hay productos en el carrito.</li>}
          {items.map((it, i) => (
            <li key={i} className="d-flex gap-2 align-items-center">
              <img src={it.img || "/img/cake.jpg"} alt={it.name} width="64" className="rounded" />
              <div className="flex-grow-1">
                <div className="fw-bold">{it.name}</div>
                <div className="small text-muted">{it.size} · {it.type}</div>
                <div className="d-flex align-items-center gap-2 mt-1">
                  <input
                    type="number"
                    min="1"
                    value={it.qty}
                    onChange={(e) => updateQty(i, Math.max(1, Number(e.target.value || 1)))}
                    style={{ width: 72 }}
                    className="form-control form-control-sm"
                  />
                  <div className="ms-auto fw-bold">{MONEDA.format((it.price ?? 0) * (it.qty ?? 1))}</div>
                </div>
              </div>
              <button className="btn btn-link btn-sm text-danger" onClick={() => removeIndex(i)} aria-label="Eliminar">Eliminar</button>
            </li>
          ))}
        </ul>

        <div className="mt-3">
          <label className="form-label mb-1" htmlFor="codigoPromo">Código promocional</label>
          <div className="d-flex gap-2">
            <input id="codigoPromo" className="form-control" placeholder="FELICES50" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
            <button className="btn btn-outline-secondary" onClick={aplicarPromo}>Aplicar</button>
          </div>
          <p className="text-muted small mt-1">Código actual: <strong>{promo?.codigo}</strong></p>
        </div>

        <div className="mt-3 border-top pt-2">
          <div className="d-flex justify-content-between"><span>Subtotal</span><strong>{MONEDA.format(subtotal)}</strong></div>
          <div className="d-flex justify-content-between"><span>Descuentos</span><strong className="text-danger">-{MONEDA.format(descuentos)}</strong></div>
          <div className="d-flex justify-content-between fs-5"><span>Total</span><strong>{MONEDA.format(total)}</strong></div>
        </div>

        <div className="mt-3 d-flex gap-2">
          <button id="btnPagar" className="btn btn-dark w-100" onClick={handlePagar}>Ir a pagar</button>
          <button className="btn btn-outline-danger" onClick={() => clear()}>Vaciar</button>
        </div>
      </div>
    </div>
  );
}
