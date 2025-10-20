import React, { useEffect, useState } from "react";
import {
  fetchRegions,
  createRegion,
  updateRegion,
  deleteRegion,
} from "../api";

export default function RegionsPage() {
  const [regions, setRegions] = useState([]);
  const [form, setForm] = useState({ name: "", geojson: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadRegions();
  }, []);

  const loadRegions = async () => {
    setRegions(await fetchRegions());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateRegion(editingId, form);
      setEditingId(null);
    } else {
      await createRegion(form);
    }
    setForm({ name: "", geojson: "" });
    loadRegions();
  };

  const handleEdit = (r) => {
    setForm({ name: r.name, geojson: r.geojson || "" });
    setEditingId(r.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this region?")) {
      await deleteRegion(id);
      loadRegions();
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Regions</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Region name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <textarea
          placeholder="GeoJSON (optional)"
          value={form.geojson}
          onChange={(e) => setForm({ ...form, geojson: e.target.value })}
          rows={3}
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
            <th>Name</th>
            <th>GeoJSON</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {regions.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.name}</td>
              <td>{r.geojson ? r.geojson.substring(0, 30) + "..." : "-"}</td>
              <td>
                <button onClick={() => handleEdit(r)}>Edit</button>
                <button onClick={() => handleDelete(r.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
