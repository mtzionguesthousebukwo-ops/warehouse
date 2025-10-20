import React, { useEffect, useState } from "react";
import {
  fetchCapacities,
  createCapacity,
  updateCapacity,
  deleteCapacity,
  fetchWarehouses,
  fetchPeriods,
} from "../api";

export default function CapacitiesPage() {
  const [capacities, setCapacities] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [periods, setPeriods] = useState([]);

  const [form, setForm] = useState({ warehouse_id: "", period_id: "", capacity: 0 });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setCapacities(await fetchCapacities());
    setWarehouses(await fetchWarehouses());
    setPeriods(await fetchPeriods());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateCapacity(editingId, form);
      setEditingId(null);
    } else {
      await createCapacity(form);
    }
    setForm({ warehouse_id: "", period_id: "", capacity: 0 });
    loadData();
  };

  const handleEdit = (c) => {
    setForm({
      warehouse_id: c.warehouse_id,
      period_id: c.period_id,
      capacity: c.capacity,
    });
    setEditingId(c.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this capacity record?")) {
      await deleteCapacity(id);
      loadData();
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Warehouse Capacities</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <select
          value={form.warehouse_id}
          onChange={(e) => setForm({ ...form, warehouse_id: e.target.value })}
          required
        >
          <option value="">Select Warehouse</option>
          {warehouses.map((w) => (
            <option key={w.id} value={w.id}>
              {w.name}
            </option>
          ))}
        </select>

        <select
          value={form.period_id}
          onChange={(e) => setForm({ ...form, period_id: e.target.value })}
          required
        >
          <option value="">Select Period</option>
          {periods.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Capacity"
          value={form.capacity}
          onChange={(e) => setForm({ ...form, capacity: e.target.value })}
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
            <th>Warehouse</th>
            <th>Period</th>
            <th>Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {capacities.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.warehouse?.name || c.warehouse_id}</td>
              <td>{c.period?.name || c.period_id}</td>
              <td>{c.capacity}</td>
              <td>
                <button onClick={() => handleEdit(c)}>Edit</button>
                <button onClick={() => handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
