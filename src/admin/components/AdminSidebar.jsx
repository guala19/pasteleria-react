import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/admin-sidebar.css';

/**
 * AdminSidebar Component
 * 
 * Barra lateral de navegación del panel admin
 * Elementos principales: Dashboard, Órdenes, Productos, Usuarios y Perfil
 * 
 * @component
 * @returns {React.ReactElement} Sidebar con navegación admin simplificada
 */
export default function AdminSidebar() {
  const location = useLocation();

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/ordenes', label: 'Órdenes', icon: '📦' },
    { path: '/admin/productos', label: 'Productos', icon: '🍰' },
    { path: '/admin/usuarios', label: 'Usuarios', icon: '👥' },
    { path: '/admin/perfil', label: 'Perfil', icon: '⚙️' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="admin-sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-circle">🍰</div>
        <div className="logo-text">
          <div className="logo-title">Pastelería</div>
          <div className="logo-subtitle">Mil Sabores</div>
        </div>
      </div>

      {/* Navegación */}
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {navItems.map((item) => (
            <li key={item.path} className={isActive(item.path) ? 'nav-item active' : 'nav-item'}>
              <Link to={item.path} className="nav-link">
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer Sidebar */}
      <div className="sidebar-footer">
        <p className="version">v1.0 Admin</p>
      </div>
    </aside>
  );
}
