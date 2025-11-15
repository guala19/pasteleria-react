import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/pago-correcto.css';

export default function PagoCorrecto() {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (location.state?.order) {
      setOrder(location.state.order);
    } else {
      // Si no hay orden en el estado, redirigir al inicio
      navigate('/');
    }
  }, [location, navigate]);

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
    <div className="pago-correcto-container">
      <div className="row justify-content-center">
        <div className="col-lg-7">
          {/* Header de éxito */}
          <div className="success-header text-center mb-5">
            <div className="success-icon mb-3">
              <i className="bi bi-check-circle"></i>
            </div>
            <h1 className="display-5 fw-bold mb-3">¡Compra Exitosa!</h1>
            <p className="lead text-muted">
              Tu pedido ha sido procesado correctamente
            </p>
          </div>

          {/* Tarjeta de orden */}
          <div className="card mb-4 shadow-sm">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <h5 className="text-muted mb-2">Número de Orden</h5>
                <h3 className="fw-bold text-primary"># {order.id.toUpperCase()}</h3>
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
                  <div className="col-md-6">
                    <p className="small text-muted mb-1">Teléfono</p>
                    <p className="fw-bold">{order.telefono}</p>
                  </div>
                  <div className="col-md-6">
                    <p className="small text-muted mb-1">Fecha</p>
                    <p className="fw-bold">{order.fecha}</p>
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
                <p className="mb-1">{order.ciudad}, {order.codigoPostal}</p>
                {order.notas && (
                  <>
                    <hr className="my-2" />
                    <small className="text-muted">
                      <strong>Notas:</strong> {order.notas}
                    </small>
                  </>
                )}
              </div>

              <hr className="my-4" />

              {/* Detalles de la Orden */}
              <div className="mb-4">
                <h6 className="fw-bold mb-3">Productos Ordenados</h6>
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
                        <small className="text-muted">
                          ${item.price.toLocaleString('es-CL')} c/u
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="my-4" />

              {/* Total */}
              <div className="text-end mb-4">
                <p className="text-muted mb-1">Total Pagado</p>
                <h4 className="text-danger fw-bold">
                  ${order.total.toLocaleString('es-CL')}
                </h4>
              </div>
            </div>
          </div>

          {/* Información adicional */}
          <div className="alert alert-info mb-4">
            <i className="bi bi-info-circle"></i>
            <strong> Próximos Pasos:</strong>
            <ul className="mb-0 mt-2">
              <li>Recibirás un email de confirmación en breve</li>
              <li>Tu pedido será preparado y enviado lo antes posible</li>
              <li>Podrás rastrear tu envío desde tu cuenta</li>
            </ul>
          </div>

          {/* Botones */}
          <div className="d-grid gap-2 mb-4">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/pedidos')}
            >
              <i className="bi bi-bag-check"></i> Ver Mis Pedidos
            </button>
            <button
              className="btn btn-outline-secondary btn-lg"
              onClick={() => navigate('/catalogo')}
            >
              <i className="bi bi-shop"></i> Continuar Comprando
            </button>
            <button
              className="btn btn-light btn-lg"
              onClick={() => navigate('/')}
            >
              <i className="bi bi-house"></i> Volver al Inicio
            </button>
          </div>

          {/* Soporte */}
          <div className="card bg-light border-0">
            <div className="card-body text-center">
              <h6 className="fw-bold mb-2">¿Preguntas?</h6>
              <p className="small mb-2">
                Puedes contactar a nuestro equipo de soporte
              </p>
              <p className="small mb-0">
                <strong>Email:</strong> soporte@pasteleria1000sabores.cl<br />
                <strong>Teléfono:</strong> +56 9 1234 5678
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
