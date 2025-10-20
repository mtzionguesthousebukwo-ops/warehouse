import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Filters from "../components/Filters";
import MapView from "../components/MapView";
import DistrictChart from "../components/DistrictChart";
import RegionChart from "../components/RegionChart";

export default function App() {
  const [filters, setFilters] = useState({ region: "", district: "", agency: "", period: "" });

  return (
    <div className="container py-3">
     <div className=" p-3 rounded shadow-sm mb-4 text-center" style={{ backgroundColor: "#97c8faff" }}>
  <h4 className="fw-bold mb-0">ANALYSIS ON WAREHOUSE CAPACITY</h4>
</div>

      <Filters filters={filters} setFilters={setFilters} />
      <div className="row g-3">
        <div className="col-lg-6">
          <div className="p-3 bg-white rounded-4 shadow-sm">
            <MapView filters={filters} />
          </div>
        </div>
        <div className="col-lg-6 d-flex flex-column gap-3">
          <DistrictChart filters={filters} />
          <br/>
          <br/>
          <RegionChart   filters={filters} />
        </div>
      </div>
    </div>
  );


  
}
