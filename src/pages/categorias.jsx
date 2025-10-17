import React from "react";
import { Link } from "react-router-dom";
import { CATEGORIES } from "../data/products";

export default function Categories() {
  return (
    <div className="container my-4">
      <div className="p-3 bg-white rounded-3 shadow-sm mb-3">
        <h2 className="h4 mb-0">Categorías</h2>
        <p className="text-muted small mb-0">Explora por tipo de producto</p>
      </div>

      <section className="row g-3">
        {CATEGORIES.map((cat) => {
          const slug = encodeURIComponent(cat);
          return (
            <div key={cat} className="col-12 col-sm-6 col-lg-4">
              <Link to={`/categoria/${slug}`} className="text-decoration-none">
                <div className="card h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title mb-2">{cat}</h5>
                    <p className="card-text text-muted flex-grow-1">Ver productos en {cat}</p>
                    <div className="mt-3">
                      <button className="btn btn-outline-primary w-100">Ver categoría</button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </section>
    </div>
  );
}