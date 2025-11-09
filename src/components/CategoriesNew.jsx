import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES } from "../data/products";
import "../styles/categories-new.css";

export default function CategoriesNew() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Mapeo de categorías con descripciones e imágenes
  const categoryData = {
    "Tortas Cuadradas": {
      description: "Tortas clásicas cuadradas para celebraciones inolvidables.",
      emoji: "🍰",
      color: "chocolate",
    },
    "Tortas Circulares": {
      description: "Nuestras tortas redondas más elegantes y tradicionales.",
      emoji: "🎂",
      color: "pink",
    },
    "Postres Individuales": {
      description: "Delicias individuales perfectas para disfrutar al momento.",
      emoji: "🍮",
      color: "chocolate",
    },
    "Pastelería Tradicional": {
      description: "Los favoritos clásicos de la pastelería chilena.",
      emoji: "🥐",
      color: "pink",
    },
    "Productos Sin Azúcar": {
      description: "Opciones dulces sin azúcar refinada, endulzadas naturalmente.",
      emoji: "🍃",
      color: "chocolate",
    },
    "Productos Sin Gluten": {
      description: "Delicias sin gluten, aptas para celíacos.",
      emoji: "🌾",
      color: "pink",
    },
    "Productos Veganos": {
      description: "Nuestras deliciosas opciones 100% veganas.",
      emoji: "🌱",
      color: "chocolate",
    },
    "Tortas Especiales": {
      description: "Creaciones especiales para momentos extraordinarios.",
      emoji: "✨",
      color: "pink",
    },
  };

  return (
    <div className="categories-new-container">
      {/* ==================== HEADER SECTION ==================== */}
      <section className="categories-header">
        <nav className="breadcrumbs-categories">
          <Link to="/">Inicio</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-active">Categorías</span>
        </nav>
        
        <div className="header-content">
          <h1 className="categories-title">Categorías de Productos</h1>
          <p className="categories-subtitle">
            Explora nuestras delicias por tipo, forma o estilo de vida
          </p>
        </div>
      </section>

      {/* ==================== QUICK FILTER CHIPS ==================== */}
      <section className="categories-quick-filter">
        <div className="filter-chips-container">
          <button
            className={`filter-chip ${selectedCategory === null ? "active" : ""}`}
            onClick={() => setSelectedCategory(null)}
          >
            Todas
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              className={`filter-chip ${selectedCategory === category ? "active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {categoryData[category]?.emoji} {category}
            </button>
          ))}
        </div>
      </section>

      {/* ==================== CATEGORIES GRID ==================== */}
      <section className="categories-grid-section">
        <div className="categories-grid">
          {CATEGORIES.map((category) => {
            // Si hay una categoría seleccionada, mostrar solo esa
            if (selectedCategory && selectedCategory !== category) {
              return null;
            }

            const data = categoryData[category];
            const slug = encodeURIComponent(category);

            return (
              <Link
                key={category}
                to={`/categoria/${slug}`}
                className="category-card-link"
              >
                <div className="category-card">
                  {/* Card Header con Emoji */}
                  <div className="card-header">
                    <div className="card-emoji">{data?.emoji || "🍰"}</div>
                  </div>

                  {/* Card Body */}
                  <div className="card-body">
                    <h3 className="card-title">{category}</h3>
                    <p className="card-description">{data?.description}</p>
                  </div>

                  {/* Card Footer with Button */}
                  <div className="card-footer">
                    <button className="btn-view-products">
                      Ver productos
                      <span className="arrow">→</span>
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
