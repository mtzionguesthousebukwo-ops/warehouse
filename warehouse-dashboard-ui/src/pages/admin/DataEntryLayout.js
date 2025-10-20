import { Link, Routes, Route } from "react-router-dom";
import NewDistrict from "./NewDistrict";
import NewAgency from "./NewAgency";
import NewWarehouse from "./NewWarehouse";
import NewPeriod from "./NewPeriod";
import NewCapacity from "./NewCapacity";
import NewRegion from "./NewRegion";   // 🔹 add this

export default function DataEntryLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <nav className="space-y-2">
          <Link to="regions/new" className="block hover:bg-gray-700 p-2 rounded">
            ➕ Region
          </Link>
          <Link to="districts/new" className="block hover:bg-gray-700 p-2 rounded">
            ➕ District
          </Link>
          <Link to="agencies/new" className="block hover:bg-gray-700 p-2 rounded">
            ➕ Agency
          </Link>
          <Link to="warehouses/new" className="block hover:bg-gray-700 p-2 rounded">
            ➕ Warehouse
          </Link>
          <Link to="periods/new" className="block hover:bg-gray-700 p-2 rounded">
            ➕ Period
          </Link>
          <Link to="capacities/new" className="block hover:bg-gray-700 p-2 rounded">
            ➕ Capacity
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Routes>
          <Route path="regions/new" element={<NewRegion />} />     {/* 🔹 add this */}
          <Route path="districts/new" element={<NewDistrict />} />
          <Route path="agencies/new" element={<NewAgency />} />
          <Route path="warehouses/new" element={<NewWarehouse />} />
          <Route path="periods/new" element={<NewPeriod />} />
          <Route path="capacities/new" element={<NewCapacity />} />
        </Routes>
      </main>
    </div>
  );
}
