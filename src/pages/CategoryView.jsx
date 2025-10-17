import React from "react";
import { useParams, Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function CategoryView() {
  const { category } = useParams();
  const decoded = decodeURIComponent(category || "");
  const filtered = PRODUCTS.filter((p) => p.category === decoded);

  return (
    <div className="container my-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <h2 className="h4 mb-0">{decoded}</h2>
          <p className="text-muted small mb-0">{filtered.length} productos</p>
        </div>
        <div>
          <Link to="/categorias" className="btn btn-outline-secondary">Volver a categorías</Link>
        </div>
      </div>

      <section className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
        {filtered.length ? (
          filtered.map((p) => (
            <div key={p.code} className="col">
              <ProductCard product={p} />
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-warning">No hay productos en esta categoría.</div>
          </div>
        )}
      </section>
    </div>
  );
}