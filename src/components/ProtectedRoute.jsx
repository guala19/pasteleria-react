import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedRoute Component
 * 
 * Envuelve rutas que requieren autenticación
 * Si el usuario NO está autenticado, redirige a /login
 * Si el usuario está autenticado, permite acceso a la ruta
 * 
 * @param {React.ReactNode} children - Componente a renderizar si está autenticado
 * @returns {React.ReactElement} Componente o redirección a login
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  // Mientras se carga la sesión
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  // Si no está autenticado, redirige a login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, renderiza el componente
  return children;
}
