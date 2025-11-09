import { precioPorPersonas } from "../utils/money";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ProductCard({ product }) {
  const { addItem, MONEDA } = useCart();
  const [buttonRef, setButtonRef] = useState(null);

  const base = product.price;
  const max = product.price + 10000;

  function handleAdd() {
    addItem({
      code: product.code,
      name: product.name,
      type: product.type,
      size: "10 personas",
      price: precioPorPersonas(product.price, "10p"),
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

  const imgSrc = product.img || "/img/cake.jpg";

  return (
    <div className="card h-100">
      <Link to={`/producto/${product.code}`} className="text-decoration-none">
        <img src={imgSrc} alt={product.name} className="card-img-top" />
      </Link>
      <div className="card-body d-flex flex-column">
        <div>
          <Link className="text-decoration-none" to={`/producto/${product.code}`}>
            <strong>{product.name}</strong>
          </Link>
        </div>
        <div className="precio-wrap my-2">
          <div className="precio-principal">
            {MONEDA.format(base)} — {MONEDA.format(max)}
          </div>
        </div>
        <div className="text-muted small mb-3">{product.category}</div>
        <div className="mt-auto">
          <button 
            ref={setButtonRef}
            className="btn-agregar w-100" 
            onClick={handleAdd}
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}