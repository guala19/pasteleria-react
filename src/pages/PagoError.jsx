import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/pago-error.css';

export default function PagoError() {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (location.state?.order) {
      setOrder(location.state.order);
    } else {
      // Si no hay orden en el estado, redirigir al carrito
      navigate('/carrito');
    }
  }, [location, navigate]);

  const handleRetry = () => {
    // Volver al checkout pero manteniendo los items del carrito
    navigate('/checkout', { replace: true });
  };

  if (!order) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="pago-error-container">
      <div className="row justify-content-center">
        <div className="col-lg-7">
          {/* Header de error */}
          <div className="error-header text-center mb-5">
            <div className="error-icon mb-3">
              <i className="bi bi-x-circle"></i>
            </div>
            <h1 className="display-5 fw-bold mb-3">¡Error en el Pago!</h1>
            <p className="lead text-muted">
              No pudimos procesar tu pago. Por favor, intenta de nuevo.
            </p>
          </div>

          {/* Tarjeta de orden */}
          <div className="card mb-4 shadow-sm border-danger">
            <div className="card-body p-5">
              <div className="alert alert-warning mb-4" role="alert">
                <i className="bi bi-exclamation-triangle"></i>
                <strong> Pago Rechazado</strong>
                <p className="mb-0 mt-2 small">
                  La transacción no pudo completarse. Esto puede deberse a fondos insuficientes, datos incorrectos o problemas temporales con el servidor.
                </p>
              </div>

              <hr className="my-4" />

              {/* Información del Cliente */}
              <div className="mb-4">
                <h6 className="fw-bold mb-3">Información del Cliente</h6>
                <div className="row">
                  <div className="col-md-6">
                    <p className="small text-muted mb-1">Nombre</p>
                    <p className="fw-bold">{order.cliente}</p>
                  </div>
                  <div className="col-md-6">
                    <p className="small text-muted mb-1">Email</p>
                    <p className="fw-bold">{order.email}</p>
                  </div>
                </div>
              </div>

              <hr className="my-4" />

              {/* Dirección de Entrega */}
              <div className="mb-4">
                <h6 className="fw-bold mb-3">
                  <i className="bi bi-geo-alt"></i> Dirección de Entrega
                </h6>
                <p className="mb-1 fw-bold">{order.direccion}</p>
                <p className="mb-0">{order.ciudad}, {order.codigoPostal}</p>
              </div>

              <hr className="my-4" />

              {/* Detalles de la Orden */}
              <div className="mb-4">
                <h6 className="fw-bold mb-3">Productos</h6>
                <div className="order-items">
                  {order.items.map((item) => (
                    <div key={item.code} className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
                      <div className="d-flex align-items-center">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="img-thumbnail me-3"
                          style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                        />
                        <div>
                          <h6 className="mb-1">{item.name}</h6>
                          <small className="text-muted">
                            Cantidad: {item.quantity}
                          </small>
                        </div>
                      </div>
                      <div className="text-end">
                        <p className="fw-bold mb-0">
                          ${(item.price * item.quantity).toLocaleString('es-CL')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="my-4" />

              {/* Total */}
              <div className="text-end mb-4">
                <p className="text-muted mb-1">Monto a Pagar</p>
                <h4 className="text-danger fw-bold">
                  ${order.total.toLocaleString('es-CL')}
                </h4>
              </div>
            </div>
          </div>

          {/* Motivos comunes */}
          <div className="card bg-light border-0 mb-4">
            <div className="card-body">
              <h6 className="fw-bold mb-3">Posibles Motivos del Error:</h6>
              <ul className="small mb-0">
                <li className="mb-2">Fondos insuficientes en la tarjeta</li>
                <li className="mb-2">Datos de la tarjeta incorrectos o expirada</li>
                <li className="mb-2">Problemas temporales con el servidor de pagos</li>
                <li className="mb-2">Tarjeta bloqueada por el banco</li>
                <li>Exceso de intentos de pago en corto tiempo</li>
              </ul>
            </div>
          </div>

          {/* Recomendaciones */}
          <div className="alert alert-info mb-4">
            <i className="bi bi-lightbulb"></i>
            <strong> Qué puedes hacer:</strong>
            <ul className="mb-0 mt-2 small">
              <li>Verifica que los datos de tu tarjeta sean correctos</li>
              <li>Contacta con tu banco para desbloquear la transacción</li>
              <li>Intenta con otro método de pago</li>
              <li>Espera unos minutos e intenta de nuevo</li>
            </ul>
          </div>

          {/* Botones */}
          <div className="d-grid gap-2 mb-4">
            <button
              className="btn btn-danger btn-lg"
              onClick={handleRetry}
            >
              <i className="bi bi-arrow-clockwise"></i> Intentar de Nuevo
            </button>
            <button
              className="btn btn-outline-secondary btn-lg"
              onClick={() => navigate('/carrito')}
            >
              <i className="bi bi-cart"></i> Volver al Carrito
            </button>
            <button
              className="btn btn-light btn-lg"
              onClick={() => navigate('/')}
            >
              <i className="bi bi-house"></i> Volver al Inicio
            </button>
          </div>

          {/* Soporte */}
          <div className="card bg-primary text-white border-0">
            <div className="card-body text-center">
              <h6 className="fw-bold mb-2">¿Necesitas Ayuda?</h6>
              <p className="small mb-2">
                Nuestro equipo de soporte está disponible para ayudarte
              </p>
              <p className="small mb-0">
                <strong>Email:</strong> soporte@pasteleria1000sabores.cl<br />
                <strong>Teléfono:</strong> +56 9 1234 5678<br />
                <strong>Horario:</strong> Lunes a Viernes 9:00 - 18:00
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
