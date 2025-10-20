import React, { useEffect, useState } from "react";
import {
  fetchPeriods,
  createPeriod,
  updatePeriod,
  deletePeriod,
} from "../../api";

export default function PeriodsPage() {
  const [periods, setPeriods] = useState([]);
  const [form, setForm] = useState({ name: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadPeriods();
  }, []);

  const loadPeriods = async () => {
    try {
      setPeriods(await fetchPeriods());
    } catch (err) {
      console.error("Failed to fetch periods:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updatePeriod(editingId, form);
        setEditingId(null);
      } else {
        await createPeriod(form);
      }
      setForm({ name: "" });
      loadPeriods();
    } catch (err) {
      console.error("Failed to save period:", err);
    }
  };

  const handleEdit = (p) => {
    setForm({ name: p.name });
    setEditingId(p.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this period?")) {
      try {
        await deletePeriod(id);
        loadPeriods();
      } catch (err) {
        console.error("Failed to delete period:", err);
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Periods</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Period name (e.g., 2025 Q1)"
          className="border rounded px-2 py-1 w-full"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      {/* List */}
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Period</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {periods.map((p) => (
            <tr key={p.id}>
              <td className="border px-2 py-1">{p.id}</td>
              <td className="border px-2 py-1">{p.name}</td>
              <td className="border px-2 py-1">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleEdit(p)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {periods.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center text-gray-500 py-2">
                No periods found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
