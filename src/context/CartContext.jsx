import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { MONEDA } from '../utils/money'
import { calcularPromociones } from '../utils/promos'

const CartContext = createContext(null)

const CARRITO_KEY = 'carrito'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem(CARRITO_KEY)) ?? [] } catch { return [] }
  })

  const [promo, setPromo] = useState({ codigo: '', nacimiento: '', correo: '' })

  useEffect(() => {
    localStorage.setItem(CARRITO_KEY, JSON.stringify(items))
  }, [items])

  const totals = useMemo(() => calcularPromociones(items, promo), [items, promo])

  const count = useMemo(() => items.reduce((t, i) => t + i.qty, 0), [items])

  function addItem(item) {
    setItems(prev => {
      const idx = prev.findIndex(x => x.code === item.code && x.size === item.size)
      if (idx >= 0) {
        const copy = prev.slice()
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + (item.qty ?? 1) }
        return copy
      }
      return [...prev, { ...item, qty: item.qty ?? 1 }]
    })
  }

  function updateQty(index, qty) {
    setItems(prev => prev.map((x, i) => i === index ? { ...x, qty: Math.max(1, qty) } : x))
  }

  function removeIndex(index) { setItems(prev => prev.filter((_, i) => i !== index)) }

  function clear() { setItems([]) }

  const value = {
    items, addItem, updateQty, removeIndex, clear,
    count, totals, promo, setPromo, MONEDA
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider')
  return ctx
}

export { useCart }

