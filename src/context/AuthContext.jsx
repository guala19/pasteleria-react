import React, { createContext, useContext, useState, useEffect } from "react";

/**
 * AuthContext - Sistema de Autenticación Unificado
 * Gestiona autenticación de clientes y administradores
 * - Login/Logout para ambos tipos de usuario
 * - Detección automática de rol
 * - Persistencia en localStorage
 * - Verificación de sesión al cargar
 */
const AuthContext = createContext();

// Base de datos mock con usuarios de prueba
const MOCK_USERS = {
  // Clientes
  clients: [
    {
      id: 101,
      name: "Juan García",
      email: "juan@email.com",
      password: "password123",
      role: "client",
    },
    {
      id: 102,
      name: "María López",
      email: "maria@email.com",
      password: "password123",
      role: "client",
    },
  ],
  // Administradores
  admins: [
    {
      id: 1,
      name: "Administrador",
      email: "admin@pasteleria.cl",
      password: "admin123",
      role: "admin",
    },
    {
      id: 2,
      name: "Gerente",
      email: "gerente@pasteleria.cl",
      password: "gerente123",
      role: "admin",
    },
  ],
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  /**
   * Login unificado para clientes y administradores
   * Detecta automáticamente el tipo de usuario basado en credenciales
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña del usuario
   * @returns {Object} { success: boolean, role?: string, error?: string }
   */
  function login(email, password) {
    // Buscar en administradores
    const admin = MOCK_USERS.admins.find(
      (u) => u.email === email && u.password === password
    );
    if (admin) {
      const adminUser = {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: "admin",
        loginTime: new Date().toISOString(),
      };
      setUser(adminUser);
      setIsAuthenticated(true);
      localStorage.setItem("authUser", JSON.stringify(adminUser));
      return { success: true, role: "admin" };
    }

    // Buscar en clientes
    const client = MOCK_USERS.clients.find(
      (u) => u.email === email && u.password === password
    );
    if (client) {
      const clientUser = {
        id: client.id,
        name: client.name,
        email: client.email,
        role: "client",
        loginTime: new Date().toISOString(),
      };
      setUser(clientUser);
      setIsAuthenticated(true);
      localStorage.setItem("authUser", JSON.stringify(clientUser));
      return { success: true, role: "client" };
    }

    return { success: false, error: "Email o contraseña inválidos" };
  }

  /**
   * Logout - cierra sesión del usuario (cliente o admin)
   */
  function logout() {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("authUser");
  }

  /**
   * Verificar si hay sesión guardada al cargar la app
   */
  useEffect(() => {
    const savedUser = localStorage.getItem("authUser");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing saved user:", error);
        localStorage.removeItem("authUser");
      }
    }
    setLoading(false);
  }, []);

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook para usar el contexto de autenticación
 * @throws {Error} Si se usa fuera de AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
}
