import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';
import '../styles/catalog-new.css';

export default function Catalog() {
  // ==================== ESTADO DE FILTROS ====================
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState('popularity');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // ==================== FUNCIONES DE FILTRO ====================
  
  const handleTypeChange = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
    setCurrentPage(1);
  };

  const handleSizeChange = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
    setCurrentPage(1);
  };

  const handleApplyFilters = () => {
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedTypes([]);
    setSelectedSizes([]);
    setSelectedCategories([]);
    setSortBy('popularity');
    setCurrentPage(1);
  };

  // ==================== FILTRADO DE PRODUCTOS ====================
  
  const filteredProducts = useMemo(() => {
    let result = PRODUCTS;

    // Búsqueda por nombre o descripción
    if (searchQuery) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filtro por tipo
    if (selectedTypes.length > 0) {
      result = result.filter(p =>
        selectedTypes.includes(p.type || '')
      );
    }

    // Filtro por tamaño
    if (selectedSizes.length > 0) {
      result = result.filter(p =>
        selectedSizes.includes(p.size || '')
      );
    }

    // Filtro por categoría
    if (selectedCategories.length > 0) {
      result = result.filter(p =>
        selectedCategories.includes(p.category || '')
      );
    }

    // Ordenamiento
    switch (sortBy) {
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'popularity':
      default:
        // Mantener orden original (por popularidad)
        break;
    }

    return result;
  }, [searchQuery, selectedTypes, selectedSizes, selectedCategories, sortBy]);

  // ==================== PAGINACIÓN ====================
  
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // ==================== OPCIONES DE FILTROS ====================
  
  const typeOptions = ['Cuadrada', 'Circular'];
  const sizeOptions = ['Pequeño', 'Mediano', 'Grande'];
  const categoryOptions = [
    'Postres Individuales',
    'Productos Sin Azúcar',
    'Pastelería Tradicional',
    'Productos sin gluten',
    'Productos Vegana',
    'Tortas Especiales'
  ];

  return (
    <div className="catalog-page">
      {/* Título de la Página */}
      <h1 className="catalog-title">Catálogo</h1>

      <div className="catalog-container">
        {/* ==================== BARRA LATERAL DE FILTROS ==================== */}
        <aside className="catalog-filters">
          <div className="filters-panel">
            {/* Búsqueda */}
            <div className="filter-section">
              <input
                type="text"
                className="filter-search"
                placeholder="Busca tu producto aquí..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            {/* Tipo de Torta */}
            <div className="filter-section">
              <h3 className="filter-title">Tipo de Torta</h3>
              <div className="filter-options">
                {typeOptions.map(type => (
                  <label key={type} className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => handleTypeChange(type)}
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tamaño */}
            <div className="filter-section">
              <h3 className="filter-title">Tamaño</h3>
              <div className="filter-options">
                {sizeOptions.map(size => (
                  <label key={size} className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedSizes.includes(size)}
                      onChange={() => handleSizeChange(size)}
                    />
                    <span>{size}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Categorías */}
            <div className="filter-section">
              <h3 className="filter-title">Categorías</h3>
              <div className="filter-categories">
                {categoryOptions.map(category => (
                  <label key={category} className="filter-category-link">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                    <span>{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="filter-actions">
              <button className="btn-apply-filters" onClick={handleApplyFilters}>
                Aplicar Filtros
              </button>
              <button className="btn-clear-filters" onClick={handleClearFilters}>
                Limpiar Filtros
              </button>
            </div>
          </div>
        </aside>

        {/* ==================== CUADRÍCULA DE PRODUCTOS ==================== */}
        <main className="catalog-products">
          {/* Barra de Ordenamiento */}
          <div className="catalog-toolbar">
            <div className="sort-container">
              <label htmlFor="sortBy" className="sort-label">Ordenar por:</label>
              <select
                id="sortBy"
                className="sort-select"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="popularity">Popularidad</option>
                <option value="price-low">Precio: Menor a Mayor</option>
                <option value="price-high">Precio: Mayor a Menor</option>
              </select>
            </div>
            <div className="product-count">
              Mostrando {paginatedProducts.length} de {filteredProducts.length} productos
            </div>
          </div>

          {/* Cuadrícula de Productos */}
          {paginatedProducts.length > 0 ? (
            <div className="products-grid">
              {paginatedProducts.map(product => (
                <ProductCard
                  key={product.code}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="no-products">
              <p className="no-products-text">No se encontraron productos que coincidan con tus filtros.</p>
            </div>
          )}

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                ← Anterior
              </button>

              <div className="pagination-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                className="pagination-btn"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Siguiente →
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

