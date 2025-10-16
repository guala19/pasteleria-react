import { useCart } from '../context/CartContext'

export default function CartPanel() {
  const { items, updateQty, removeIndex, totals, promo, setPromo, MONEDA } = useCart()

  return (
    <>
      <ul id="itemsCarrito" className="list-unstyled vstack gap-2">
        {items.map((item, i) => (
          <li key={i} className="d-flex align-items-center gap-2 border rounded p-2">
            <img src={item.img || '/img/cake.jpg'} alt={item.name} width={56} height={56} style={{objectFit:'cover',borderRadius:8}}/>
            <div className="flex-grow-1">
              <div className="fw-semibold">{item.name} <span className="text-muted">({item.size})</span></div>
              {item.note ? <div className="small text-muted">"{item.note}"</div> : null}
              <div className="small text-muted">{MONEDA.format(item.price)} c/u</div>
            </div>
            <div className="d-flex align-items-center gap-1">
              <button className="btn btn-light btn-sm" onClick={() => updateQty(i, item.qty + 1)}>+</button>
              <input className="form-control form-control-sm" style={{width:60}} type="number" min={1} value={item.qty} onChange={e => updateQty(i, parseInt(e.target.value) || 1)} />
              <button className="btn btn-light btn-sm" onClick={() => updateQty(i, item.qty - 1)}>-</button>
            </div>
            <button className="btn btn-outline-danger btn-sm" onClick={() => removeIndex(i)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <div className="mt-3">
        <label className="form-label mb-1" htmlFor="codigoPromo">Código promocional</label>
        <input id="codigoPromo" className="form-control" value={promo.codigo} onChange={e=>setPromo(p=>({...p,codigo:e.target.value}))} placeholder="FELICES50"/>
      </div>
      <div className="row g-2 mt-2 d-none">
        <div className="col-6">
          <label className="form-label mb-1" htmlFor="nacimiento">Nacimiento</label>
          <input id="nacimiento" type="date" className="form-control" value={promo.nacimiento} onChange={e=>setPromo(p=>({...p,nacimiento:e.target.value}))} />
        </div>
        <div className="col-6">
          <label className="form-label mb-1" htmlFor="correoPromo">Correo</label>
          <input id="correoPromo" type="email" className="form-control" placeholder="usuario@duoc.cl" value={promo.correo} onChange={e=>setPromo(p=>({...p,correo:e.target.value}))} />
        </div>
      </div>
      <button id="aplicarPromos" className="btn btn-outline-secondary mt-2 d-none" onClick={() => {}}>Aplicar</button>
      <p id="msgPromo" className="text-muted small mt-1"></p>

      <div className="mt-3 border-top pt-2">
        <div className="d-flex justify-content-between"><span>Subtotal</span><strong id="subtotalCarrito">{MONEDA.format(totals.subtotal)}</strong></div>
        <div className="d-flex justify-content-between"><span>Descuentos</span><strong id="descuentosCarrito">-{MONEDA.format(totals.descuentos)}</strong></div>
        <div className="d-flex justify-content-between fs-5"><span>Total</span><strong id="totalCarrito">{MONEDA.format(totals.total)}</strong></div>
      </div>
      <button id="btnPagar" className="btn btn-dark mt-3">Ir a pagar</button>
    </>
  )
}

