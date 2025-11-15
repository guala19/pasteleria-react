import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/checkout.css';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    notas: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Si el carrito está vacío, redirigir
    if (cart.length === 0) {
      navigate('/carrito');
    }
  }, [cart, navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!formData.email.trim()) newErrors.email = 'El email es requerido';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email no válido';
    }
    if (!formData.telefono.trim()) newErrors.telefono = 'El teléfono es requerido';
    if (!formData.direccion.trim()) newErrors.direccion = 'La dirección es requerida';
    if (!formData.ciudad.trim()) newErrors.ciudad = 'La ciudad es requerida';
    if (!formData.codigoPostal.trim()) newErrors.codigoPostal = 'El código postal es requerido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    // Simular procesamiento de pago
    setTimeout(() => {
      const order = {
        id: Math.random().toString(36).substr(2, 9),
        fecha: new Date().toLocaleString('es-CL'),
        cliente: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        direccion: formData.direccion,
        ciudad: formData.ciudad,
        codigoPostal: formData.codigoPostal,
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        notas: formData.notas
      };

      // Guardar orden en localStorage
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));

      // Simular decisión de pago exitoso o fallido (80% exitoso)
      const isPaid = Math.random() > 0.2;

      setIsProcessing(false);

      if (isPaid) {
        clearCart();
        navigate('/pago-correcto', { state: { order } });
      } else {
        navigate('/pago-error', { state: { order } });
      }
    }, 2000);
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const envio = subtotal > 50000 ? 0 : 5000;
  const total = subtotal + envio;

  return (
    <div className="checkout-container">
      <h1 className="mb-4">Finalizar Compra</h1>

      <div className="row g-4">
        {/* Formulario */}
        <div className="col-lg-7">
          <div className="card">
            <div className="card-body p-4">
              <h5 className="card-title mb-4">Información de Entrega</h5>

              <form onSubmit={handleSubmit}>
                {/* Nombre */}
                <div className="mb-3">
                  <label className="form-label">Nombre Completo *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Juan Pérez"
                  />
                  {errors.nombre && (
                    <div className="invalid-feedback d-block">{errors.nombre}</div>
                  )}
                </div>

                {/* Email y Teléfono */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="correo@ejemplo.com"
                    />
                    {errors.email && (
                      <div className="invalid-feedback d-block">{errors.email}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Teléfono *</label>
                    <input
                      type="tel"
                      className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="+56 9 1234 5678"
                    />
                    {errors.telefono && (
                      <div className="invalid-feedback d-block">{errors.telefono}</div>
                    )}
                  </div>
                </div>

                {/* Dirección */}
                <div className="mb-3">
                  <label className="form-label">Dirección *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.direccion ? 'is-invalid' : ''}`}
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    placeholder="Calle y número"
                  />
                  {errors.direccion && (
                    <div className="invalid-feedback d-block">{errors.direccion}</div>
                  )}
                </div>

                {/* Ciudad y Código Postal */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Ciudad *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.ciudad ? 'is-invalid' : ''}`}
                      name="ciudad"
                      value={formData.ciudad}
                      onChange={handleChange}
                      placeholder="Santiago"
                    />
                    {errors.ciudad && (
                      <div className="invalid-feedback d-block">{errors.ciudad}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Código Postal *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.codigoPostal ? 'is-invalid' : ''}`}
                      name="codigoPostal"
                      value={formData.codigoPostal}
                      onChange={handleChange}
                      placeholder="8320000"
                    />
                    {errors.codigoPostal && (
                      <div className="invalid-feedback d-block">{errors.codigoPostal}</div>
                    )}
                  </div>
                </div>

                {/* Notas */}
                <div className="mb-3">
                  <label className="form-label">Notas Especiales (Opcional)</label>
                  <textarea
                    className="form-control"
                    name="notas"
                    value={formData.notas}
                    onChange={handleChange}
                    placeholder="Instrucciones especiales para la entrega..."
                    rows="3"
                  ></textarea>
                </div>

                {/* Botones */}
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Procesando...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-credit-card"></i> Proceder al Pago
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/carrito')}
                    disabled={isProcessing}
                  >
                    Volver al Carrito
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Resumen de Orden */}
        <div className="col-lg-5">
          <div className="card sticky-top" style={{ top: '100px' }}>
            <div className="card-body p-4">
              <h5 className="card-title mb-4">Resumen de Compra</h5>

              {/* Items */}
              <div className="checkout-items mb-4">
                {cart.map((item) => (
                  <div key={item.code} className="checkout-item d-flex justify-content-between mb-3 pb-3 border-bottom">
                    <div>
                      <h6 className="mb-1">{item.name}</h6>
                      <small className="text-muted">
                        {item.quantity} x ${item.price.toLocaleString('es-CL')}
                      </small>
                    </div>
                    <div className="text-end">
                      <strong>${(item.price * item.quantity).toLocaleString('es-CL')}</strong>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totales */}
              <div className="checkout-totals">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <strong>${subtotal.toLocaleString('es-CL')}</strong>
                </div>
                <div className="d-flex justify-content-between mb-3 pb-3 border-bottom">
                  <span>Envío:</span>
                  <strong className={envio === 0 ? 'text-success' : ''}>
                    {envio === 0 ? (
                      <span>¡Gratis! <small className="text-success">(Compra mayor a $50.000)</small></span>
                    ) : (
                      `$${envio.toLocaleString('es-CL')}`
                    )}
                  </strong>
                </div>
                <div className="d-flex justify-content-between checkout-total">
                  <span className="fw-bold">Total:</span>
                  <strong className="fs-5 text-danger">${total.toLocaleString('es-CL')}</strong>
                </div>
              </div>

              {/* Información */}
              <div className="mt-4 pt-4 border-top">
                <p className="small text-muted mb-2">
                  <i className="bi bi-shield-check"></i> Pago seguro 100% verificado
                </p>
                <p className="small text-muted mb-2">
                  <i className="bi bi-truck"></i> Envío a todo el país
                </p>
                <p className="small text-muted">
                  <i className="bi bi-arrow-counterclockwise"></i> Compras pueden devolverse
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
