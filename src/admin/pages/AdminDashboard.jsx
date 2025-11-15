import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import '../styles/admin-layout.css';

/**
 * AdminDashboard
 * 
 * Página principal del panel admin
 * Muestra: Stats cards + Últimas órdenes + Productos recientes
 */
export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrdenes: 0,
    totalProductos: 0,
    totalUsuarios: 0,
    ventasHoy: 0,
  });

  const [ultimasOrdenes, setUltimasOrdenes] = useState([]);

  useEffect(() => {
    // TODO: Obtener datos del mockDB
    setStats({
      totalOrdenes: 42,
      totalProductos: 18,
      totalUsuarios: 125,
      ventasHoy: 450000,
    });

    setUltimasOrdenes([
      { id: 'ORD001', cliente: 'Juan Pérez', total: 45000, fecha: '2025-11-15', estado: 'Completada' },
      { id: 'ORD002', cliente: 'María López', total: 32500, fecha: '2025-11-15', estado: 'En tránsito' },
      { id: 'ORD003', cliente: 'Carlos M.', total: 67000, fecha: '2025-11-14', estado: 'Pendiente' },
    ]);
  }, []);

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="admin-page-header">
        <h1 className="admin-page-title">Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="stats-container">
        <div className="stat-card brown">
          <div className="stat-card-number">{stats.totalOrdenes}</div>
          <div className="stat-card-label">Órdenes Totales</div>
        </div>

        <div className="stat-card gold">
          <div className="stat-card-number">{stats.totalProductos}</div>
          <div className="stat-card-label">Productos</div>
        </div>

        <div className="stat-card beige">
          <div className="stat-card-number">{stats.totalUsuarios}</div>
          <div className="stat-card-label">Usuarios</div>
        </div>

        <div className="stat-card brown">
          <div className="stat-card-number">${(stats.ventasHoy / 1000).toFixed(0)}K</div>
          <div className="stat-card-label">Ventas Hoy</div>
        </div>
      </div>

      {/* Últimas Órdenes */}
      <div className="content-card">
        <h2 className="content-card-title">Últimas Órdenes</h2>
        
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID Orden</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>Fecha</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {ultimasOrdenes.map((orden) => (
              <tr key={orden.id}>
                <td><strong>{orden.id}</strong></td>
                <td>{orden.cliente}</td>
                <td>${orden.total.toLocaleString()}</td>
                <td>{orden.fecha}</td>
                <td>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '4px',
                    backgroundColor: orden.estado === 'Completada' ? '#E8F5E9' : orden.estado === 'En tránsito' ? '#FFF3E0' : '#FCE4EC',
                    color: orden.estado === 'Completada' ? '#2E7D32' : orden.estado === 'En tránsito' ? '#E65100' : '#C2185B',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                  }}>
                    {orden.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
