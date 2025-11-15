import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import '../styles/admin-layout.css';

export default function AdminProductos() {
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Torta Chocolate', categoria: 'Tartas', precio: 25000, stock: 12 },
    { id: 2, nombre: 'Donas Rellenas', categoria: 'Donas', precio: 8000, stock: 45 },
    { id: 3, nombre: 'Brownie', categoria: 'Postres', precio: 6000, stock: 30 },
  ]);

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Productos</h1>
        <div className="admin-page-actions">
          <button className="btn-primary-admin">+ Nuevo Producto</button>
        </div>
      </div>

      <div className="content-card">
        <h2 className="content-card-title">Listado de Productos</h2>
        
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>{producto.categoria}</td>
                <td>${producto.precio.toLocaleString()}</td>
                <td>{producto.stock}</td>
                <td>
                  <button className="btn-secondary-admin" style={{padding: '0.4rem 0.8rem', fontSize: '0.85rem'}}>✏️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
