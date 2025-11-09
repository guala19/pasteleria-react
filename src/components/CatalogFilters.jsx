import React, { useState } from "react";

const CATEGORIES = [
  { value: "tortas-cuadradas", label: "Tortas Cuadradas" },
  { value: "tortas-circulares", label: "Tortas Circulares" },
  { value: "postres-individuales", label: "Postres Individuales" },
  { value: "pasteleria-tradicional", label: "Pastelería Tradicional" },
  { value: "productos-sin-azucar", label: "Productos Sin Azúcar" },
  { value: "productos-sin-gluten", label: "Productos Sin Gluten" },
  { value: "productos-veganos", label: "Productos Veganos" },
  { value: "tortas-especiales", label: "Tortas Especiales" },
];

const SHAPES = [
  { value: "cuadrada", label: "Cuadrada" },
  { value: "circular", label: "Circular" },
];

const DIETS = [
  { value: "sin_azucar", label: "Sin Azúcar" },
  { value: "sin_gluten", label: "Sin Gluten" },
  { value: "vegano", label: "Vegano" },
];

export default function CatalogFilters({
  selectedCategory,
  selectedShape,
  selectedDiet,
  priceRange,
  onUpdateFilters,
  onClearFilters,
  productCount,
}) {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    shapes: true,
    diets: true,
    price: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCategoryChange = (value) => {
    onUpdateFilters({
      cat: selectedCategory === value ? "" : value,
    });
  };

  const handleShapeChange = (value) => {
    onUpdateFilters({
      forma: selectedShape === value ? "" : value,
    });
  };

  const handleDietChange = (value) => {
    onUpdateFilters({
      dieta: selectedDiet === value ? "" : value,
    });
  };

  const handlePriceChange = (e) => {
    const newMax = parseInt(e.target.value, 10);
    onUpdateFilters({
      precio: JSON.stringify([0, newMax]),
    });
  };

  const hasActiveFilters =
    selectedCategory || selectedShape || selectedDiet || priceRange[1] < 100000;

  return (
    <div className="catalog-filters-container">
      {/* Botón Limpiar */}
      {hasActiveFilters && (
        <button className="btn-clear-all" onClick={onClearFilters}>
          ✕ Limpiar filtros
        </button>
      )}

      {/* SECCIÓN: CATEGORÍAS */}
      <div className="filter-section">
        <button
          className="filter-header"
          onClick={() => toggleSection("categories")}
          aria-expanded={expandedSections.categories}
        >
          <span>Categorías</span>
          <span className="toggle-icon">▾</span>
        </button>
        {expandedSections.categories && (
          <div className="filter-options">
            {CATEGORIES.map((cat) => (
              <label key={cat.value} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedCategory === cat.value}
                  onChange={() => handleCategoryChange(cat.value)}
                  aria-label={cat.label}
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-text">{cat.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* SECCIÓN: FORMA */}
      <div className="filter-section">
        <button
          className="filter-header"
          onClick={() => toggleSection("shapes")}
          aria-expanded={expandedSections.shapes}
        >
          <span>Forma</span>
          <span className="toggle-icon">▾</span>
        </button>
        {expandedSections.shapes && (
          <div className="filter-options">
            {SHAPES.map((shape) => (
              <label key={shape.value} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedShape === shape.value}
                  onChange={() => handleShapeChange(shape.value)}
                  aria-label={shape.label}
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-text">{shape.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* SECCIÓN: DIETAS */}
      <div className="filter-section">
        <button
          className="filter-header"
          onClick={() => toggleSection("diets")}
          aria-expanded={expandedSections.diets}
        >
          <span>Dietas Especiales</span>
          <span className="toggle-icon">▾</span>
        </button>
        {expandedSections.diets && (
          <div className="filter-options">
            {DIETS.map((diet) => (
              <label key={diet.value} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedDiet === diet.value}
                  onChange={() => handleDietChange(diet.value)}
                  aria-label={diet.label}
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-text">{diet.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* SECCIÓN: PRECIO */}
      <div className="filter-section">
        <button
          className="filter-header"
          onClick={() => toggleSection("price")}
          aria-expanded={expandedSections.price}
        >
          <span>Precio</span>
          <span className="toggle-icon">▾</span>
        </button>
        {expandedSections.price && (
          <div className="filter-options">
            <div className="price-range">
              <input
                type="range"
                min="0"
                max="100000"
                step="5000"
                value={priceRange[1]}
                onChange={handlePriceChange}
                className="price-slider"
                aria-label="Rango de precio"
              />
              <div className="price-labels">
                <span>$0</span>
                <span>${priceRange[1].toLocaleString("es-CL")}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
