import React, { useEffect, useState } from "react";
import {
  fetchDistricts,
  createDistrict,
  updateDistrict,
  deleteDistrict,
  fetchRegions,
} from "../../api";

export default function DistrictsPage() {
  const [districts, setDistricts] = useState([]);
  const [regions, setRegions] = useState([]);
  const [form, setForm] = useState({ name: "", region_id: "", geojson: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setDistricts(await fetchDistricts());
      setRegions(await fetchRegions());
    } catch (err) {
      console.error("Failed to load districts/regions:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDistrict(editingId, form);
        setEditingId(null);
      } else {
        await createDistrict(form);
      }
      setForm({ name: "", region_id: "", geojson: "" });
      loadData();
    } catch (err) {
      console.error("Failed to save district:", err);
    }
  };

  const handleEdit = (d) => {
    setForm({
      name: d.name,
      region_id: d.region_id,
      geojson: d.geojson || "",
    });
    setEditingId(d.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this district?")) {
      await deleteDistrict(id);
      loadData();
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Districts</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          type="text"
          className="border rounded px-2 py-1 w-full"
          placeholder="District Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <select
          className="border rounded px-2 py-1 w-full"
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

        <textarea
          className="border rounded px-2 py-1 w-full"
          placeholder="GeoJSON (optional)"
          rows="3"
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

      {/* Table */}
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Region</th>
            <th className="border px-2 py-1">GeoJSON</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {districts.map((d) => (
            <tr key={d.id}>
              <td className="border px-2 py-1">{d.id}</td>
              <td className="border px-2 py-1">{d.name}</td>
              <td className="border px-2 py-1">{d.region?.name || d.region_id}</td>
              <td className="border px-2 py-1">
                {d.geojson ? d.geojson.substring(0, 30) + "..." : "-"}
              </td>
              <td className="border px-2 py-1">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleEdit(d)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(d.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {districts.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center text-gray-500 py-2">
                No districts found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
