import React, { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { PRODUCTS } from "../data/products.js";
import CatalogFilters from "./CatalogFilters.jsx";
import ProductCardNew from "./ProductCardNew.jsx";
import "../styles/catalog.css";

const SORT_OPTIONS = [
  { value: "relevance", label: "Relevancia" },
  { value: "price_asc", label: "Precio: menor a mayor" },
  { value: "price_desc", label: "Precio: mayor a menor" },
  { value: "bestsellers", label: "Más vendidos" },
  { value: "newest", label: "Novedades" },
];

const ITEMS_PER_PAGE = 12;

export default function CatalogNew() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart, MONEDA } = useCart();
  const [gridColumns, setGridColumns] = useState(3);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Obtener filtros desde URL
  const selectedCategory = searchParams.get("cat") || "";
  const selectedShape = searchParams.get("forma") || "";
  const selectedSize = searchParams.get("tamaño") || "";
  const selectedDiet = searchParams.get("dieta") || "";
  const selectedSort = searchParams.get("sort") || "relevance";
  const priceRange = searchParams.get("precio") ? JSON.parse(searchParams.get("precio")) : [0, 100000];
  const availability = searchParams.get("disponibilidad") || "";
  const searchQuery = searchParams.get("q") || "";

  // Filtrar productos
  const filteredProducts = useMemo(() => {
    let result = PRODUCTS;

    // Búsqueda por texto
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.code.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query)
      );
    }

    // Categoría
    if (selectedCategory) {
      result = result.filter((p) => p.category.toLowerCase().replace(/\s+/g, "-") === selectedCategory);
    }

    // Forma
    if (selectedShape) {
      result = result.filter((p) => p.type === selectedShape);
    }

    // Tamaño (simulado para postres individuales)
    if (selectedSize) {
      if (selectedSize === "individual") {
        result = result.filter((p) => p.category === "Postres Individuales");
      }
    }

    // Dieta
    if (selectedDiet) {
      result = result.filter((p) => {
        if (selectedDiet === "sin_azucar" && p.category === "Productos Sin Azúcar") return true;
        if (selectedDiet === "sin_gluten" && p.category === "Productos sin gluten") return true;
        if (selectedDiet === "vegano" && p.category === "Productos Veganos") return true;
        return false;
      });
    }

    // Precio
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    return result;
  }, [selectedCategory, selectedShape, selectedSize, selectedDiet, priceRange, searchQuery]);

  // Ordenar productos
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];

    switch (selectedSort) {
      case "price_asc":
        return sorted.sort((a, b) => a.price - b.price);
      case "price_desc":
        return sorted.sort((a, b) => b.price - a.price);
      case "bestsellers":
        return sorted.sort((a, b) => (b.sales || 0) - (a.sales || 0));
      case "newest":
        return sorted.reverse();
      case "relevance":
      default:
        return sorted;
    }
  }, [filteredProducts, selectedSort]);

  // Paginación
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Actualizar filtros en URL
  const updateFilters = useCallback(
    (newFilters) => {
      const params = new URLSearchParams(searchParams);
      
      Object.keys(newFilters).forEach((key) => {
        const value = newFilters[key];
        if (value === null || value === "" || (Array.isArray(value) && value.length === 0)) {
          params.delete(key);
        } else {
          params.set(key, Array.isArray(value) ? JSON.stringify(value) : value);
        }
      });

      setCurrentPage(1);
      setSearchParams(params);
    },
    [searchParams, setSearchParams]
  );

  const clearFilters = useCallback(() => {
    setSearchParams({});
    setCurrentPage(1);
  }, [setSearchParams]);

  return (
    <div className="catalog-container">
      {/* SUB-HEADER */}
      <div className="catalog-subheader">
        <div className="subheader-content">
          {/* Breadcrumbs */}
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <a href="/">Inicio</a>
            <span className="separator">/</span>
            <span>Catálogo</span>
            {selectedCategory && (
              <>
                <span className="separator">/</span>
                <span>{selectedCategory.replace(/-/g, " ").toUpperCase()}</span>
              </>
            )}
          </nav>

          {/* Título */}
          <h1 className="catalog-title">Catálogo de Productos</h1>

          {/* Controles superiores */}
          <div className="controls-top">
            <div className="controls-left">
              {/* Ordenar */}
              <select
                className="sort-select"
                value={selectedSort}
                onChange={(e) => updateFilters({ sort: e.target.value })}
                aria-label="Ordenar por"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              {/* Resultados */}
              <span className="results-count">
                {sortedProducts.length} resultado{sortedProducts.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="controls-right">
              {/* Selector de columnas (desktop) */}
              <div className="columns-selector hidden-mobile">
                {[3, 4].map((col) => (
                  <button
                    key={col}
                    className={`col-btn ${gridColumns === col ? "active" : ""}`}
                    onClick={() => setGridColumns(col)}
                    title={`Ver en ${col} columnas`}
                    aria-pressed={gridColumns === col}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      {Array.from({ length: col }).map((_, i) => (
                        <rect key={i} x={2 + i * 6.5} y="2" width="5" height="5" fill="currentColor" />
                      ))}
                    </svg>
                  </button>
                ))}
              </div>

              {/* Botón Filtros (mobile) */}
              <button
                className="btn-filters-mobile visible-mobile"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                data-testid="btn-filters-mobile"
              >
                🔍 Filtros
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="catalog-main">
        {/* COLUMNA IZQUIERDA - FILTROS (Desktop) */}
        <aside className="catalog-filters hidden-mobile">
          <CatalogFilters
            selectedCategory={selectedCategory}
            selectedShape={selectedShape}
            selectedSize={selectedSize}
            selectedDiet={selectedDiet}
            priceRange={priceRange}
            availability={availability}
            onUpdateFilters={updateFilters}
            onClearFilters={clearFilters}
            productCount={sortedProducts.length}
          />
        </aside>

        {/* COLUMNA DERECHA - GRID DE PRODUCTOS */}
        <section className="catalog-grid-section">
          {/* Grid de productos */}
          {sortedProducts.length > 0 ? (
            <>
              <div
                className="products-grid"
                style={{
                  "--grid-cols": gridColumns,
                }}
              >
                {paginatedProducts.map((product) => (
                  <ProductCardNew
                    key={product.code}
                    product={product}
                    onAddToCart={(product, size, customMessage) => {
                      addToCart({ ...product, size, customMessage });
                    }}
                  />
                ))}
              </div>

              {/* PAGINACIÓN */}
              {totalPages > 1 && (
                <div className="pagination-section">
                  {/* Paginación superior */}
                  <nav className="pagination" aria-label="Paginación">
                    <button
                      className="page-btn"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    >
                      ← Anterior
                    </button>

                    {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          className={`page-number ${currentPage === pageNum ? "active" : ""}`}
                          onClick={() => setCurrentPage(pageNum)}
                          aria-current={currentPage === pageNum ? "page" : undefined}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <button
                      className="page-btn"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    >
                      Siguiente →
                    </button>
                  </nav>

                  {/* Cargar más */}
                  {currentPage < totalPages && (
                    <button
                      className="btn-load-more"
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Cargar más productos
                    </button>
                  )}
                </div>
              )}
            </>
          ) : (
            /* Estado vacío */
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h2>No encontramos productos</h2>
              <p>Intenta ajustar tus filtros o explorar otras categorías</p>
              <button className="btn-clear-filters" onClick={clearFilters}>
                Limpiar todos los filtros
              </button>
              <div className="suggested-categories">
                <h3>Categorías recomendadas:</h3>
                <div className="category-chips">
                  {["Tortas Cuadradas", "Tortas Circulares", "Postres Individuales"].map((cat) => (
                    <button
                      key={cat}
                      className="chip"
                      onClick={() =>
                        updateFilters({
                          cat: cat.toLowerCase().replace(/\s+/g, "-"),
                        })
                      }
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* DRAWER FILTROS (Mobile) */}
      {showMobileFilters && (
        <div className="mobile-filters-overlay" onClick={() => setShowMobileFilters(false)}>
          <div className="mobile-filters-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h2>Filtros y Ordenamiento</h2>
              <button
                className="btn-close"
                onClick={() => setShowMobileFilters(false)}
                aria-label="Cerrar filtros"
              >
                ✕
              </button>
            </div>
            <div className="drawer-content">
              <CatalogFilters
                selectedCategory={selectedCategory}
                selectedShape={selectedShape}
                selectedSize={selectedSize}
                selectedDiet={selectedDiet}
                priceRange={priceRange}
                availability={availability}
                onUpdateFilters={(filters) => {
                  updateFilters(filters);
                  setShowMobileFilters(false);
                }}
                onClearFilters={() => {
                  clearFilters();
                  setShowMobileFilters(false);
                }}
                productCount={sortedProducts.length}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
