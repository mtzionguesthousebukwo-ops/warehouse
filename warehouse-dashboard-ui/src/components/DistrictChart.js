import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
  Label, // 👈 import Label for axis labels
} from "recharts";
import { fetchCapacityReport } from "../api"; // ✅ FIXED

export default function DistrictChart({ filters }) {
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    fetchCapacityReport(filters).then((data) => setDistricts(data.byDistrict || []));
  }, [filters]);

  return (
    <div className="p-3 bg-white rounded-4 shadow-sm">
      <h6 className="text-center fw-bold mb-2">
        WAREHOUSE CAPACITY by District
      </h6>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={districts}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 120, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          {/* X-axis with label */}
          <XAxis type="number">
            <Label value="Capacity" offset={-5} position="insideBottom" />
          </XAxis>

          {/* Y-axis with label */}
          <YAxis dataKey="name" type="category" width={120}>
            <Label
              value="Districts"
              angle={-90}
              position="insideLeft"
              style={{ textAnchor: "middle" }}
            />
          </YAxis>

          <Tooltip />

          <Bar dataKey="capacity" fill="#007bff">
            <LabelList dataKey="capacity" position="right" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
