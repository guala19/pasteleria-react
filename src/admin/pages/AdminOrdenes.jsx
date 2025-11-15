import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Link } from 'react-router-dom';
import '../styles/admin-layout.css';

/**
 * AdminOrdenes
 * Listado de órdenes con estado y acciones
 */
export default function AdminOrdenes() {
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    // TODO: Obtener del mockDB
    setOrdenes([
      { id: 'ORD001', cliente: 'Juan Pérez', total: 45000, fecha: '2025-11-15', estado: 'Completada' },
      { id: 'ORD002', cliente: 'María López', total: 32500, fecha: '2025-11-15', estado: 'En tránsito' },
      { id: 'ORD003', cliente: 'Carlos M.', total: 67000, fecha: '2025-11-14', estado: 'Pendiente' },
    ]);
  }, []);

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Órdenes</h1>
      </div>

      <div className="content-card">
        <h2 className="content-card-title">Gestión de Órdenes</h2>
        
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.map((orden) => (
              <tr key={orden.id}>
                <td>{orden.id}</td>
                <td>{orden.cliente}</td>
                <td>${orden.total.toLocaleString()}</td>
                <td>{orden.fecha}</td>
                <td>{orden.estado}</td>
                <td>
                  <button className="btn-secondary-admin" style={{padding: '0.4rem 0.8rem', fontSize: '0.85rem'}}>✏️ Ver</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
