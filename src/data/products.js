// Copia de data/products.js desde el proyecto original
// Nota: Algunos caracteres acentuados pueden verse alterados según codificación
export const CATEGORIES = [
  "Tortas Cuadradas",
  "Tortas Circulares",
  "Postres Individuales",
  "Productos Sin Azúcar",
  "Pastelería Tradicional",
  "Productos Sin Gluten",
  "Productos Veganos",
  "Tortas Especiales"
]

export const PRODUCTS = [
  { code: "TC001", category: "Tortas Cuadradas", name: "Torta Cuadrada de Chocolate", price: 45000, type: "cuadrada", img: "/img/products/torta_cuadrada_chocolate.png", description: "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas.", ingredients: ["Harina", "Cacao", "Azúcar", "Huevos", "Mantequilla", "Ganache de chocolate", "Avellanas"] },
  { code: "TC002", category: "Tortas Cuadradas", name: "Torta Cuadrada de Frutas", price: 50000, type: "cuadrada", img: "/img/products/torta_cuadrada_frutas.png", description: "Bizcocho de vainilla con frutas frescas y crema chantilly.", ingredients: ["Harina", "Azúcar", "Huevos", "Vainilla", "Crema chantilly", "Frutas frescas"] },
  { code: "TT001", category: "Tortas Circulares", name: "Torta Circular de Vainilla", price: 40000, type: "circular", img: "/img/products/torta_circular_vainilla.png", description: "Bizcocho de vainilla clásico relleno con crema pastelera y glaseado.", ingredients: ["Harina", "Azúcar", "Huevos", "Vainilla", "Crema pastelera", "Glaseado"] },
  { code: "TT002", category: "Tortas Circulares", name: "Torta Circular de Manjar", price: 42000, type: "circular", img: "/img/products/torta_circular_vainilla.png", description: "Tradicional chilena con manjar y nueces.", ingredients: ["Harina", "Azúcar", "Huevos", "Manjar", "Nueces"] },
  { code: "PI001", category: "Postres Individuales", name: "Mousse de Chocolate", price: 5000, type: "otro", img: "/img/products/torta_cuadrada_chocolate.png", description: "Mousse cremoso de chocolate.", ingredients: ["Chocolate", "Crema", "Azúcar", "Gelatina", "Cacao"] },
  { code: "PI002", category: "Postres Individuales", name: "Tiramisú Clásico", price: 5500, type: "otro", img: "/img/products/torta_cuadrada_frutas.png", description: "Capas de café, mascarpone y cacao.", ingredients: ["Bizcochos", "Café", "Mascarpone", "Azúcar", "Cacao"] },
  { code: "PSA001", category: "Productos Sin Azúcar", name: "Torta Sin Azúcar de Naranja", price: 48000, type: "otro", img: "/img/products/torta_circular_vainilla.png", description: "Endulzada naturalmente.", ingredients: ["Harina", "Endulzante", "Huevos", "Naranja", "Aceite"], tags: ["sin_azucar"] },
  { code: "PSA002", category: "Productos Sin Azúcar", name: "Cheesecake Sin Azúcar", price: 47000, type: "otro", img: "/img/products/cheesecake_sin_azucar.png", description: "Cheesecake suave y cremoso.", ingredients: ["Queso crema", "Endulzante", "Huevos", "Base de galletas sin azúcar"], tags: ["sin_azucar"] },
  { code: "PG001", category: "Productos sin gluten", name: "Brownie Sin Gluten", price: 4000, type: "otro", img: "/img/products/brownie_sin_gluten.png", description: "Brownie sin gluten.", ingredients: ["Chocolate","Mantequilla","Azúcar","Huevos","Harina sin gluten"], tags: ["sin_gluten"] },
  { code: "PG002", category: "Productos sin gluten", name: "Pan Sin Gluten", price: 3500, type: "otro", img: "/img/products/pan_sin_gluten.png", description: "Pan sin gluten.", ingredients: ["Harina sin gluten","Levadura","Agua","Sal","Aceite"], tags: ["sin_gluten"] },
  { code: "PV001", category: "Productos Veganos", name: "Torta Vegana de Chocolate", price: 50000, type: "otro", img: "/img/products/torta_vegana_chocolate.png", description: "Torta vegana de chocolate.", ingredients: ["Harina","Cacao","Azúcar","Leche vegetal","Aceite"], tags: ["vegano"] },
  { code: "PV002", category: "Productos Veganos", name: "Galletas Veganas de Avena", price: 4500, type: "otro", img: "/img/products/torta_vegana_chocolate.png", description: "Galletas veganas de avena.", ingredients: ["Avena","Azúcar","Aceite vegetal","Esencia de vainilla"], tags: ["vegano"] },
  { code: "TE001", category: "Tortas Especiales", name: "Torta Especial de Cumpleaños", price: 55000, type: "circular", img: "/img/products/torta_cumpleanos.png", description: "Para celebraciones.", ingredients: ["Harina","Azúcar","Huevos","Vainilla","Crema","Decoraciones"] },
  { code: "TE002", category: "Tortas Especiales", name: "Torta Especial de Boda", price: 60000, type: "circular", img: "/img/products/torta_boda.png", description: "Elegante para bodas.", ingredients: ["Harina","Azúcar","Huevos","Relleno a elección","Cobertura especial","Decoraciones"] }
]
