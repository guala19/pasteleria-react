import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import "../styles/navbar-new.css";

const CATEGORIES = [
  {
    title: "Tortas Cuadradas",
    description: "Capas generosas, perfectas para eventos.",
    link: "/catalogo?tipo=cuadrada",
  },
  {
    title: "Tortas Circulares",
    description: "Clásicas y versátiles, listas para personalizar.",
    link: "/catalogo?tipo=circular",
  },
  {
    title: "Postres Individuales",
    description: "Porciones únicas, listas para antojos.",
    link: "/catalogo?tipo=individual",
  },
  {
    title: "Pastelería Tradicional",
    description: "Recetas con historia.",
    link: "/catalogo?tipo=tradicional",
  },
  {
    title: "Sin Azúcar",
    description: "Dulzor equilibrado, sin azúcar añadida.",
    link: "/catalogo?tipo=sin-azucar",
  },
  {
    title: "Sin Gluten",
    description: "Placer sin gluten.",
    link: "/catalogo?tipo=sin-gluten",
  },
  {
    title: "Vegana",
    description: "Plantas, sabor y cariño.",
    link: "/catalogo?tipo=vegana",
  },
  {
    title: "Tortas Especiales",
    description: "Bodas, cumples y momentos épicos.",
    link: "/catalogo?tipo=especial",
  },
];

const PROMOTIONS = [
  {
    icon: "👴",
    title: "50% para mayores de 50",
    description: "Descuento especial en todos los productos (requiere carnet)",
  },
  {
    icon: "💖",
    title: "Código FELICES50",
    description: "10% de descuento de por vida al registrarse",
  },
  {
    icon: "🎓",
    title: "Beneficio DUOC",
    description: "Torta gratis con correo institucional",
  },
];

export default function NavbarNew() {
  const { count } = useCart();
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [catalogoOpen, setCatalogoOpen] = useState(false);
  const [showPromos, setShowPromos] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobilePromos, setShowMobilePromos] = useState(false);

  // Sticky navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY >= 8);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalogo?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const closeMobileMenu = () => {
    setMenuOpen(false);
    setCatalogoOpen(false);
    setShowMobilePromos(false);
  };

  return (
    <>
      <nav className={`navbar-new ${isSticky ? "navbar-sticky" : ""}`}>
        {/* ========== NAVBAR CONTENT ========== */}
        <div className="navbar-container">
          {/* ZONA IZQUIERDA - Branding */}
          <div className="navbar-left">
            <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
              <img
                src="/img/logoPasteleria.png"
                alt="Pastelería Mil Sabores"
                className="navbar-logo"
              />
              <div className="navbar-branding">
                <span className="navbar-title">Pastelería Mil Sabores</span>
                <span className="navbar-tagline">50 años de tradición</span>
              </div>
            </Link>
          </div>

          {/* ZONA CENTRO - Navegación Primaria (Desktop) */}
          <div className="navbar-center hidden-mobile">
            {/* Catálogo Mega-Menú */}
            <div className="nav-item-group">
              <button
                className="nav-link nav-dropdown-trigger"
                onMouseEnter={() => setCatalogoOpen(true)}
                onMouseLeave={() => setCatalogoOpen(false)}
                data-testid="nav-catalogo"
              >
                Catálogo <span className="dropdown-arrow">▾</span>
              </button>
              {catalogoOpen && (
                <div
                  className="mega-menu"
                  onMouseEnter={() => setCatalogoOpen(true)}
                  onMouseLeave={() => setCatalogoOpen(false)}
                >
                  <div className="mega-menu-subtitle">
                    Explora por forma, tamaño o necesidades especiales.
                  </div>
                  <div className="mega-menu-grid">
                    {CATEGORIES.map((cat, idx) => (
                      <Link
                        key={idx}
                        to={cat.link}
                        className="mega-menu-item"
                        onClick={() => setCatalogoOpen(false)}
                      >
                        <div className="mega-menu-item-title">{cat.title}</div>
                        <div className="mega-menu-item-desc">{cat.description}</div>
                        <div className="mega-menu-item-cta">Ver todo →</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Personaliza tu Torta */}
            <Link to="/catalogo" className="nav-link" data-testid="nav-personaliza">
              Personaliza tu Torta
            </Link>

            {/* Promociones */}
            <div className="nav-item-group">
              <button
                className="nav-link nav-dropdown-trigger"
                onMouseEnter={() => setShowPromos(true)}
                onMouseLeave={() => setShowPromos(false)}
                data-testid="nav-promos"
              >
                Promociones
              </button>
              {showPromos && (
                <div
                  className="promo-dropdown"
                  onMouseEnter={() => setShowPromos(true)}
                  onMouseLeave={() => setShowPromos(false)}
                >
                  {PROMOTIONS.map((promo, idx) => (
                    <div key={idx} className="promo-item">
                      <span className="promo-icon">{promo.icon}</span>
                      <div className="promo-content">
                        <div className="promo-title">{promo.title}</div>
                        <div className="promo-desc">{promo.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Comunidad/Blog */}
            <Link to="/#blog" className="nav-link" data-testid="nav-blog">
              Inspiraciones
            </Link>

            {/* Nosotros */}
            <Link to="/#historia" className="nav-link" data-testid="nav-nosotros">
              Nosotros
            </Link>

            {/* Contacto */}
            <a href="mailto:info@pasteleriamilsabores.cl" className="nav-link" data-testid="nav-contacto">
              Contacto
            </a>
          </div>

          {/* ZONA DERECHA - Acciones */}
          <div className="navbar-right">
            {/* Búsqueda (Desktop) */}
            <form className="search-bar hidden-mobile" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Buscar tortas, sabores o categorías…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="nav-buscar"
              />
              <button type="submit" className="search-btn">
                🔍
              </button>
            </form>

            {/* Usuario */}
            <Link
              to="/login"
              className="nav-icon-btn"
              title="Iniciar sesión o registrarse"
              data-testid="nav-user"
            >
              👤
            </Link>

            {/* Carrito */}
            <button
              className="nav-icon-btn cart-btn"
              data-bs-toggle="offcanvas"
              data-bs-target="#panelCarrito"
              title="Ver carrito"
              data-testid="nav-cart"
            >
              🛒
              {count > 0 && <span className="cart-badge">{count}</span>}
            </button>

            {/* Hamburguesa (Mobile) */}
            <button
              className="hamburger-btn visible-mobile"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menú"
              data-testid="drawer-open"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* ========== MOBILE DRAWER ========== */}
      {menuOpen && (
        <div className="mobile-overlay" onClick={() => setMenuOpen(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            {/* Búsqueda móvil */}
            <form className="search-bar-mobile" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Buscar…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">🔍</button>
            </form>

            {/* Acordeón Catálogo */}
            <div className="drawer-accordion">
              <button
                className="accordion-header"
                onClick={() => setCatalogoOpen(!catalogoOpen)}
              >
                <span>Catálogo</span>
                <span className={`toggle ${catalogoOpen ? "open" : ""}`}>
                  ▾
                </span>
              </button>
              {catalogoOpen && (
                <div className="accordion-content">
                  {CATEGORIES.map((cat, idx) => (
                    <Link
                      key={idx}
                      to={cat.link}
                      className="drawer-link"
                      onClick={closeMobileMenu}
                    >
                      {cat.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Link Personaliza */}
            <div className="drawer-link-section">
              <Link to="/catalogo" className="drawer-link" onClick={closeMobileMenu}>
                Personaliza tu Torta
              </Link>
            </div>

            {/* Acordeón Promociones */}
            <div className="drawer-accordion">
              <button
                className="accordion-header"
                onClick={() => setShowMobilePromos(!showMobilePromos)}
              >
                <span>Promociones</span>
                <span className={`toggle ${showMobilePromos ? "open" : ""}`}>
                  ▾
                </span>
              </button>
              {showMobilePromos && (
                <div className="accordion-content">
                  {PROMOTIONS.map((promo, idx) => (
                    <div key={idx} className="drawer-promo-item">
                      <span>{promo.icon}</span>
                      <div>
                        <div className="drawer-promo-title">{promo.title}</div>
                        <div className="drawer-promo-desc">{promo.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Links rápidos */}
            <div className="drawer-link-section">
              <Link to="/#blog" className="drawer-link" onClick={closeMobileMenu}>
                Inspiraciones
              </Link>
              <Link to="/#historia" className="drawer-link" onClick={closeMobileMenu}>
                Nosotros
              </Link>
              <a
                href="mailto:info@pasteleriamilsabores.cl"
                className="drawer-link"
                onClick={closeMobileMenu}
              >
                Contacto
              </a>
            </div>

            {/* Footer del drawer */}
            <div className="drawer-footer">
              <Link
                to="/login"
                className="drawer-btn btn-login"
                onClick={closeMobileMenu}
              >
                Ingresar / Registrarse
              </Link>
              <button
                className="drawer-btn btn-cart"
                data-bs-toggle="offcanvas"
                data-bs-target="#panelCarrito"
                onClick={closeMobileMenu}
              >
                Ver Carrito ({count})
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
