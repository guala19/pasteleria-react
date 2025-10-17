import React from "react";
import { Routes, Route } from "react-router-dom";
import Pasteleria from "./components/Pasteleria";
import Login from "./components/login";
import Cuentas from "./components/Cuentas";
import Catalogo from "./components/Catalogo";
import Product from "./components/pages/Product";
import Pedidos from "./components/pages/Pedidos";
import Envios from "./components/pages/Envios";

// NUEVAS PÁGINAS (crear los archivos indicados más abajo)
import Categories from "./pages/Categories.jsx";
import CategoryView from "./pages/CategoryView.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Pasteleria />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cuentas" element={<Cuentas />} />
      <Route path="/catalogo" element={<Catalogo />} />
      <Route path="/categorias" element={<Categories />} />
      <Route path="/categoria/:category" element={<CategoryView />} />
      <Route path="/producto/:code" element={<Product />} />
      <Route path="/pedidos" element={<Pedidos />} />
      <Route path="/envios" element={<Envios />} />
    </Routes>
  );
}

export default App;