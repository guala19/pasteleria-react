// src/App.jsx
import React, { Suspense } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

// 🧭 Componentes base
import Pasteleria from "./components/Pasteleria.jsx";
import Login from "./components/Login.jsx";
import Cuentas from "./components/Cuentas.jsx";
import Catalogo from "./components/Catalogo.jsx";
import CategoryView from "./pages/CategoryView.jsx";
import Categories from "./pages/categorias.jsx";

// 🛒 Componentes CORE
import Product from "./pages/Product.jsx";
import EnviosTracker from "./components/EnviosTracker.jsx";
import CarritoCompra from "./components/CarritoCompra.jsx";
import CarritoCompraPage from "./pages/CarritoCompraPage.jsx";
import Pedidos from "./pages/Pedidos.jsx"; // 👈 asegúrate de tenerlo

import { useCart } from "./context/CartContext.jsx";
import "./App.css";

export default function App() {
  const { count } = useCart();
  const navigate = useNavigate();

  // 🧾 Cerrar offcanvas y redirigir al checkout/pedidos
  function handleCheckoutTrigger() {
    const offcanvasElement = document.getElementById("panelCarrito");
    try {
      if (offcanvasElement && window.bootstrap) {
        const instance = window.bootstrap.Offcanvas.getInstance(offcanvasElement);
        instance?.hide();
      }
    } catch (err) {
      console.error("Error cerrando offcanvas:", err);
    }
    navigate("/pedidos");
  }

  return (
    <div className="app-root d-flex flex-column min-vh-100">
      {/* 🌐 Enrutamiento principal */}
      <main className="flex-grow-1 bg-light">
        <div className="container py-4">
          <Suspense fallback={<div className="text-center p-5">Cargando...</div>}>
            <Routes>
              {/* Rutas base */}
              <Route path="/" element={<Pasteleria />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cuentas" element={<Cuentas />} />

              {/* Catálogo */}
              <Route path="/catalogo" element={<Catalogo />} />
              <Route path="/categorias" element={<Categories />} />
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

      {/* 🛒 Offcanvas del carrito */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="panelCarrito"
        aria-labelledby="tituloCarrito"
      >
        <div className="offcanvas-header">
          <h2 className="offcanvas-title h4" id="tituloCarrito">
            Carrito
          </h2>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Cerrar"
          ></button>
        </div>
        <div className="offcanvas-body d-flex flex-column">
          {(() => {
            try {
              return <CarritoCompra onCheckout={handleCheckoutTrigger} />;
            } catch (err) {
              console.error("Error en CarritoCompra:", err);
              return (
                <div className="alert alert-danger">
                  Ocurrió un error cargando el carrito 😢
                </div>
              );
            }
          })()}
        </div>
      </div>

      {/* 📌 Footer */}
      <footer className="text-center text-muted small py-3 border-top bg-white mt-auto">
        © 2025 Pastelería 1000 Sabores
      </footer>
    </div>
  );
}
