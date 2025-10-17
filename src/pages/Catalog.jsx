import { useEffect, useMemo, useState } from 'react'
import { PRODUCTS, CATEGORIES } from '../data/products'
import ProductCard from '../ProductCard'

export default function Catalog() {
  const [shape, setShape] = useState(new Set())
  const [prefs, setPrefs] = useState(new Set())
  const [cats, setCats] = useState(new Set())

  useEffect(() => {

  }, [])

  function toggle(setter, value) {
    setter(prev => {
      const next = new Set(prev)
      next.has(value) ? next.delete(value) : next.add(value)
      return next
    })
  }

  const filtered = useMemo(() => {
    return PRODUCTS.filter(p => {
      if (shape.size && !shape.has(p.type)) return false
      if (cats.size && !cats.has(p.category)) return false
      if (prefs.size) {
        const t = new Set(p.tags || [])
        let ok = false
        for (const v of prefs) if (t.has(v)) { ok = true; break }
        if (!ok) return false
      }
      return true
    })
  }, [shape, prefs, cats])

  return (
    <div className="container my-3">
      <div className="p-3 bg-white rounded-3 shadow-sm mb-3">
        <div className="d-flex gap-2 flex-wrap">
          <div className="dropdown">
            <button className="btn btn-light dropdown-toggle" data-bs-toggle="dropdown">Forma</button>
            <div className="dropdown-menu p-3">
              {['circular','cuadrada'].map(v => (
                <label key={v} className="d-block mb-2">
                  <input type="checkbox" className="form-check-input me-2" checked={shape.has(v)} onChange={()=>toggle(setShape, v)} />
                  <span className="align-middle text-capitalize">{v}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="dropdown">
            <button className="btn btn-light dropdown-toggle" data-bs-toggle="dropdown">Preferencias</button>
            <div className="dropdown-menu p-3">
              {[
                {v:'sin_azucar', l:'Sin azúcar'},
                {v:'sin_gluten', l:'Sin gluten'},
                {v:'vegano', l:'Vegana'}
              ].map(({v,l}) => (
                <label key={v} className="d-block mb-2">
                  <input type="checkbox" className="form-check-input me-2" checked={prefs.has(v)} onChange={()=>toggle(setPrefs, v)} />
                  <span className="align-middle">{l}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="dropdown">
            <button className="btn btn-light dropdown-toggle" data-bs-toggle="dropdown">Categorías</button>
            <div className="dropdown-menu p-3" style={{maxHeight:300,overflow:'auto'}}>
              {CATEGORIES.map(c => (
                <label key={c} className="d-block mb-2">
                  <input type="checkbox" className="form-check-input me-2" checked={cats.has(c)} onChange={()=>toggle(setCats, c)} />
                  <span className="align-middle">{c}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="p-3 bg-white rounded-3 shadow-sm">
        <h2 className="h4">Catálogo</h2>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
          {filtered.map(p => (
            <div key={p.code} className="col"><ProductCard product={p} /></div>
          ))}
        </div>
      </section>
    </div>
  )
}

