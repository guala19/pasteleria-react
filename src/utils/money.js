// src/utils/money.js

// 💰 Formateador de moneda chilena (CLP)
export const MONEDA = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
});

// 🧮 Calcula el precio según la cantidad de personas
export function precioPorPersonas(base, clave) {
  // Si la clave indica 20 personas, se suma un valor extra
  return clave === "20p" ? base + 10000 : base;
}

// 🏷️ Devuelve una etiqueta legible según la cantidad de personas
export function etiquetaPersonas(clave) {
  return clave === "20p" ? "20 personas" : "10 personas";
}

// 🔢 Genera un ID único para pedidos
export function generateOrderId() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `ORD-${timestamp}-${random}`.toUpperCase();
}

// 🧾 Formatea valores numéricos como moneda chilena
export function formatearDinero(valor) {
  if (isNaN(valor)) return MONEDA.format(0);
  return MONEDA.format(Number(valor));
}
