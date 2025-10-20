import React, { useEffect, useState } from "react";
import {
  fetchAgencies,
  createAgency,
  updateAgency,
  deleteAgency,
} from "../../api";

export default function Agencies() {
  const [agencies, setAgencies] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadAgencies();
  }, []);

  const loadAgencies = async () => {
    try {
      const data = await fetchAgencies(); // ✅ our api.js already returns data
      setAgencies(data);
    } catch (err) {
      console.error("Failed to load agencies:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateAgency(editingId, { name });
      } else {
        await createAgency({ name });
      }
      setName("");
      setEditingId(null);
      loadAgencies();
    } catch (err) {
      console.error("Failed to save agency:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this agency?")) {
      await deleteAgency(id);
      loadAgencies();
    }
  };

  const handleEdit = (agency) => {
    setEditingId(agency.id);
    setName(agency.name);
  };

  return (
    <div className="p-4">
      <h2 className="font-bold mb-3">Agencies</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input
          className="border rounded px-2 py-1 flex-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Agency Name"
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
      <ul className="space-y-2">
        {agencies.map((a) => (
          <li
            key={a.id}
            className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded"
          >
            <span>{a.name}</span>
            <div className="flex gap-2">
              <button
                className="bg-yellow-500 text-white px-2 py-1 rounded"
                onClick={() => handleEdit(a)}
              >
                Edit
              </button>
              <button
                className="bg-red-600 text-white px-2 py-1 rounded"
                onClick={() => handleDelete(a.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
        {agencies.length === 0 && (
          <p className="text-gray-500 text-sm">No agencies found.</p>
        )}
      </ul>
    </div>
  );
}
