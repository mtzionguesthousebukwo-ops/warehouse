import React, { useEffect, useState } from "react";
import {
  fetchDistricts,
  createDistrict,
  updateDistrict,
  deleteDistrict,
  fetchRegions,
} from "../api";

export default function DistrictsPage() {
  const [districts, setDistricts] = useState([]);
  const [regions, setRegions] = useState([]);
  const [form, setForm] = useState({ name: "", region_id: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadDistricts();
    fetchRegions().then(setRegions);
  }, []);

  const loadDistricts = async () => {
    setDistricts(await fetchDistricts());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateDistrict(editingId, form);
      setEditingId(null);
    } else {
      await createDistrict(form);
    }
    setForm({ name: "", region_id: "" });
    loadDistricts();
  };

  const handleEdit = (d) => {
    setForm({ name: d.name, region_id: d.region_id });
    setEditingId(d.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this district?")) {
      await deleteDistrict(id);
      loadDistricts();
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Districts</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="District name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <select
          value={form.region_id}
          onChange={(e) => setForm({ ...form, region_id: e.target.value })}
          required
        >
          <option value="">Select Region</option>
          {regions.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>

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
            <th>Region</th>
            <th>GeoJSON</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {districts.map((d) => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.region?.name || d.region_id}</td>
              <td>{d.geojson ? d.geojson.substring(0, 30) + "..." : "-"}</td>
              <td>
                <button onClick={() => handleEdit(d)}>Edit</button>
                <button onClick={() => handleDelete(d.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
