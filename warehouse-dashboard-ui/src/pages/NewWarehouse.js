// src/pages/WarehousePage.js
import React, { useEffect, useState } from "react";
import {
  fetchWarehouses,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
  fetchDistricts,
  fetchAgencies,
} from "../api";

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
    const [wh, d, a] = await Promise.all([
      fetchWarehouses(),
      fetchDistricts(),
      fetchAgencies(),
    ]);
    setWarehouses(wh);
    setDistricts(d);
    setAgencies(a);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateWarehouse(editingId, form);
    } else {
      await createWarehouse(form);
    }
    setForm({ name: "", district_id: "", agency_id: "" });
    setEditingId(null);
    loadData();
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
    if (window.confirm("Are you sure you want to delete this warehouse?")) {
      await deleteWarehouse(id);
      loadData();
    }
  };

  return (
    <div className="p-4">
      <h3 className="fw-bold mb-4">Warehouses</h3>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="p-3 mb-4 bg-white rounded shadow-sm"
      >
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Warehouse Name"
              required
            />
          </div>

          <div className="col-md-3">
            <select
              name="district_id"
              value={form.district_id}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">-- Select District --</option>
              {districts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <select
              name="agency_id"
              value={form.agency_id}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">-- Select Agency --</option>
              {agencies.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100">
              {editingId ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </form>

      {/* Table */}
      <div className="table-responsive bg-white rounded shadow-sm p-3">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Name</th>
              <th>District</th>
              <th>Agency</th>
              <th style={{ width: "150px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {warehouses.map((wh) => (
              <tr key={wh.id}>
                <td>{wh.name}</td>
                <td>{wh.district?.name || wh.district_id}</td>
                <td>{wh.agency?.name || wh.agency_id}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(wh)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(wh.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {warehouses.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-muted">
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
