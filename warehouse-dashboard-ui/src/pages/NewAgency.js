import React, { useEffect, useState } from "react";
import { fetchAgencies, createAgency, updateAgency, deleteAgency } from "../api";

export default function Agencies() {
  const [agencies, setAgencies] = useState([]);
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    loadAgencies();
  }, []);

  const loadAgencies = async () => {
    const { data } = await fetchAgencies();
    setAgencies(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await updateAgency(editing, { name });
    } else {
      await createAgency({ name });
    }
    setName("");
    setEditing(null);
    loadAgencies();
  };

  const handleDelete = async (id) => {
    await deleteAgency(id);
    loadAgencies();
  };

  const handleEdit = (agency) => {
    setEditing(agency.id);
    setName(agency.name);
  };

  return (
    <div>
      <h2>Agencies</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Agency Name"
          required
        />
        <button type="submit">{editing ? "Update" : "Add"}</button>
      </form>
      <ul>
        {agencies.map((a) => (
          <li key={a.id}>
            {a.name}{" "}
            <button onClick={() => handleEdit(a)}>Edit</button>{" "}
            <button onClick={() => handleDelete(a.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
