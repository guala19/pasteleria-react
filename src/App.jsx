// src/App.jsx
import React, { Suspense, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

// 🧭 Componentes base
import Navbar from "./components/Navbar.jsx";
import HomeComplete from "./components/HomeComplete.jsx";
import Login from "./components/Login.jsx";
import Cuentas from "./components/Cuentas.jsx";
import CatalogSimple from "./components/CatalogSimple.jsx";
import CategoriesNew from "./components/CategoriesNew.jsx";
import CategoryView from "./pages/CategoryView.jsx";
import Categories from "./pages/categorias.jsx";

// 🛒 Componentes CORE
import Product from "./pages/Product.jsx";
import EnviosTracker from "./components/EnviosTracker.jsx";
import CartPanel from "./components/CartPanel.jsx";
import CarritoCompraPage from "./pages/CarritoCompraPage.jsx";
import Pedidos from "./pages/Pedidos.jsx"; // 👈 asegúrate de tenerlo

import { useCart } from "./context/CartContext.jsx";
import "./App.css";

export default function App() {
  const { count } = useCart();
  const navigate = useNavigate();

  // 🧾 Manejar apertura/cierre del panel del carrito
  useEffect(() => {
    const handleCartToggle = () => {
      const panel = document.querySelector(".cart-panel-redesigned");
      const backdrop = document.querySelector(".cart-backdrop");
      if (panel) {
        panel.classList.toggle("active");
      }
      if (backdrop) {
        backdrop.classList.toggle("active");
      }
    };

    const cartButton = document.querySelector("[data-bs-toggle='offcanvas'][data-bs-target='#panelCarrito']");
    const closeBtn = document.querySelector(".cart-close-btn");

    if (cartButton) cartButton.addEventListener("click", handleCartToggle);
    if (closeBtn) closeBtn.addEventListener("click", handleCartToggle);

    return () => {
      if (cartButton) cartButton.removeEventListener("click", handleCartToggle);
      if (closeBtn) closeBtn.removeEventListener("click", handleCartToggle);
    };
  }, []);

  return (
    <div className="app-root d-flex flex-column min-vh-100">
      {/* 🌐 NAVBAR GLOBAL - Siempre visible */}
      <Navbar />
      
      {/* 🌐 Enrutamiento principal */}
      <main className="flex-grow-1" style={{ backgroundColor: '#FFF5E1' }}>
        <div className="container py-4" style={{ backgroundColor: '#FFF5E1' }}>
          <Suspense fallback={<div className="text-center p-5">Cargando...</div>}>
            <Routes>
              {/* Rutas base */}
              <Route path="/" element={<HomeComplete />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cuentas" element={<Cuentas />} />

              {/* Catálogo */}
              <Route path="/catalogo" element={<CatalogSimple />} />
              <Route path="/categorias" element={<CategoriesNew />} />
              <Route path="/categoria/:category" element={<CategoryView />} />
              <Route path="/producto/:code" element={<Product />} />

              {/* 🛒 Carrito / Pedidos */}
              <Route path="/carrito" element={<CarritoCompraPage />} />
              <Route path="/pedidos" element={<Pedidos />} />

              {/* 🚚 Envíos */}
              <Route path="/envios" element={<EnviosTracker />} />

              {/* 🛑 Ruta por defecto */}
              <Route
                path="*"
                element={
                  <div className="text-center py-5">
                    <h2>404 - Página no encontrada</h2>
                    <p>La página que buscas no existe.</p>
                    <Link to="/" className="btn btn-primary mt-3">
                      Volver al inicio
                    </Link>
                  </div>
                }
              />
            </Routes>
          </Suspense>
        </div>
      </main>

      {/* 🛒 Panel del carrito redesignado */}
      {(() => {
        try {
          return <CartPanel />;
        } catch (err) {
          console.error("Error en CartPanel:", err);
          return null;
        }
      })()}

      {/* 📌 Footer */}
      <footer className="text-center text-muted small py-3 border-top bg-white mt-auto">
        © 2025 Pastelería 1000 Sabores
      </footer>
    </div>
  );
}
