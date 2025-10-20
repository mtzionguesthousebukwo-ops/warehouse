import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="h-screen w-60 bg-gray-900 text-white flex flex-col p-4">
      <h2 className="text-lg font-bold mb-6">📦 Warehouse Dashboard</h2>

      <nav className="flex flex-col gap-2">
        <Link to="/" className="hover:bg-gray-700 p-2 rounded">🏠 Dashboard</Link>

        <p className="mt-4 mb-2 text-gray-400 text-sm">🌍 Geography</p>
        <Link to="/regions/new" className="hover:bg-gray-700 p-2 rounded">Regions</Link>
        <Link to="/districts/new" className="hover:bg-gray-700 p-2 rounded">Districts</Link>

        <p className="mt-4 mb-2 text-gray-400 text-sm">🏢 Organizations</p>
        <Link to="/agencies/new" className="hover:bg-gray-700 p-2 rounded">Agencies</Link>
        <Link to="/warehouses/new" className="hover:bg-gray-700 p-2 rounded">Warehouses</Link>

        <p className="mt-4 mb-2 text-gray-400 text-sm">📅 Time</p>
        <Link to="/periods/new" className="hover:bg-gray-700 p-2 rounded">Periods</Link>

        <p className="mt-4 mb-2 text-gray-400 text-sm">📊 Data</p>
        <Link to="/capacities/new" className="hover:bg-gray-700 p-2 rounded">Capacities</Link>
      </nav>
    </div>
  );
}
