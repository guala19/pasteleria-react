import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

function Navbar() {
  const { count } = useCart();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img src="/img/logoPasteleria.png" alt="logo" style={{height:36}} />
          <span className="brand">Pastelería 1000 Sabores</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Inicio</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/catalogo">Catálogo</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/categorias">Categorías</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/pedidos">Pedidos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/envios">Envíos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/cuentas">Cuentas</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">Login</NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <button
              className="btn btn-outline-secondary d-flex align-items-center"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#panelCarrito"
              aria-controls="panelCarrito"
            >
              <span className="me-2" aria-hidden="true">🛒</span>
              <span id="contadorCarrito" className="badge bg-dark text-white">{count}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;