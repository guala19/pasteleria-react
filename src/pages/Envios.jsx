import React, { useState, useEffect } from "react";
import EnviosTracker from "../components/EnviosTracker.jsx";
import { MONEDA } from "../utils/money.js";
import { Link } from "react-router-dom";

// 🌟 Simulación de datos de pedidos guardados (puedes reemplazarlo con una API real o localStorage)
const pedidosSimulados = [
  {
    orderId: "A1001",
    deliveryDate: "2025-10-20",
    total: 45900,
  },
  {
    orderId: "A1002",
    deliveryDate: "2025-10-22",
    total: 52300,
  },
];

export default function Envios() {
  const [pedidos, setPedidos] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // 🔹 Simula cargar pedidos desde el almacenamiento local o servidor
  useEffect(() => {
    // En un caso real:
    // const storedOrders = JSON.parse(localStorage.getItem("pedidos")) || [];
    setPedidos(pedidosSimulados);
  }, []);

  // 🔹 Si no hay pedidos registrados
  if (pedidos.length === 0) {
    return (
      <main className="container my-5 text-center">
        <h2 className="mb-3">🚚 Seguimiento de Envíos</h2>
        <div className="alert alert-info">
          Aún no tienes pedidos en tránsito. Realiza una compra para ver su estado.
        </div>
        <Link to="/catalogo" className="btn btn-primary">
          Ir al Catálogo
        </Link>
      </main>
    );
  }

  // 🔹 Si el usuario seleccionó un pedido, mostrar su tracking
  if (selectedOrder) {
    return (
      <main className="container my-5">
        <h2 className="text-center mb-4">📦 Seguimiento del Pedido</h2>
        <EnviosTracker
          orderId={selectedOrder.orderId}
          deliveryDate={selectedOrder.deliveryDate}
        />
        <div className="card mt-4 p-3 border-info shadow-sm">
          <h5>Detalle del Pedido</h5>
          <p>
            Total: <strong>{MONEDA.format(selectedOrder.total)}</strong>
          </p>
          <p>Fecha estimada de entrega: {selectedOrder.deliveryDate}</p>
          <button
            className="btn btn-outline-secondary mt-2"
            onClick={() => setSelectedOrder(null)}
          >
            ← Volver a la lista
          </button>
        </div>
      </main>
    );
  }

  // 🔹 Vista de lista de pedidos
  return (
    <main className="container my-5">
      <h2 className="text-center mb-4">🚛 Seguimiento de Envíos</h2>
      <p className="text-muted text-center">
        Aquí puedes revisar el estado actual de tus pedidos confirmados.
      </p>

      <div className="row">
        {pedidos.map((pedido) => (
          <div key={pedido.orderId} className="col-md-6 col-lg-4 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">Pedido #{pedido.orderId}</h5>
                <p className="mb-1">
                  <strong>Total:</strong> {MONEDA.format(pedido.total)}
                </p>
                <p className="mb-1">
                  <strong>Entrega:</strong> {pedido.deliveryDate}
                </p>
                <button
                  className="btn btn-outline-success mt-2 w-100"
                  onClick={() => setSelectedOrder(pedido)}
                >
                  Ver Seguimiento
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
