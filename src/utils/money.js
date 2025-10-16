export const MONEDA = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' })

export function precioPorPersonas(base, clave) {
  return clave === '20p' ? base + 10000 : base
}

export function etiquetaPersonas(clave) {
  return clave === '20p' ? '20 personas' : '10 personas'
}

