import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PRODUCTS } from '../data/products'
import { etiquetaPersonas, MONEDA, precioPorPersonas } from '../utils/money'
import { useCart } from '../context/CartContext'

export default function Product() {
  const { code } = useParams()
  const product = useMemo(() => PRODUCTS.find(p => p.code === code), [code])
  const { addItem } = useCart()

  const [size, setSize] = useState('10p')
  const [note, setNote] = useState('')
  const [added, setAdded] = useState(false)

  if (!product) return <div className="container my-4"><div className="alert alert-warning">Producto no encontrado.</div></div>

  const price = precioPorPersonas(product.price, size)

  function addToCart() {
    addItem({
      code: product.code,
      name: product.name,
      type: product.type,
      size: etiquetaPersonas(size),
      price,
      qty: 1,
      img: product.img,
      note: note.trim() || undefined
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const imgSrc = product.img || '/img/cake.jpg'

  return (
    <main className="container my-4">
      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <img className="img-fluid rounded-3 border" src={imgSrc} alt={product.name} />
        </div>
        <div className="col-12 col-lg-6 d-flex flex-column">
          <h1 className="h3">{product.name}</h1>
          <div className="text-muted mb-2">{product.category}</div>

          <div className="mb-2">
            <label className="form-label">Tamaño</label>
            <div className="btn-group">
              <button className={`btn btn-outline-secondary ${size==='10p'?'active':''}`} onClick={()=>setSize('10p')}>10 personas</button>
              <button className={`btn btn-outline-secondary ${size==='20p'?'active':''}`} onClick={()=>setSize('20p')}>20 personas</button>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="mensaje">Mensaje especial (opcional)</label>
            <textarea id="mensaje" className="form-control" maxLength={60} value={note} onChange={e=>setNote(e.target.value)} placeholder="Ej: ¡Feliz cumple!" />
            <div className="form-text">Máx. 60 caracteres.</div>
          </div>

          <div className="display-6 mb-3">{MONEDA.format(price)}</div>

          <div className="d-flex gap-2">
            <button className="btn btn-outline-primary" onClick={addToCart}>Añadir al carrito</button>
            {added && (
              <div className="alert alert-success py-2 px-3 mb-0">
                ¡Producto agregado! {note.trim() && `Mensaje: "${note.trim()}"`}
              </div>
            )}
          </div>

          <div className="p-3 border rounded bg-white mt-3">
            <p className="mb-0">{product.description || 'Delicia de la casa.'}</p>
          </div>
        </div>
      </div>
    </main>
  )
}
