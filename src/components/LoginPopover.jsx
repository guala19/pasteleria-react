import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/login-popover.css';

/**
 * LoginPopover Component
 * 
 * Popover de acceso que se muestra en la barra de navegación
 * - Para usuarios no registrados: Muestra opciones de login/registro
 * - Para usuarios registrados: Muestra opciones de cuenta y logout
 * 
 * @component
 * @returns {React.ReactElement} Popover de acceso en el navbar
 */
export default function LoginPopover() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);
  const buttonRef = useRef(null);

  // Cerrar popover cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  if (loading) {
    return (
      <button className="navbar-icon-btn profile-btn" disabled>
        👤
      </button>
    );
  }

  return (
    <div className="login-popover-container">
      <button
        ref={buttonRef}
        className={`navbar-icon-btn profile-btn ${isAuthenticated ? 'authenticated' : ''}`}
        title={isAuthenticated ? `${user?.name}` : 'Mi Cuenta'}
        onClick={() => setIsOpen(!isOpen)}
      >
        👤
        {isAuthenticated && <span className="profile-indicator"></span>}
      </button>

      {isOpen && (
        <div ref={popoverRef} className="login-popover">
          {!isAuthenticated ? (
            // Estado: Usuario No Registrado
            <div className="popover-content logged-out">
              <h3 className="popover-title">Acceso Clientes</h3>

              <button
                className="popover-btn-primary"
                onClick={() => handleNavigate('/login')}
              >
                Iniciar Sesión
              </button>

              <div className="popover-divider">
                ¿Eres nuevo?{' '}
                <a
                  href="#"
                  className="popover-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate('/registro');
                  }}
                >
                  Regístrate aquí
                </a>
              </div>
            </div>
          ) : (
            // Estado: Usuario Registrado
            <div className="popover-content logged-in">
              <h3 className="popover-greeting">Hola, {user?.name}</h3>

              <ul className="popover-menu">
                <li>
                  <a
                    href="#"
                    className="popover-menu-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigate('/pedidos');
                    }}
                  >
                    Mis Pedidos
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="popover-menu-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigate('/perfil');
                    }}
                  >
                    Mi Perfil
                  </a>
                </li>
              </ul>

              <div className="popover-logout">
                <a
                  href="#"
                  className="popover-logout-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                >
                  Cerrar Sesión
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
