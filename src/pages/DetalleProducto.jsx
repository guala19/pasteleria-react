import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import '../styles/product-detail.css';

export default function DetalleProducto() {
  const { code } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [specialMessage, setSpecialMessage] = useState('');
  const [selectedSize, setSelectedSize] = useState('10p');
  const [addedMessage, setAddedMessage] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [btnAnimating, setBtnAnimating] = useState(false);
  const addBtnRef = useRef(null);

  useEffect(() => {
    const foundProduct = PRODUCTS.find(p => p.code === code);
    setProduct(foundProduct);

    if (foundProduct) {
      const related = PRODUCTS.filter(
        p => p.category === foundProduct.category && p.code !== code
      ).slice(0, 4);
      setRelatedProducts(related);
    }
  }, [code]);

  const handleAddToCart = () => {
    if (product && !btnAnimating) {
      setBtnAnimating(true);
      
      // Agregar la clase de animación
      if (addBtnRef.current) {
        addBtnRef.current.classList.add('btn-add-satisfied');
      }

      addItem({
        code: product.code,
        name: product.name,
        type: product.type,
        size: selectedSize === '10p' ? '10 personas' : '20 personas',
        price: product.price,
        qty: quantity,
        img: product.img,
        note: specialMessage.trim() || undefined
      });
      
      setAddedMessage('✓ ¡Agregado al carrito!');
      
      // Remover la clase después de 1.5 segundos
      setTimeout(() => {
        if (addBtnRef.current) {
          addBtnRef.current.classList.remove('btn-add-satisfied');
        }
        setAddedMessage('');
        setBtnAnimating(false);
      }, 1500);
    }
  };

  const handleShareFacebook = () => {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const handleShareInstagram = () => {
    alert('Comparte este producto en tu historia de Instagram: ' + product.name);
  };

  const handleSharePinterest = () => {
    const url = window.location.href;
    window.open(
      `https://pinterest.com/pin/create/button/?url=${url}&description=${product.name}`,
      '_blank'
    );
  };

  if (!product) {
    return (
      <div className="product-detail-container empty-state">
        <h2>Producto no encontrado</h2>
        <a href="/catalogo" className="btn-back">Volver al catálogo</a>
      </div>
    );
  }

  const productImages = [product.img, ...(product.images || [])];

  return (
    <div className="product-detail-container">
      {/* Breadcrumbs */}
      <div className="breadcrumbs-product">
        <a href="/">Inicio</a>
        <span className="breadcrumb-sep">/</span>
        <a href="/catalogo">Catálogo</a>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-active">{product.name}</span>
      </div>

      {/* Main Content - 2 Columns */}
      <div className="product-main-content">
        {/* LEFT COLUMN - Image Gallery */}
        <div className="product-image-column">
          <div className="image-main-wrapper">
            <img
              src={productImages[selectedImage]}
              alt={product.name}
              className="image-main"
            />
          </div>

          {productImages.length > 1 && (
            <div className="image-carousel">
              {productImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${product.name} vista ${idx + 1}`}
                  className={`carousel-thumbnail ${selectedImage === idx ? 'active' : ''}`}
                  onClick={() => setSelectedImage(idx)}
                />
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN - Product Info */}
        <div className="product-info-column">
          {/* Title */}
          <h1 className="product-detail-title">{product.name}</h1>

          {/* Category & Tags */}
          <p className="product-category-label">{product.category}</p>

          {product.tags && product.tags.length > 0 && (
            <div className="diet-tags">
              {product.tags.includes('sin_azucar') && (
                <span className="diet-tag">Sin Azúcar</span>
              )}
              {product.tags.includes('sin_gluten') && (
                <span className="diet-tag">Sin Gluten</span>
              )}
              {product.tags.includes('vegano') && (
                <span className="diet-tag">Vegano</span>
              )}
            </div>
          )}

          {/* Description */}
          <p className="product-description">{product.description}</p>

          {/* Price Section */}
          <div className="price-section">
            <span className="price-label">Precio</span>
            <h2 className="price-display">${product.price.toLocaleString('es-CL')}</h2>
          </div>

          {/* Size Selector */}
          <div className="selector-section">
            <label className="selector-label">Tamaño</label>
            <div className="size-chips">
              <button
                className={`size-chip ${selectedSize === '10p' ? 'active' : ''}`}
                onClick={() => setSelectedSize('10p')}
              >
                10 personas
              </button>
              <button
                className={`size-chip ${selectedSize === '20p' ? 'active' : ''}`}
                onClick={() => setSelectedSize('20p')}
              >
                20 personas
              </button>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="selector-section">
            <label className="selector-label">Cantidad</label>
            <div className="quantity-selector">
              <button
                className="qty-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                −
              </button>
              <span className="qty-display">{quantity}</span>
              <button
                className="qty-btn"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button
              ref={addBtnRef}
              className={`btn-add-to-cart ${btnAnimating ? 'btn-add-satisfied' : ''}`}
              onClick={handleAddToCart}
              disabled={btnAnimating}
            >
              <span className="btn-text-original">Añadir al Carrito</span>
              <span className="btn-text-success">✓ ¡Añadido!</span>
            </button>
            {addedMessage && <div className="feedback-message">{addedMessage}</div>}
          </div>

          {/* Social Share */}
          <div style={{ marginTop: '16px' }}>
            <p className="selector-label">Compartir</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleShareFacebook}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#1877F2'
                }}
                title="Compartir en Facebook"
              >
                f
              </button>
              <button
                onClick={handleShareInstagram}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#E4405F'
                }}
                title="Compartir en Instagram"
              >
                📷
              </button>
              <button
                onClick={handleSharePinterest}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#E60023'
                }}
                title="Compartir en Pinterest"
              >
                P
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Personalization Section */}
      <div className="personalization-section">
        <h3 className="personalization-title">Añade un Mensaje Especial</h3>
        <form className="personalization-form">
          <div className="form-group">
            <label>Mensaje para la torta</label>
            <textarea
              placeholder="Ej: 'Feliz Cumpleaños, Papá'"
              value={specialMessage}
              onChange={(e) => setSpecialMessage(e.target.value.slice(0, 100))}
              maxLength={100}
            />
            <p className="char-count">{specialMessage.length}/100 caracteres</p>
            <p style={{ fontSize: '12px', color: '#B0BEC5', marginTop: '8px' }}>
              Tu mensaje será escrito en la torta
            </p>
          </div>
        </form>
      </div>

      {/* Recipe History Section */}
      <div className="related-products-section">
        <h2 className="related-title">El Origen de Nuestra Receta</h2>
        <p style={{
          fontSize: '15px',
          color: '#5D4037',
          lineHeight: '1.8',
          maxWidth: '800px',
          margin: '0 auto 40px',
          textAlign: 'center'
        }}>
          {product.history || `Con más de 50 años de tradición, esta receta es el resultado de años de dedicación y pasión por el arte repostero. Cada ingrediente es seleccionado cuidadosamente para garantizar el mejor sabor y calidad. Nos enorgullece compartir esta delicia que ha sido parte de los momentos más especiales de nuestros clientes.`}
        </p>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="related-products-section" style={{ marginTop: '60px' }}>
          <h2 className="related-title">Completa tu Pedido</h2>
          <div className="related-grid">
            {relatedProducts.map((prod) => (
              <a
                key={prod.code}
                href={`/producto/${prod.code}`}
                className="related-card-link"
              >
                <div className="related-card">
                  <div className="related-image-wrapper">
                    <img src={prod.img} alt={prod.name} />
                  </div>
                  <h4 className="related-name">{prod.name}</h4>
                  <p className="related-price">
                    ${prod.price.toLocaleString('es-CL')}
                  </p>
                  <button
                    type="button"
                    className="related-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/producto/${prod.code}`);
                    }}
                  >
                    Ver Producto
                  </button>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
