import { Link, Route, Routes } from 'react-router-dom'
import Catalog from './pages/Catalog'
import Product from './pages/Product'
import { useCart } from './context/CartContext'
import CartPanel from './components/CartPanel'
import './App.css'

export default function App() {
  const { count } = useCart()

  return (
    <div className="app-root">
      <header className="border-bottom bg-white py-3">
        <div className="container d-flex align-items-center justify-content-between">
          <h1 className="m-0 h4">
            <Link to="/" className="text-decoration-none text-reset">Pastelería <span>1000 Sabores</span></Link>
          </h1>
          <div>
            <Link to="/catalogo" className="btn btn-outline-secondary me-2">Catálogo</Link>
            <button className="btn btn-light d-flex align-items-center" type="button" data-bs-toggle="offcanvas" data-bs-target="#panelCarrito" aria-controls="panelCarrito">
              <span className="me-2">Carrito</span>
              <span className="badge text-bg-dark">{count}</span>
            </button>
          </div>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Catalog/>} />
        <Route path="/catalogo" element={<Catalog/>} />
        <Route path="/producto/:code" element={<Product/>} />
      </Routes>

      <div className="offcanvas offcanvas-end" tabIndex="-1" id="panelCarrito" aria-labelledby="tituloCarrito">
        <div className="offcanvas-header">
          <h2 className="offcanvas-title h4" id="tituloCarrito">Carrito</h2>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Cerrar"></button>
        </div>
        <div className="offcanvas-body d-flex flex-column">
          <CartPanel/>
        </div>
      </div>

      <footer className="text-center text-muted small py-3 border-top">© 2025 Pastelería 1000 Sabores</footer>
    </div>
  )
}
