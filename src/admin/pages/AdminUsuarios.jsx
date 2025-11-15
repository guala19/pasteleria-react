import React from 'react';
import AdminLayout from '../components/AdminLayout';
import '../styles/admin-layout.css';

export default function AdminUsuarios() {
  const [usuarios] = React.useState([
    { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com', rol: 'Cliente' },
    { id: 2, nombre: 'María López', email: 'maria@example.com', rol: 'Cliente' },
    { id: 3, nombre: 'Carlos Admin', email: 'admin@pasteleria.cl', rol: 'Admin' },
  ]);

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Usuarios</h1>
        <div className="admin-page-actions">
          <button className="btn-primary-admin">+ Nuevo Usuario</button>
        </div>
      </div>

      <div className="content-card">
        <h2 className="content-card-title">Gestión de Usuarios</h2>
        
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((user) => (
              <tr key={user.id}>
                <td>{user.nombre}</td>
                <td>{user.email}</td>
                <td>{user.rol}</td>
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
