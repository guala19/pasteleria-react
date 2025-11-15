import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import '../styles/admin-layout.css';

export default function AdminPerfil() {
  const [perfil, setPerfil] = useState({
    nombre: 'Carlos Admin',
    email: 'admin@pasteleria.cl',
    telefono: '+56912345678',
    rol: 'Administrador',
  });

  const [editing, setEditing] = useState(false);

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Perfil</h1>
      </div>

      <div className="content-card">
        <h2 className="content-card-title">Mi Perfil</h2>
        
        {!editing ? (
          <div>
            <p><strong>Nombre:</strong> {perfil.nombre}</p>
            <p><strong>Email:</strong> {perfil.email}</p>
            <p><strong>Teléfono:</strong> {perfil.telefono}</p>
            <p><strong>Rol:</strong> {perfil.rol}</p>
            <button 
              className="btn-primary-admin"
              onClick={() => setEditing(true)}
            >
              Editar Perfil
            </button>
          </div>
        ) : (
          <form onSubmit={(e) => {
            e.preventDefault();
            setEditing(false);
          }}>
            <div className="form-group">
              <label className="form-label">Nombre</label>
              <input 
                className="form-input"
                value={perfil.nombre}
                onChange={(e) => setPerfil({...perfil, nombre: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input 
                className="form-input"
                type="email"
                value={perfil.email}
                onChange={(e) => setPerfil({...perfil, email: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Teléfono</label>
              <input 
                className="form-input"
                value={perfil.telefono}
                onChange={(e) => setPerfil({...perfil, telefono: e.target.value})}
              />
            </div>

            <div style={{display: 'flex', gap: '1rem'}}>
              <button type="submit" className="btn-primary-admin">Guardar Cambios</button>
              <button 
                type="button"
                className="btn-secondary-admin"
                onClick={() => setEditing(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
}
