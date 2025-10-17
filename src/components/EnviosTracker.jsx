// src/components/EnviosTracker.jsx
import React, { useState, useEffect } from "react";

const statuses = [
  { name: "Confirmado", description: "Pedido recibido y pago procesado. Boleta emitida." },
  { name: "En Preparación", description: "Tu pastel está siendo horneado por nuestros maestros pasteleros." },
  { name: "Control de Calidad", description: "Revisión final y empaque seguro. Preparando para envío." },
  { name: "En Reparto", description: "Tu pedido está en camino a tu domicilio." },
  { name: "Entregado", description: "¡Disfruta de tu Mil Sabores! Pedido finalizado." },
];

export default function EnviosTracker({ orderId, deliveryDate }) {
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);

  // Simula el avance de los estados del pedido cada 5 segundos
  useEffect(() => {
    if (currentStatusIndex < statuses.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStatusIndex((prev) => prev + 1);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentStatusIndex]);

  const currentStatus = statuses[currentStatusIndex];
  const progressPercent = ((currentStatusIndex + 1) / statuses.length) * 100;

  return (
    <div className="mt-4 p-4 border rounded bg-white shadow-sm">
      <h3 className="text-center mb-4 text-primary">
        🚚 Seguimiento del Pedido #{orderId}
      </h3>

      <p className="fw-bold text-info">
        Fecha estimada de entrega: <span>{deliveryDate}</span>
      </p>

      {/* Estado actual */}
      <div className="alert alert-warning">
        <strong>Estado actual:</strong> {currentStatus.name}
      </div>
      <p className="text-muted">{currentStatus.description}</p>

      {/* Barra de progreso */}
      <div className="progress mt-3" style={{ height: "25px" }}>
        <div
          className="progress-bar progress-bar-striped bg-success"
          role="progressbar"
          style={{ width: `${progressPercent}%` }}
        >
          {currentStatus.name}
        </div>
      </div>
    </div>
  );
}
