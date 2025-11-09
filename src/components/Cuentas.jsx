import React, { useEffect, useState } from "react";

export default function Cuentas() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("users") || "[]";
      setUsers(JSON.parse(raw));
    } catch {
      setUsers([]);
    }
  }, []);

  function eliminar(email) {
    const filtrados = users.filter(u => u.email !== email);
    setUsers(filtrados);
    localStorage.setItem("users", JSON.stringify(filtrados));
  }

  return (
    <div>
      <main className="container my-4">
        <h2>Usuarios / Cuentas guardadas</h2>
        {users.length === 0 ? (
          <p className="text-muted">No hay cuentas guardadas en este navegador.</p>
        ) : (
          <div className="list-group">
            {users.map((u) => (
              <div key={u.email} className="list-group-item d-flex align-items-center justify-content-between">
                <div>
                  <div className="fw-bold">{u.name ?? "(sin nombre)"}</div>
                  <div className="small text-muted">{u.email}</div>
                </div>
                <div>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(u.email)}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}