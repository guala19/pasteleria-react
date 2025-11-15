import React, { Suspense, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Navbar from "./components/Navbar.jsx";
import HomeComplete from "./components/HomeComplete.jsx";
import Footer from "./components/Footer.jsx";
import Cuentas from "./components/Cuentas.jsx";
import CategoriesNew from "./components/CategoriesNew.jsx";
import CategoryView from "./pages/CategoryView.jsx";
import EnviosTracker from "./components/EnviosTracker.jsx";
import CartPanel from "./components/CartPanel.jsx";
import CarritoCompraPage from "./pages/CarritoCompraPage.jsx";
import Pedidos from "./pages/Pedidos.jsx";
import Catalog from "./pages/Catalog.jsx";
import DetalleProducto from "./pages/DetalleProducto.jsx";
import Checkout from "./pages/Checkout.jsx";
import PagoCorrecto from "./pages/PagoCorrecto.jsx";
import PagoError from "./pages/PagoError.jsx";
import LoginPage from "./pages/AdminLogin.jsx";
import Registro from "./pages/Registro.jsx";
import MiPerfil from "./pages/MiPerfil.jsx";
import NuestraHistoria from "./pages/NuestraHistoria.jsx";
import Contacto from "./pages/Contacto.jsx";

// Admin Pages
import AdminDashboard from "./admin/pages/AdminDashboard.jsx";
import AdminOrdenes from "./admin/pages/AdminOrdenes.jsx";
import AdminProductos from "./admin/pages/AdminProductos.jsx";
import AdminUsuarios from "./admin/pages/AdminUsuarios.jsx";
import AdminPerfil from "./admin/pages/AdminPerfil.jsx";

import { useCart } from "./context/CartContext.jsx";
import "./App.css";

export default function App() {
  const { count } = useCart();
  const navigate = useNavigate();

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
    <AuthProvider>
      <div className="app-root d-flex flex-column min-vh-100" style={{ position: 'relative' }}>
        <Navbar />
      
        <main className="flex-grow-1" style={{ backgroundColor: '#FFF5E1' }}>
          <Suspense fallback={<div className="text-center p-5">Cargando...</div>}>
            <Routes>
              <Route path="/" element={<HomeComplete />} />
              <Route path="/cuentas" element={<Cuentas />} />
              <Route path="/catalogo" element={<Catalog />} />
              <Route path="/productos" element={<Catalog />} />
              <Route path="/producto/:code" element={<DetalleProducto />} />
              <Route path="/categorias" element={<CategoriesNew />} />
              <Route path="/categoria/:category" element={<CategoryView />} />
              <Route path="/carrito" element={<CarritoCompraPage />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/pago-correcto" element={<PagoCorrecto />} />
              <Route path="/pago-error" element={<PagoError />} />
              <Route path="/pedidos" element={<Pedidos />} />
              <Route path="/envios" element={<EnviosTracker />} />
              <Route path="/perfil" element={<MiPerfil />} />
              <Route path="/historia" element={<NuestraHistoria />} />
              <Route path="/contacto" element={<Contacto />} />

              {/* Authentication Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/admin/login" element={<LoginPage />} />

              {/* Protected Admin Routes */}
              <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/ordenes" element={<ProtectedRoute><AdminOrdenes /></ProtectedRoute>} />
              <Route path="/admin/productos" element={<ProtectedRoute><AdminProductos /></ProtectedRoute>} />
              <Route path="/admin/usuarios" element={<ProtectedRoute><AdminUsuarios /></ProtectedRoute>} />
              <Route path="/admin/perfil" element={<ProtectedRoute><AdminPerfil /></ProtectedRoute>} />

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
        <Footer />
      </div>
    </AuthProvider>
  );
}
