import React from "react";
import { Routes, Route } from "react-router-dom";
import Pasteleria from "./components/Pasteleria";
import Login from "./components/login";
import Cuentas from "./components/Cuentas";
import Catalogo from "./components/Catalogo";
import Product from "./pages/Product";
import Pedidos from "./pages/Pedidos";
import Envios from "./pages/Envios";
import Categories from "./pages/categorias";
import CategoryView from "./pages/CategoryView";

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