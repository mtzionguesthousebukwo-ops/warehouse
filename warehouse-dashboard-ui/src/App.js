import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DataEntryLayout from "./pages/admin/DataEntryLayout";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboard (map + charts) */}
        <Route path="/" element={<Dashboard />} />

        {/* Admin / Data entry section */}
        <Route path="/admin/*" element={<DataEntryLayout />} />
      </Routes>
    </Router>
  );
}
