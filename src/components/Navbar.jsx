import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import "../styles/navbar-professional.css";

export default function Navbar() {
  const { count } = useCart();
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar-professional ${isSticky ? "sticky" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={handleMobileMenuClose}>
          <img src="/img/logoPasteleria.png" alt="Pastelería Mil Sabores" className="logo-img" />
          <span className="logo-text">Mil Sabores</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-menu">
          <div className="navbar-items">
            <NavLink to="/" className="navbar-link">
              Inicio
            </NavLink>
            <NavLink to="/catalogo" className="navbar-link">
              Catálogo
            </NavLink>
            <NavLink to="/categorias" className="navbar-link">
              Categorías
            </NavLink>
            <NavLink to="/pedidos" className="navbar-link">
              Pedidos
            </NavLink>
            <NavLink to="/envios" className="navbar-link">
              Envíos
            </NavLink>
          </div>

          {/* Right section */}
          <div className="navbar-actions">
            <div className="search-container">
              <input
                type="text"
                placeholder="Buscar..."
                className="search-input"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    navigate(`/catalogo?search=${e.target.value}`);
                  }
                }}
              />
              <span className="search-icon">🔍</span>
            </div>

            <NavLink to="/cuentas" className="navbar-link auth-link">
              👤 Cuenta
            </NavLink>

            <button
              className="cart-button"
              data-bs-toggle="offcanvas"
              data-bs-target="#panelCarrito"
              aria-controls="panelCarrito"
            >
              <span className="cart-icon">🛒</span>
              {count > 0 && <span className="cart-count">{count}</span>}
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="navbar-mobile-toggle">
          <button
            className={`hamburger ${mobileMenuOpen ? "active" : ""}`}
            onClick={handleMobileMenuToggle}
            aria-label="Toggle mobile menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-content">
          <NavLink to="/" className="mobile-link" onClick={handleMobileMenuClose}>
            Inicio
          </NavLink>
          <NavLink to="/catalogo" className="mobile-link" onClick={handleMobileMenuClose}>
            Catálogo
          </NavLink>
          <NavLink to="/categorias" className="mobile-link" onClick={handleMobileMenuClose}>
            Categorías
          </NavLink>
          <NavLink to="/pedidos" className="mobile-link" onClick={handleMobileMenuClose}>
            Pedidos
          </NavLink>
          <NavLink to="/envios" className="mobile-link" onClick={handleMobileMenuClose}>
            Envíos
          </NavLink>
          <div className="mobile-search-container">
            <input
              type="text"
              placeholder="Buscar..."
              className="mobile-search-input"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  navigate(`/catalogo?search=${e.target.value}`);
                  handleMobileMenuClose();
                }
              }}
            />
          </div>
          <NavLink to="/cuentas" className="mobile-link auth-link" onClick={handleMobileMenuClose}>
            👤 Mi Cuenta
          </NavLink>
        </div>
      </div>
    </nav>
  );
}