import React, { useEffect, useState } from "react";
import {
  fetchPeriods,
  createPeriod,
  updatePeriod,
  deletePeriod,
} from "../api";

export default function PeriodsPage() {
  const [periods, setPeriods] = useState([]);
  const [form, setForm] = useState({ name: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadPeriods();
  }, []);

  const loadPeriods = async () => {
    setPeriods(await fetchPeriods());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updatePeriod(editingId, form);
      setEditingId(null);
    } else {
      await createPeriod(form);
    }
    setForm({ name: "" });
    loadPeriods();
  };

  const handleEdit = (p) => {
    setForm({ name: p.name });
    setEditingId(p.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this period?")) {
      await deletePeriod(id);
      loadPeriods();
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Periods</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Period name (e.g., 2025 Q1)"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <button type="submit">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      {/* List */}
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Period</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {periods.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
