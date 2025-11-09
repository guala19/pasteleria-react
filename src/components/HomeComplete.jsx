import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import "../styles/home-new.css";

export default function HomeComplete() {
  const [expandedBlog, setExpandedBlog] = useState(null);

  // 🍰 Obtener 4 productos destacados (primeros de cada categoría importante)
  const featuredProducts = [
    PRODUCTS[0], // TC001
    PRODUCTS[2], // TT001
    PRODUCTS[4], // PI001
    PRODUCTS[6], // PSA001
  ];

  // 📰 Blog/Comunidad posts
  const blogPosts = [
    {
      id: 1,
      title: "La historia detrás de nuestro Récord Guinness",
      category: "Historia",
      image: "/img/cake.jpg",
      excerpt: "En 1995 creamos la torta más grande de Latinoamérica. Descubre cómo todo comenzó...",
      color: "chocolate",
    },
    {
      id: 2,
      title: "Receta: Mousse de Chocolate en casa",
      category: "Receta",
      image: "/img/cake.jpg",
      excerpt: "Aprende a preparar nuestro famoso mousse con ingredientes simples y técnicas profesionales.",
      color: "pink",
    },
    {
      id: 3,
      title: "Consejos para conservar tu torta perfectamente",
      category: "Consejo",
      image: "/img/cake.jpg",
      excerpt: "Mantén la frescura y el sabor de tu torta con estos sencillos pasos de almacenamiento.",
      color: "chocolate",
    },
  ];

  return (
    <div className="home-complete">
      {/* ==================== 1. HERO SECTION ==================== */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">50 años endulzando momentos inolvidables 🍰</h1>
          <p className="hero-subtitle">Descubre nuestras tortas artesanales y celebra con nosotros</p>
          <div className="hero-buttons">
            <Link to="/catalogo" className="btn btn-primary btn-lg">
              Ver catálogo
            </Link>
            <button className="btn btn-secondary btn-lg">Personaliza tu torta</button>
          </div>
        </div>
      </section>

      {/* ==================== 2. NUESTRA HISTORIA ==================== */}
      <section className="history-section">
        <div className="history-container">
          <div className="history-image">
            <div className="polaroid-frame">
              <img src="/img/cake.jpg" alt="Pastelería Mil Sabores - Nuestro inicio" />
              <p className="polaroid-label">1975 - Nuestro comienzo</p>
            </div>
          </div>
          <div className="history-content">
            <h2 className="section-title">Nuestra Historia</h2>
            <p className="history-text">
              Pastelería Mil Sabores nació en 1975 con una misión simple: crear momentos dulces y memorables
              para cada familia chilena. Desde nuestro primer local hasta hoy, hemos mantenido la tradición de
              hacer cada torta con amor, dedicación y los mejores ingredientes.
            </p>
            <p className="history-text">
              En 1995, creamos el Récord Guinness de la torta más grande de Latinoamérica, un hito que
              representa nuestro compromiso con la excelencia y la innovación. Hoy, con 50 años de historia,
              seguimos siendo la pastelería favorita de generaciones.
            </p>
            <button className="btn-know-more">Conoce más</button>
          </div>
        </div>
      </section>

      {/* ==================== 3. PRODUCTOS DESTACADOS ==================== */}
      <section className="featured-section">
        <div className="featured-header">
          <h2 className="section-title">Productos Destacados</h2>
          <p className="section-subtitle">Nuestros favoritos de la comunidad</p>
        </div>

        <div className="products-grid">
          {featuredProducts.map((product) => (
            <div key={product.code} className="product-featured-card">
              <div className="product-image-wrapper">
                <img src={product.img} alt={product.name} className="product-image" />
                <Link to={`/producto/${product.code}`} className="quick-view-btn">
                  Ver detalles
                </Link>
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${product.price.toLocaleString("es-CL")}</p>
                <button className="btn-add-featured">
                  <span>🛒</span> Agregar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="featured-footer">
          <Link to="/catalogo" className="btn-catalog-complete">
            Ver catálogo completo
          </Link>
        </div>
      </section>

      {/* ==================== 4. PROMOCIONES Y DESCUENTOS ==================== */}
      <section className="promotions-section">
        <h2 className="section-title-promo">Promociones y Descuentos</h2>

        <div className="promotions-grid">
          <div className="promo-card">
            <div className="promo-icon">🎂</div>
            <h3>Descuento 50% Mayores</h3>
            <p>Si tienes 50 años o más, disfruta de un descuento especial en todas nuestras tortas.</p>
          </div>

          <div className="promo-card">
            <div className="promo-icon">💖</div>
            <h3>Código FELICES50</h3>
            <p>Obtén 10% de descuento en tu compra usando el código FELICES50 en checkout.</p>
          </div>

          <div className="promo-card">
            <div className="promo-icon">🎓</div>
            <h3>Beneficio DUOC</h3>
            <p>Estudiantes y egresados DUOC reciben una torta individual gratis con compra mínima.</p>
          </div>
        </div>

        <div className="promo-banner">
          <p>💝 Apoyas a estudiantes de gastronomía con cada compra que realizas</p>
        </div>
      </section>

      {/* ==================== 5. COMUNIDAD Y BLOG ==================== */}
      <section className="community-section">
        <div className="community-header">
          <h2 className="section-title">Inspiraciones Dulces</h2>
          <p className="section-subtitle">Historias, recetas y consejos de nuestra comunidad</p>
        </div>

        <div className="blog-grid">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className={`blog-card blog-${post.color}`}
              onClick={() => setExpandedBlog(expandedBlog === post.id ? null : post.id)}
            >
              <div className="blog-image">
                <img src={post.image} alt={post.title} />
                <span className={`blog-category category-${post.color}`}>{post.category}</span>
              </div>
              <div className="blog-content">
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>
                <button className="btn-read-more">Leer más →</button>
              </div>
              {expandedBlog === post.id && (
                <div className="blog-expanded">
                  <p>
                    {post.excerpt} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ==================== 6. FOOTER ==================== */}
      <footer className="footer-complete">
        <div className="footer-container">
          <div className="footer-column">
            <h3 className="footer-title">Pastelería Mil Sabores</h3>
            <p className="footer-tagline">50 años de tradición y sabor</p>
            <div className="social-links">
              <a href="#" className="social-icon" title="Facebook">
                f
              </a>
              <a href="#" className="social-icon" title="Instagram">
                📷
              </a>
              <a href="#" className="social-icon" title="WhatsApp">
                💬
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h4 className="footer-subtitle">Navegación</h4>
            <ul className="footer-links">
              <li>
                <Link to="/">Inicio</Link>
              </li>
              <li>
                <Link to="/catalogo">Catálogo</Link>
              </li>
              <li>
                <a href="#history">Nuestra Historia</a>
              </li>
              <li>
                <a href="#contact">Contacto</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-subtitle">Información</h4>
            <ul className="footer-links">
              <li>
                <a href="#terms">Términos y condiciones</a>
              </li>
              <li>
                <a href="#privacy">Política de privacidad</a>
              </li>
              <li>
                <a href="#shipping">Envíos y devoluciones</a>
              </li>
              <li>
                <a href="#faq">Preguntas frecuentes</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 Pastelería Mil Sabores. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
