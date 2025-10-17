import React from "react";
import Navbar from "./Navbar";
import ProductCard from "./ProductCard";
// Import correcto: PRODUCTS es un export nombrado en data/products.js
import { PRODUCTS as products } from "./data/products";

function Catalogo() {
  return (
    <div>
      <Navbar />
      <main className="container my-3">
        <div className="p-3 bg-white rounded-3 shadow-sm mb-3">
          <h2 className="h4">Catálogo de productos</h2>
          <p>Aquí se mostrarán las tortas y postres disponibles 🎂</p>
        </div>

        <section className="p-3 bg-white rounded-3 shadow-sm">
          <div className="row g-3">
            {products.map((p) => (
              <div key={p.code} className="col-12 col-sm-6 col-lg-4">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Catalogo;