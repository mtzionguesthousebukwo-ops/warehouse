// src/pages/WarehousePage.js
import React, { useEffect, useState } from "react";
import {
  fetchWarehouses,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
  fetchDistricts,
  fetchAgencies,
} from "../../api";

export default function WarehousePage() {
  const [warehouses, setWarehouses] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [form, setForm] = useState({ name: "", district_id: "", agency_id: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [wh, d, a] = await Promise.all([
        fetchWarehouses(),
        fetchDistricts(),
        fetchAgencies(),
      ]);
      setWarehouses(wh);
      setDistricts(d);
      setAgencies(a);
    } catch (err) {
      console.error("Error loading data:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateWarehouse(editingId, form);
      } else {
        await createWarehouse(form);
      }
      setForm({ name: "", district_id: "", agency_id: "" });
      setEditingId(null);
      loadData();
    } catch (err) {
      console.error("Error saving warehouse:", err);
    }
  };

  const handleEdit = (wh) => {
    setForm({
      name: wh.name,
      district_id: wh.district_id,
      agency_id: wh.agency_id,
    });
    setEditingId(wh.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this warehouse?")) {
      try {
        await deleteWarehouse(id);
        loadData();
      } catch (err) {
        console.error("Error deleting warehouse:", err);
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Warehouses</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow p-4 rounded mb-6 flex flex-wrap gap-3"
      >
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Warehouse Name"
          className="border rounded px-2 py-1 flex-1"
          required
        />

        <select
          name="district_id"
          value={form.district_id}
          onChange={handleChange}
          className="border rounded px-2 py-1 flex-1"
          required
        >
          <option value="">-- Select District --</option>
          {districts.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        <select
          name="agency_id"
          value={form.agency_id}
          onChange={handleChange}
          className="border rounded px-2 py-1 flex-1"
          required
        >
          <option value="">-- Select Agency --</option>
          {agencies.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">District</th>
              <th className="border px-2 py-1">Agency</th>
              <th className="border px-2 py-1 w-32">Actions</th>
            </tr>
          </thead>
          <tbody>
            {warehouses.map((wh) => (
              <tr key={wh.id}>
                <td className="border px-2 py-1">{wh.name}</td>
                <td className="border px-2 py-1">{wh.district?.name || wh.district_id}</td>
                <td className="border px-2 py-1">{wh.agency?.name || wh.agency_id}</td>
                <td className="border px-2 py-1 text-center">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleEdit(wh)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(wh.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {warehouses.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-2">
                  No warehouses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
