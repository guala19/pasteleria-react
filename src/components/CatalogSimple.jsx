import React, { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";
import { precioPorPersonas } from "../utils/money";
import "../styles/catalog-simple.css";

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState("3"); // 2, 3, 4 columnas
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [expandedAccordion, setExpandedAccordion] = useState(null);

  // Estados de filtros
  const [forma, setForma] = useState(searchParams.get("forma") || "");
  const [dietas, setDietas] = useState(searchParams.getAll("diet") || []);
  const [tamanio, setTamanio] = useState(searchParams.get("size") || "");
  const [categoria, setCategoria] = useState(searchParams.get("category") || "");
  const [precioMin, setPrecioMin] = useState(parseInt(searchParams.get("priceMin")) || 0);
  const [precioMax, setPrecioMax] = useState(parseInt(searchParams.get("priceMax")) || 100000);
  const [disponibilidad, setDisponibilidad] = useState(searchParams.get("availability") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "relevance");
  const [personalizado, setPersonalizado] = useState(searchParams.get("custom") || "");

  // Actualizar URL cuando cambian filtros
  const updateURL = (newParams) => {
    const params = new URLSearchParams();
    if (newParams.forma) params.append("forma", newParams.forma);
    if (newParams.dietas?.length) {
      newParams.dietas.forEach(d => params.append("diet", d));
    }
    if (newParams.tamanio) params.append("size", newParams.tamanio);
    if (newParams.categoria) params.append("category", newParams.categoria);
    if (newParams.precioMin !== undefined) params.append("priceMin", newParams.precioMin);
    if (newParams.precioMax !== undefined) params.append("priceMax", newParams.precioMax);
    if (newParams.disponibilidad) params.append("availability", newParams.disponibilidad);
    if (newParams.sortBy) params.append("sort", newParams.sortBy);
    if (newParams.personalizado) params.append("custom", newParams.personalizado);
    setSearchParams(params);
  };

  // Aplicar filtros desde modal
  const aplicarFiltros = () => {
    updateURL({ forma, dietas, tamanio, categoria, precioMin, precioMax, disponibilidad, sortBy, personalizado });
    setShowFiltersModal(false);
  };

  // Limpiar todos los filtros
  const limpiarFiltros = () => {
    setForma("");
    setDietas([]);
    setTamanio("");
    setCategoria("");
    setPrecioMin(0);
    setPrecioMax(100000);
    setDisponibilidad("");
    setSortBy("relevance");
    setPersonalizado("");
    updateURL({});
  };

  // Toggle dieta
  const toggleDieta = (dieta) => {
    setDietas(prev => 
      prev.includes(dieta) 
        ? prev.filter(d => d !== dieta)
        : [...prev, dieta]
    );
  };

  // Filtrar productos
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      if (forma && product.type !== forma) return false;
      if (categoria && product.category !== categoria) return false;
      if (precioMin && product.price < precioMin) return false;
      if (precioMax && product.price > precioMax) return false;
      if (dietas.length > 0) {
        const productTags = product.tags || [];
        const hasAllDietas = dietas.every(d => 
          productTags.includes(d.toLowerCase().replace(" ", "_"))
        );
        if (!hasAllDietas) return false;
      }
      return true;
    });
  }, [forma, categoria, precioMin, precioMax, dietas]);

  // Ordenar productos
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortBy) {
      case "price_asc":
        return sorted.sort((a, b) => a.price - b.price);
      case "price_desc":
        return sorted.sort((a, b) => b.price - a.price);
      case "newest":
        return sorted.reverse();
      case "bestseller":
        return sorted.slice(0, 8);
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  // Chips rápidos activos
  const activeChips = [
    ...(forma ? [{ type: "forma", label: forma, value: forma }] : []),
    ...dietas.map(d => ({ type: "diet", label: d, value: d })),
    ...(tamanio ? [{ type: "size", label: tamanio, value: tamanio }] : []),
  ];

  const DIETAS_OPTIONS = ["Sin Azúcar", "Sin Gluten", "Vegano"];
  const FORMAS_OPTIONS = ["Cuadrada", "Circular"];
  const TAMANIOS_OPTIONS = ["S", "M", "L"];

  // Mapeo de forma para búsqueda en productos
  const shapeMap = {
    "Cuadrada": "cuadrada",
    "Circular": "circular"
  };

  const dietaMap = {
    "Sin Azúcar": "sin_azucar",
    "Sin Gluten": "sin_gluten",
    "Vegano": "vegano"
  };

  return (
    <div className="catalog-redesigned">
      {/* MAIN CONTENT */}
      <main className="catalog-main">
        <div className="catalog-container">
          {/* SECCIÓN: Título + Filtros en dos columnas */}
          <div className="catalog-header-with-filters">
            {/* Columna izquierda: Título */}
            <div className="catalog-title-column">
              <h1 className="catalog-page-title">Catálogo</h1>
            </div>

            {/* Columna derecha: Filtros */}
            <div className="catalog-filters-column">
              {/* FILTROS PRINCIPALES (Forma + Dietas) */}
              <div className="filters-primary-section-right">
                {/* Forma */}
                <div className="filter-group-inline">
                  <label className="filter-label">Forma:</label>
                  <div className="filter-chips">
                    {FORMAS_OPTIONS.map((f) => (
                      <button
                        key={f}
                        className={`chip-filter ${forma === f ? "active" : ""}`}
                        onClick={() => {
                          const newForma = forma === f ? "" : f;
                          setForma(newForma);
                          updateURL({
                            forma: newForma,
                            dietas,
                            tamanio,
                            categoria,
                            precioMin,
                            precioMax,
                            disponibilidad,
                            sortBy,
                            personalizado
                          });
                        }}
                        aria-pressed={forma === f}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dietas */}
                <div className="filter-group-inline">
                  <label className="filter-label">Dietas:</label>
                  <div className="filter-chips">
                    {DIETAS_OPTIONS.map((d) => (
                      <button
                        key={d}
                        className={`chip-filter ${dietas.includes(d) ? "active" : ""}`}
                        onClick={() => {
                          const newDietas = dietas.includes(d)
                            ? dietas.filter((x) => x !== d)
                            : [...dietas, d];
                          setDietas(newDietas);
                          updateURL({
                            forma,
                            dietas: newDietas,
                            tamanio,
                            categoria,
                            precioMin,
                            precioMax,
                            disponibilidad,
                            sortBy,
                            personalizado
                          });
                        }}
                        aria-pressed={dietas.includes(d)}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECCIÓN: Chips de filtros activos (si hay) - MOVIDO DEBAJO */}
          {(forma || dietas.length > 0 || tamanio) && (
            <div className="active-filters-section">
              <div className="active-filters">
                {forma && (
                  <button
                    className="active-chip"
                    onClick={() => {
                      setForma("");
                      updateURL({
                        forma: "",
                        dietas,
                        tamanio,
                        categoria,
                        precioMin,
                        precioMax,
                        disponibilidad,
                        sortBy,
                        personalizado
                      });
                    }}
                  >
                    {forma} <span className="chip-x">✕</span>
                  </button>
                )}
                {dietas.map((d) => (
                  <button
                    key={d}
                    className="active-chip"
                    onClick={() => {
                      const newDietas = dietas.filter((x) => x !== d);
                      setDietas(newDietas);
                      updateURL({
                        forma,
                        dietas: newDietas,
                        tamanio,
                        categoria,
                        precioMin,
                        precioMax,
                        disponibilidad,
                        sortBy,
                        personalizado
                      });
                    }}
                  >
                    {d} <span className="chip-x">✕</span>
                  </button>
                ))}
                {tamanio && (
                  <button
                    className="active-chip"
                    onClick={() => {
                      setTamanio("");
                      updateURL({
                        forma,
                        dietas,
                        tamanio: "",
                        categoria,
                        precioMin,
                        precioMax,
                        disponibilidad,
                        sortBy,
                        personalizado
                      });
                    }}
                  >
                    Tamaño: {tamanio} <span className="chip-x">✕</span>
                  </button>
                )}
                <button className="active-chip-clear" onClick={limpiarFiltros}>
                  Limpiar todo
                </button>
              </div>
            </div>
          )}

          {/* GRID PROTAGONISTA */}
          <div className="products-section">
            {sortedProducts.length === 0 ? (
              <div className="empty-state-redesigned">
                <div className="empty-emoji">🍰</div>
                <h2>No hay productos</h2>
                <p>Intenta con otros filtros</p>
                <button className="btn-primary-large" onClick={limpiarFiltros}>
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className={`products-grid-new grid-cols-${viewMode}`}>
                {sortedProducts.map((product) => (
                  <ProductCard key={product.code} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* MODAL FILTROS AVANZADOS */}
      {showFiltersModal && (
        <div
          className="filters-modal-overlay-redesigned"
          onClick={() => setShowFiltersModal(false)}
        >
          <div
            className="filters-modal-body-redesigned"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header-redesigned">
              <h2>⚙️ Filtros avanzados</h2>
              <button
                className="modal-close-redesigned"
                onClick={() => setShowFiltersModal(false)}
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>

            <div className="modal-content-redesigned">
              {/* Tamaño */}
              <div className="modal-section">
                <h3 className="modal-section-title">Tamaño</h3>
                <div className="modal-chips">
                  {TAMANIOS_OPTIONS.map((t) => (
                    <button
                      key={t}
                      className={`chip-filter ${tamanio === t ? "active" : ""}`}
                      onClick={() => {
                        const newTamanio = tamanio === t ? "" : t;
                        setTamanio(newTamanio);
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Categorías */}
              <div className="modal-section">
                <h3 className="modal-section-title">Categorías</h3>
                <div className="modal-checkboxes">
                  {Array.from(new Set(PRODUCTS.map((p) => p.category))).map((cat) => (
                    <label key={cat} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={categoria === cat}
                        onChange={(e) =>
                          setCategoria(e.target.checked ? cat : "")
                        }
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Precio */}
              <div className="modal-section">
                <h3 className="modal-section-title">Rango de precio</h3>
                <div className="price-inputs">
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={precioMin}
                    onChange={(e) => setPrecioMin(parseInt(e.target.value))}
                    className="range-slider"
                  />
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={precioMax}
                    onChange={(e) => setPrecioMax(parseInt(e.target.value))}
                    className="range-slider"
                  />
                  <div className="price-display-redesigned">
                    ${precioMin.toLocaleString()} - ${precioMax.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Disponibilidad */}
              <div className="modal-section">
                <h3 className="modal-section-title">Disponibilidad</h3>
                <div className="modal-radios">
                  <label className="radio-item">
                    <input
                      type="radio"
                      name="availability"
                      value="stock"
                      checked={disponibilidad === "stock"}
                      onChange={(e) => setDisponibilidad(e.target.value)}
                    />
                    <span>En stock</span>
                  </label>
                  <label className="radio-item">
                    <input
                      type="radio"
                      name="availability"
                      value="preorder"
                      checked={disponibilidad === "preorder"}
                      onChange={(e) => setDisponibilidad(e.target.value)}
                    />
                    <span>Reserva</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="modal-footer-redesigned">
              <button className="btn-secondary-modal" onClick={limpiarFiltros}>
                Limpiar
              </button>
              <button
                className="btn-primary-modal"
                onClick={() => {
                  aplicarFiltros();
                }}
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// PRODUCT CARD - Rediseñado
function ProductCard({ product }) {
  const { addItem, MONEDA } = useCart();
  const [buttonRef, setButtonRef] = useState(null);

  // Usar tamaño por defecto: 10 personas
  const DEFAULT_SIZE = "10 personas";
  const priceForSize = precioPorPersonas(product.price, "10p");

  const dietBadges = product.tags
    ? product.tags
        .map((tag) => {
          const tagMap = {
            sin_azucar: "Sin Azúcar",
            sin_gluten: "Sin Gluten",
            vegano: "Vegano"
          };
          return tagMap[tag];
        })
        .filter(Boolean)
    : [];

  const shapeLabel =
    product.type === "cuadrada"
      ? "Cuadrada"
      : product.type === "circular"
        ? "Circular"
        : null;

  function handleAdd() {
    addItem({
      code: product.code,
      name: product.name,
      type: product.type,
      size: DEFAULT_SIZE,
      price: priceForSize,
      qty: 1,
      img: product.img,
    });

    // Agregar animación pulse
    if (buttonRef) {
      buttonRef.classList.add("pulse");
      setTimeout(() => {
        buttonRef.classList.remove("pulse");
      }, 600);
    }
  }

  return (
    <div className="product-card-redesigned">
      {/* NIVEL 1: IMAGEN PROTAGONISTA - CLICKEABLE */}
      <Link 
        to={`/producto/${product.code}`}
        className="product-image-section"
      >
        <img
          src={product.img}
          alt={product.name}
          className="product-image-redesigned"
          loading="lazy"
        />
        {shapeLabel && (
          <span className="badge-shape-redesigned">{shapeLabel}</span>
        )}
      </Link>

      {/* NIVEL 2: INFORMACIÓN (Nombre + Precio + Dietas) */}
      <div className="product-info-section">
        <h3 className="product-name-redesigned">{product.name}</h3>

        {/* Dietas como badges pequeños */}
        {dietBadges.length > 0 && (
          <div className="diet-badges-redesigned">
            {dietBadges.map((badge, idx) => (
              <span key={idx} className="diet-badge-item">
                {badge}
              </span>
            ))}
          </div>
        )}

        <p className="product-price-redesigned">
          {MONEDA.format(priceForSize)}
        </p>
      </div>

      {/* NIVEL 3: BOTÓN CENTRADO */}
      <div className="product-actions-section-centered">
        <button 
          ref={setButtonRef}
          className="btn-add-cart-full" 
          onClick={handleAdd}
          aria-label="Agregar al carrito"
        >
          AGREGAR
        </button>
      </div>
    </div>
  );
}