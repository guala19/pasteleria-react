import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/mi-perfil.css';

/**
 * MiPerfil Component
 * 
 * Página personal del cliente con diseño minimalista y elegante.
 * Permite editar información personal, direcciones, ver pedidos y gestionar seguridad.
 * 
 * @component
 * @returns {React.ReactElement} Página de perfil del cliente
 */
export default function MiPerfil() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, loading } = useAuth();
  const [activeSection, setActiveSection] = useState('perfil');
  
  // Estados para el formulario de perfil
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
  });
  
  // Estados para cambio de contraseña
  const [passwordData, setPasswordData] = useState({
    actual: '',
    nueva: '',
    confirmar: '',
  });
  
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Redirigir a login si no está autenticado
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  // Cargar datos del usuario
  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.name || '',
        email: user.email || '',
        telefono: user.phone || '',
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar mensajes al cambiar input
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar mensajes al cambiar input
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.nombre.trim()) {
      setErrorMessage('El nombre no puede estar vacío');
      return;
    }
    
    if (!formData.telefono.trim()) {
      setErrorMessage('El teléfono no puede estar vacío');
      return;
    }
    
    // Simular guardado
    setTimeout(() => {
      setSuccessMessage('✓ Cambios guardados exitosamente');
      setErrorMessage('');
    }, 500);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!passwordData.actual.trim()) {
      setErrorMessage('Debes ingresar tu contraseña actual');
      return;
    }
    
    if (passwordData.nueva.length < 6) {
      setErrorMessage('La nueva contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    if (passwordData.nueva !== passwordData.confirmar) {
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }
    
    // Simular cambio de contraseña
    setTimeout(() => {
      setSuccessMessage('✓ Contraseña actualizada exitosamente');
      setErrorMessage('');
      setPasswordData({ actual: '', nueva: '', confirmar: '' });
    }, 500);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return <div className="mi-perfil-page"><div className="text-center p-5">Cargando...</div></div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="mi-perfil-page">
      <div className="mi-perfil-container">
        {/* Título Principal */}
        <div className="perfil-header">
          <h1 className="perfil-title">Mi Cuenta</h1>
          <p className="perfil-subtitle">Bienvenido, <strong>{user?.name}</strong></p>
        </div>

        {/* Tarjeta de Cuenta */}
        <div className="account-card">
          {/* Columna Izquierda: Navegación */}
          <aside className="account-sidebar">
            <nav className="account-nav">
              <ul className="nav-list">
                <li>
                  <button
                    className={`nav-link ${activeSection === 'perfil' ? 'active' : ''}`}
                    onClick={() => setActiveSection('perfil')}
                  >
                    <span className="nav-icon">👤</span>
                    <span className="nav-text">Mi Perfil</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`nav-link ${activeSection === 'direcciones' ? 'active' : ''}`}
                    onClick={() => setActiveSection('direcciones')}
                  >
                    <span className="nav-icon">📍</span>
                    <span className="nav-text">Mis Direcciones</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`nav-link ${activeSection === 'pedidos' ? 'active' : ''}`}
                    onClick={() => setActiveSection('pedidos')}
                  >
                    <span className="nav-icon">📦</span>
                    <span className="nav-text">Mis Pedidos</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`nav-link ${activeSection === 'seguridad' ? 'active' : ''}`}
                    onClick={() => setActiveSection('seguridad')}
                  >
                    <span className="nav-icon">🔒</span>
                    <span className="nav-text">Seguridad</span>
                  </button>
                </li>
                <li className="nav-divider"></li>
                <li>
                  <button
                    className="nav-link nav-logout"
                    onClick={handleLogout}
                  >
                    <span className="nav-icon">🚪</span>
                    <span className="nav-text">Cerrar Sesión</span>
                  </button>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Columna Derecha: Contenido */}
          <main className="account-content">
            {/* Sección: Mi Perfil */}
            {activeSection === 'perfil' && (
              <section className="content-section">
                <h2 className="section-title">Detalles Personales</h2>
                
                {successMessage && (
                  <div className="alert alert-success">{successMessage}</div>
                )}
                
                {errorMessage && (
                  <div className="alert alert-error">{errorMessage}</div>
                )}

                <form className="perfil-form" onSubmit={handleSaveProfile}>
                  <div className="form-group">
                    <label htmlFor="nombre" className="form-label">Nombre Completo</label>
                    <input
                      id="nombre"
                      type="text"
                      name="nombre"
                      className="form-input"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      className="form-input"
                      value={formData.email}
                      disabled
                      title="No puedes cambiar tu correo directamente"
                    />
                    <small className="form-hint">El email no puede ser modificado por seguridad</small>
                  </div>

                  <div className="form-group">
                    <label htmlFor="telefono" className="form-label">Teléfono</label>
                    <input
                      id="telefono"
                      type="tel"
                      name="telefono"
                      className="form-input"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      placeholder="Tu número de teléfono"
                    />
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                      Guardar Cambios
                    </button>
                  </div>
                </form>
              </section>
            )}

            {/* Sección: Mis Direcciones */}
            {activeSection === 'direcciones' && (
              <section className="content-section">
                <h2 className="section-title">Mis Direcciones</h2>
                <div className="placeholder-content">
                  <p>Aquí verás tus direcciones guardadas.</p>
                  <p className="text-muted">Esta funcionalidad estará disponible pronto.</p>
                </div>
              </section>
            )}

            {/* Sección: Mis Pedidos */}
            {activeSection === 'pedidos' && (
              <section className="content-section">
                <h2 className="section-title">Mis Pedidos</h2>
                <div className="placeholder-content">
                  <p>Aquí verás el historial de tus pedidos.</p>
                  <p className="text-muted">Esta funcionalidad estará disponible pronto.</p>
                </div>
              </section>
            )}

            {/* Sección: Seguridad */}
            {activeSection === 'seguridad' && (
              <section className="content-section">
                <h2 className="section-title">Cambiar Contraseña</h2>
                
                {successMessage && (
                  <div className="alert alert-success">{successMessage}</div>
                )}
                
                {errorMessage && (
                  <div className="alert alert-error">{errorMessage}</div>
                )}

                <form className="perfil-form" onSubmit={handleChangePassword}>
                  <div className="form-group">
                    <label htmlFor="actual" className="form-label">Contraseña Actual</label>
                    <input
                      id="actual"
                      type="password"
                      name="actual"
                      className="form-input"
                      value={passwordData.actual}
                      onChange={handlePasswordChange}
                      placeholder="Ingresa tu contraseña actual"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="nueva" className="form-label">Nueva Contraseña</label>
                    <input
                      id="nueva"
                      type="password"
                      name="nueva"
                      className="form-input"
                      value={passwordData.nueva}
                      onChange={handlePasswordChange}
                      placeholder="Ingresa tu nueva contraseña"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmar" className="form-label">Confirmar Nueva Contraseña</label>
                    <input
                      id="confirmar"
                      type="password"
                      name="confirmar"
                      className="form-input"
                      value={passwordData.confirmar}
                      onChange={handlePasswordChange}
                      placeholder="Confirma tu nueva contraseña"
                    />
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                      Actualizar Contraseña
                    </button>
                  </div>
                </form>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
