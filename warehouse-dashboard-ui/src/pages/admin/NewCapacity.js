import React, { useEffect, useState } from "react";
import {
  fetchCapacities,
  createCapacity,
  updateCapacity,
  deleteCapacity,
  fetchWarehouses,
  fetchPeriods,
} from "../../api";

export default function CapacitiesPage() {
  const [capacities, setCapacities] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [periods, setPeriods] = useState([]);
  const [form, setForm] = useState({ warehouse_id: "", period_id: "", capacity: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setCapacities(await fetchCapacities());
      setWarehouses(await fetchWarehouses());
      setPeriods(await fetchPeriods());
    } catch (err) {
      console.error("Failed to load capacities data:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateCapacity(editingId, form);
        setEditingId(null);
      } else {
        await createCapacity(form);
      }
      setForm({ warehouse_id: "", period_id: "", capacity: "" });
      loadData();
    } catch (err) {
      console.error("Failed to save capacity:", err);
    }
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
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Warehouse Capacities</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <select
          className="border rounded px-2 py-1"
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
          className="border rounded px-2 py-1"
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
          className="border rounded px-2 py-1 w-32"
          placeholder="Capacity"
          value={form.capacity}
          onChange={(e) => setForm({ ...form, capacity: e.target.value })}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      {/* Table */}
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Warehouse</th>
            <th className="border px-2 py-1">Period</th>
            <th className="border px-2 py-1">Capacity</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {capacities.map((c) => (
            <tr key={c.id}>
              <td className="border px-2 py-1">{c.id}</td>
              <td className="border px-2 py-1">{c.warehouse?.name || c.warehouse_id}</td>
              <td className="border px-2 py-1">{c.period?.name || c.period_id}</td>
              <td className="border px-2 py-1">{c.capacity}</td>
              <td className="border px-2 py-1">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleEdit(c)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(c.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {capacities.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center text-gray-500 py-2">
                No capacities found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
