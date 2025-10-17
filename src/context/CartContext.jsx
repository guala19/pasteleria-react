import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { MONEDA } from "../utils/money";
import { calcularPromociones } from "../utils/promos";

const CartContext = createContext(null);
const CARRITO_KEY = "carrito";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(CARRITO_KEY));
      return Array.isArray(stored) ? stored : [];
    } catch (err) {
      console.error("⚠️ Error leyendo carrito del localStorage:", err);
      return [];
    }
  });

  const [promo, setPromo] = useState({ codigo: "", nacimiento: "", correo: "" });

  // 🔹 Guardar en localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CARRITO_KEY, JSON.stringify(items));
    } catch (err) {
      console.error("⚠️ Error guardando carrito:", err);
    }
  }, [items]);

  // 🔹 Calcular totales con fallback
  const totals = useMemo(() => {
    try {
      return calcularPromociones(items, promo);
    } catch (err) {
      console.error("⚠️ Error calculando promociones:", err);
      return { total: 0, descuentos: 0, subtotal: 0 };
    }
  }, [items, promo]);

  // 🔹 Contador de productos
  const count = useMemo(() => {
    try {
      return items.reduce((t, i) => t + (i.qty || 0), 0);
    } catch (err) {
      console.error("⚠️ Error calculando cantidad total:", err);
      return 0;
    }
  }, [items]);

  // 🔹 Operaciones del carrito
  function addItem(item) {
    if (!item || !item.code) return;
    setItems((prev) => {
      const idx = prev.findIndex((x) => x.code === item.code && x.size === item.size);
      if (idx >= 0) {
        const copy = prev.slice();
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + (item.qty ?? 1) };
        return copy;
      }
      return [...prev, { ...item, qty: item.qty ?? 1 }];
    });
  }

  function updateQty(index, qty) {
    setItems((prev) =>
      prev.map((x, i) => (i === index ? { ...x, qty: Math.max(1, Number(qty) || 1) } : x))
    );
  }

  function removeIndex(index) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function clear() {
    setItems([]);
  }

  const value = useMemo(
    () => ({
      items,
      addItem,
      updateQty,
      removeIndex,
      clear,
      count,
      totals,
      promo,
      setPromo,
      MONEDA,
    }),
    [items, count, totals, promo]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// 🧩 Hook seguro
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    console.warn(
      "⚠️ useCart fue usado fuera de CartProvider. Se devolverá un contexto vacío para evitar crash."
    );
    return {
      items: [],
      addItem: () => {},
      updateQty: () => {},
      removeIndex: () => {},
      clear: () => {},
      count: 0,
      totals: { total: 0, descuentos: 0, subtotal: 0 },
      promo: { codigo: "", nacimiento: "", correo: "" },
      setPromo: () => {},
      MONEDA,
    };
  }
  return ctx;
}
