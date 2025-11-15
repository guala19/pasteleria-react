import React from 'react';
import AdminSidebar from './AdminSidebar';
import '../styles/admin-layout.css';

/**
 * AdminLayout Component
 * 
 * Wrapper que envuelve todas las páginas admin
 * Proporciona: Sidebar + Área de contenido
 * 
 * @component
 * @param {React.ReactNode} children - Contenido de la página admin
 * @returns {React.ReactElement} Layout con sidebar y contenido
 */
export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">
        {children}
      </main>
    </div>
  );
}
