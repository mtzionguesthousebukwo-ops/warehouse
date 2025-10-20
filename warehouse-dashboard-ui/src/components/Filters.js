import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { fetchRegions, fetchDistricts, fetchAgencies, fetchPeriods } from "../api";

export default function Filters({ filters, setFilters }) {
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [periods, setPeriods] = useState([]);

  useEffect(() => {
    fetchRegions().then(setRegions);
    fetchDistricts().then(setDistricts);
    fetchAgencies().then(setAgencies);
    fetchPeriods().then(setPeriods);
  }, []);

  const handle = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

  return (
    <div className="d-flex gap-3 flex-wrap mb-3 justify-content-center">
      {/* District */}
      <Form.Group className="d-flex flex-column align-items-start">
        <Form.Label className="fw-bold small mb-1">District</Form.Label>
        <Form.Select
          name="district"
          value={filters.district}
          onChange={handle}
          className="form-select-sm shadow-sm"
          style={{ width: "180px" }}
        >
          <option value="">All</option>
          {districts.map((d) => (
            <option key={d.id} value={d.name}>
              {d.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      {/* Sub-County (placeholder for now if API not ready) */}
      <Form.Group className="d-flex flex-column align-items-start">
        <Form.Label className="fw-bold small mb-1">Sub-County</Form.Label>
        <Form.Select
          name="subcounty"
          value={filters.subcounty || ""}
          onChange={handle}
          className="form-select-sm shadow-sm"
          style={{ width: "180px" }}
        >
          <option value="">All</option>
          {/* populate dynamically later if needed */}
        </Form.Select>
      </Form.Group>

      {/* Region */}
      <Form.Group className="d-flex flex-column align-items-start">
        <Form.Label className="fw-bold small mb-1">Region</Form.Label>
        <Form.Select
          name="region"
          value={filters.region}
          onChange={handle}
          className="form-select-sm shadow-sm"
          style={{ width: "180px" }}
        >
          <option value="">All</option>
          {regions.map((r) => (
            <option key={r.id} value={r.name}>
              {r.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      {/* Agency */}
      <Form.Group className="d-flex flex-column align-items-start">
        <Form.Label className="fw-bold small mb-1">Agency</Form.Label>
        <Form.Select
          name="agency"
          value={filters.agency}
          onChange={handle}
          className="form-select-sm shadow-sm"
          style={{ width: "180px" }}
        >
          <option value="">All</option>
          {agencies.map((a) => (
            <option key={a.id} value={a.name}>
              {a.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      {/* Period */}
      <Form.Group className="d-flex flex-column align-items-start">
        <Form.Label className="fw-bold small mb-1">Period</Form.Label>
        <Form.Select
          name="period"
          value={filters.period}
          onChange={handle}
          className="form-select-sm shadow-sm"
          style={{ width: "180px" }}
        >
          <option value="">All</option>
          {periods.map((p) => (
            <option key={p.id} value={p.name}>
              {p.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
    </div>
  );
}
