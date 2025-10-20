import React, { useEffect, useState } from "react";
import {
  fetchRegions,
  createRegion,
  updateRegion,
  deleteRegion,
} from "../../api";

export default function RegionsPage() {
  const [regions, setRegions] = useState([]);
  const [form, setForm] = useState({ name: "", geojson: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadRegions();
  }, []);

  const loadRegions = async () => {
    try {
      setRegions(await fetchRegions());
    } catch (err) {
      console.error("Failed to fetch regions:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateRegion(editingId, form);
        setEditingId(null);
      } else {
        await createRegion(form);
      }
      setForm({ name: "", geojson: "" });
      loadRegions();
    } catch (err) {
      console.error("Failed to save region:", err);
    }
  };

  const handleEdit = (r) => {
    setForm({ name: r.name, geojson: r.geojson || "" });
    setEditingId(r.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this region?")) {
      try {
        await deleteRegion(id);
        loadRegions();
      } catch (err) {
        console.error("Failed to delete region:", err);
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Regions</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Region name"
          className="border rounded px-2 py-1 w-full"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <textarea
          placeholder="GeoJSON (optional)"
          className="border rounded px-2 py-1 w-full"
          rows={3}
          value={form.geojson}
          onChange={(e) => setForm({ ...form, geojson: e.target.value })}
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
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">GeoJSON</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {regions.map((r) => (
            <tr key={r.id}>
              <td className="border px-2 py-1">{r.id}</td>
              <td className="border px-2 py-1">{r.name}</td>
              <td className="border px-2 py-1">
                {r.geojson ? r.geojson.substring(0, 30) + "..." : "-"}
              </td>
              <td className="border px-2 py-1">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleEdit(r)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(r.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {regions.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center text-gray-500 py-2">
                No regions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
