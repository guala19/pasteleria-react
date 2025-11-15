import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import LoginPopover from './LoginPopover.jsx';
import '../styles/navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const cartBtnRef = useRef(null);
  const [prevCartCount, setPrevCartCount] = useState(0);

  // Calcular cantidad total de artículos en el carrito
  const cartCount = cart ? cart.reduce((sum, item) => sum + (item.quantity || 0), 0) : 0;

  // Disparar animación cuando el carrito se actualiza
  useEffect(() => {
    if (cartCount > prevCartCount && cartBtnRef.current) {
      cartBtnRef.current.classList.remove('shake-animation');
      // Forzar reflow para reiniciar la animación
      void cartBtnRef.current.offsetWidth;
      cartBtnRef.current.classList.add('shake-animation');
    }
    setPrevCartCount(cartCount);
  }, [cartCount, prevCartCount]);

  // Función para detectar si un link está activo
  const isLinkActive = (path) => {
    if (path === '/catalogo') {
      return location.pathname === '/catalogo' || location.pathname.startsWith('/catalogo');
    }
    return location.pathname === path;
  };

  // Cerrar menú móvil al navegar
  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  // Abrir/cerrar carrito
  const handleCartClick = () => {
    const panel = document.querySelector('.cart-panel-redesigned');
    const backdrop = document.querySelector('.cart-backdrop');
    if (panel) panel.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
    setIsMobileMenuOpen(false);
  };

  // Manejo de búsqueda
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalogo?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="navbar-professional">
      <div className="navbar-container">
        <div className="navbar-left">
          <a href="/" className="navbar-logo">
            <span className="navbar-logo-icon">🥐</span>
            <span className="navbar-logo-text">Mil Sabores</span>
          </a>
        </div>

        <div className="navbar-center">
          <a href="/catalogo" className={`navbar-link ${isLinkActive('/catalogo') ? 'active' : ''}`}>Categorías</a>
          <a href="/blog" className={`navbar-link ${isLinkActive('/blog') ? 'active' : ''}`}>Blog</a>
          <a href="/historia" className={`navbar-link ${isLinkActive('/historia') ? 'active' : ''}`}>Nuestra Historia</a>
          <a href="/contacto" className={`navbar-link ${isLinkActive('/contacto') ? 'active' : ''}`}>Contacto</a>
        </div>

        <div className="navbar-right">
          {/* Icono de Búsqueda */}
          <div className="navbar-search-container">
            <button
              className="navbar-icon-btn search-btn"
              title="Buscar"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              🔍
            </button>

            {/* Barra de búsqueda desplegable */}
            {isSearchOpen && (
              <form className="navbar-search-bar" onSubmit={handleSearch}>
                <input
                  type="text"
                  className="navbar-search-input"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button type="submit" className="navbar-search-submit">Buscar</button>
              </form>
            )}
          </div>

          {/* Icono de Perfil con Popover */}
          <LoginPopover />

          {/* Icono de Carrito */}
          <button
            ref={cartBtnRef}
            className="navbar-icon-btn cart-btn"
            title="Carrito de Compras"
            onClick={handleCartClick}
          >
            🛒
            {cartCount > 0 && (
              <span className="navbar-badge">{cartCount}</span>
            )}
          </button>

          {/* Icono de Menú Hamburguesa (Mobile) */}
          <button
            className="navbar-hamburger"
            title="Menú"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </div>

      {/* ==================== MENÚ MÓVIL (Sidebar) ==================== */}
      {isMobileMenuOpen && (
        <>
          <div
            className="navbar-mobile-backdrop"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          <div className="navbar-mobile-menu">
            {/* Header del menú */}
            <div className="navbar-mobile-header">
              <h3>Menú</h3>
              <button
                className="navbar-mobile-close"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Enlaces del menú */}
            <div className="navbar-mobile-links">
              <a href="/catalogo" className={`navbar-mobile-link ${isLinkActive('/catalogo') ? 'active' : ''}`} onClick={() => handleNavigation('/catalogo')}>
                Categorías
              </a>
              <a href="/blog" className={`navbar-mobile-link ${isLinkActive('/blog') ? 'active' : ''}`} onClick={() => handleNavigation('/blog')}>
                Blog
              </a>
              <a href="/historia" className={`navbar-mobile-link ${isLinkActive('/historia') ? 'active' : ''}`} onClick={() => handleNavigation('/historia')}>
                Nuestra Historia
              </a>
              <a href="/contacto" className={`navbar-mobile-link ${isLinkActive('/contacto') ? 'active' : ''}`} onClick={() => handleNavigation('/contacto')}>
                Contacto
              </a>

              <hr className="navbar-mobile-divider" />

              <a 
                href="/login"
                className="navbar-mobile-link" 
                onClick={() => handleNavigation('/login')}
              >
                Iniciar Sesión
              </a>

              <div className="navbar-mobile-search">
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    className="navbar-mobile-search-input"
                    placeholder="Buscar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button type="submit" className="navbar-mobile-search-btn">Buscar</button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}