import React, { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { generateOrderId, MONEDA } from "../utils/money.js";
import EnviosTracker from "../components/EnviosTracker.jsx";
import { Link, useNavigate } from "react-router-dom";

export default function Pedidos() {
  const { items, totals, clear } = useCart();
  const navigate = useNavigate();

  // Estado local
  const [activeOrder, setActiveOrder] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // 🔹 Si no hay productos
  if (items.length === 0 && !activeOrder) {
    return (
      <main className="container my-5 text-center">
        <h2 className="mb-3">🧁 No hay productos en tu carrito</h2>
        <p>Agrega algunos productos antes de realizar tu pedido.</p>
        <Link to="/catalogo" className="btn btn-primary mt-3">
          Ver Catálogo
        </Link>
      </main>
    );
  }

  // 🔹 Confirmar pedido
  const handleConfirmOrder = (e) => {
    e.preventDefault();

    if (!deliveryDate) {
      alert("Por favor selecciona una fecha de entrega preferida.");
      return;
    }

    setIsProcessing(true);
    const orderId = generateOrderId();

    // Simula el proceso de pago
    setTimeout(() => {
      const newOrder = {
        orderId,
        deliveryDate,
        total: totals.finalTotal,
        createdAt: new Date().toISOString(),
      };

      // 🔸 Guardar en localStorage (para /envios)
      const existingOrders =
        JSON.parse(localStorage.getItem("pedidos")) || [];
      localStorage.setItem(
        "pedidos",
        JSON.stringify([...existingOrders, newOrder])
      );

      setActiveOrder(newOrder);
      clear();
      setIsProcessing(false);
      alert(`✅ Pedido #${orderId} confirmado. Boleta generada con éxito.`);
    }, 1500);
  };

  // 🔹 Pedido confirmado → muestra seguimiento
  if (activeOrder) {
    return (
      <main className="container my-5">
        <h2 className="text-center text-success mb-4">
          ✅ ¡Pedido Confirmado!
        </h2>

        <EnviosTracker
          orderId={activeOrder.orderId}
          deliveryDate={activeOrder.deliveryDate}
        />

        <div className="card mt-4 p-3 border-success shadow-sm">
          <h4>Detalle del Pedido</h4>
          <p>
            Total Pagado:{" "}
            <strong>{MONEDA.format(activeOrder.total)}</strong>
          </p>
          <p>Fecha de entrega: {activeOrder.deliveryDate}</p>

          <div className="d-flex gap-2 mt-3">
            <button
              className="btn btn-outline-success w-50"
              onClick={() => navigate("/envios")}
            >
              🚚 Ver Seguimiento
            </button>
            <Link to="/catalogo" className="btn btn-outline-secondary w-50">
              🛒 Seguir Comprando
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // 🔹 Formulario de pago y envío
  return (
    <main className="container my-5">
      <h2 className="text-center mb-4">💳 Finalizar Compra</h2>

      <form onSubmit={handleConfirmOrder}>
        <div className="row">
          {/* Columna de resumen */}
          <div className="col-lg-5 order-lg-2">
            <div className="card p-3 shadow-sm mb-4">
              <h4>Resumen del Pedido</h4>
              <div className="d-flex justify-content-between">
                <span>Subtotal</span>
                <strong>{MONEDA.format(totals.subtotal)}</strong>
              </div>
              <div className="d-flex justify-content-between">
                <span>Descuentos</span>
                <strong className="text-success">
                  -{MONEDA.format(totals.descuentos)}
                </strong>
              </div>
              <div className="d-flex justify-content-between">
                <span>Envío</span>
                <strong>{MONEDA.format(totals.shippingCost)}</strong>
              </div>
              <hr />
              <div className="d-flex justify-content-between fs-5">
                <span>Total Final</span>
                <strong className="text-danger">
                  {MONEDA.format(totals.finalTotal)}
                </strong>
              </div>
            </div>
          </div>

          {/* Columna de formulario */}
          <div className="col-lg-7 order-lg-1">
            <div className="card p-4 shadow-sm mb-4">
              <h4>1. Fecha de Entrega</h4>
              <label htmlFor="deliveryDate" className="form-label mt-2">
                Selecciona tu fecha de entrega:
              </label>
              <input
                type="date"
                id="deliveryDate"
                className="form-control"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                required
              />

              <h4 className="mt-4">2. Datos de Envío y Pago</h4>
              <input
                className="form-control mb-2"
                placeholder="Nombre completo"
                required
              />
              <input
                className="form-control mb-2"
                placeholder="Dirección de envío"
                required
              />
              <input
                className="form-control mb-4"
                placeholder="Número de tarjeta (16 dígitos)"
                maxLength={16}
                required
              />

              <button
                type="submit"
                className="btn btn-success btn-lg w-100"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>
                    Procesando pago...
                  </>
                ) : (
                  "Pagar y Confirmar Pedido"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
