import React, { useEffect, useState } from "react";

const STORAGE_KEY = "demo_accounts_v1";

const DEFAULT_ACCOUNTS = [
  { id: 1, name: "Juan Pérez", email: "juan@example.com", password: "pass123" },
  { id: 2, name: "María López", email: "maria@example.com", password: "pass456" },
];

export default function Cuentas() {
  const [accounts, setAccounts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      if (Array.isArray(parsed) && parsed.length > 0) {
        setAccounts(parsed);
      } else {
        setAccounts(DEFAULT_ACCOUNTS);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ACCOUNTS));
      }
    } catch (err) {
      setAccounts(DEFAULT_ACCOUNTS);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ACCOUNTS)); } catch {}
    }
  }, []);

  function persist(next) {
    setAccounts(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (err) {}
  }

  function startEdit(ac) {
    setEditingId(ac.id);
    setForm({ name: ac.name || "", email: ac.email || "", password: ac.password || "" });
  }

  function changeField(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function saveEdit() {
    if (!form.email.trim() || !form.password.trim()) {
      alert("Email y contraseña son obligatorios.");
      return;
    }
    const next = accounts.map((a) =>
      a.id === editingId ? { ...a, name: form.name, email: form.email, password: form.password } : a
    );
    persist(next);
    setEditingId(null);
    setForm({ name: "", email: "", password: "" });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm({ name: "", email: "", password: "" });
  }

  function deleteAccount(id) {
    if (!confirm("¿Eliminar esta cuenta de ejemplo? Esta acción no se puede deshacer.")) return;
    const next = accounts.filter((a) => a.id !== id);
    persist(next);
    if (editingId === id) cancelEdit();
  }

  function addAccount() {
    const nextId = accounts.length ? Math.max(...accounts.map((a) => a.id)) + 1 : 1;
    const newAcc = { id: nextId, name: "Nueva cuenta", email: `user${nextId}@example.com`, password: "changeme" };
    const next = [newAcc, ...accounts];
    persist(next);
    startEdit(newAcc);
  }

  function resetDefaults() {
    if (!confirm("Restablecer las cuentas por defecto?")) return;
    persist(DEFAULT_ACCOUNTS);
    alert("Cuentas restablecidas a los ejemplos.");
  }

  return (
    <div>
      <main className="container my-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div>
            <h2 className="h4 mb-0">Cuentas de ejemplo</h2>
            <p className="text-muted small mb-0">Cuentas ficticias que puedes editar o borrar.</p>
          </div>
          <div className="d-flex">
            <button className="btn btn-sm btn-outline-secondary me-2" onClick={resetDefaults}>
              Restablecer defaults
            </button>
            <button className="btn btn-sm btn-outline-primary" onClick={addAccount}>
              + Agregar cuenta
            </button>
          </div>
        </div>

        <div className="row g-3">
          {accounts.length === 0 && (
            <div className="col-12">
              <div className="alert alert-info">No hay cuentas. Pulsa "Agregar cuenta" para crear una.</div>
            </div>
          )}

          {accounts.map((acc) => (
            <div key={acc.id} className="col-12 col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  {editingId === acc.id ? (
                    <>
                      <div className="mb-2">
                        <label className="form-label small">Nombre</label>
                        <input
                          name="name"
                          value={form.name}
                          onChange={changeField}
                          className="form-control"
                          placeholder="Nombre"
                        />
                      </div>
                      <div className="mb-2">
                        <label className="form-label small">Email</label>
                        <input
                          name="email"
                          value={form.email}
                          onChange={changeField}
                          className="form-control"
                          placeholder="correo@ejemplo.com"
                          type="email"
                        />
                      </div>
                      <div className="mb-2">
                        <label className="form-label small">Contraseña</label>
                        <input
                          name="password"
                          value={form.password}
                          onChange={changeField}
                          className="form-control"
                          placeholder="contraseña"
                          type="text"
                        />
                      </div>

                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-success" onClick={saveEdit}>
                          Guardar
                        </button>
                        <button className="btn btn-sm btn-secondary" onClick={cancelEdit}>
                          Cancelar
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h5 className="card-title mb-1">{acc.name}</h5>
                      <p className="mb-1">
                        <strong>Email:</strong> {acc.email}
                      </p>
                      <p className="mb-2">
                        <strong>Contraseña:</strong> <code>{acc.password}</code>
                      </p>

                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-outline-primary" onClick={() => startEdit(acc)}>
                          Editar
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => deleteAccount(acc.id)}>
                          Borrar
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}