import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Label,
  LabelList,
} from "recharts";
import { fetchCapacityReport } from "../api"; // ✅ FIXED

function RegionChart({ filters }) {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    fetchCapacityReport(filters).then((data) => {
      console.log("Region Data from API:", data.byRegion); // 👈 debug log
      setRegions(data.byRegion || []);
    });
  }, [filters]);

  return (
    <div className="p-3 bg-white rounded-xl shadow">
      <h6 className="text-center fw-bold mb-2">
        WAREHOUSE CAPACITY by Region
      </h6>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={regions}
          margin={{ top: 20, right: 30, left: 30, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          {/* Regions on X-axis */}
          <XAxis
            dataKey={(entry) => entry.region || entry.name} // ✅ handles both formats
            angle={-30}
            textAnchor="end"
            interval={0}
          >
            <Label value="Regions" position="insideBottom" offset={-40} />
          </XAxis>

          {/* Capacity on Y-axis */}
          <YAxis>
            <Label
              value="Capacity"
              angle={-90}
              position="insideLeft"
              style={{ textAnchor: "middle" }}
            />
          </YAxis>

          <Tooltip />

          <Bar dataKey="capacity" fill="#007bff">
            <LabelList dataKey="capacity" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RegionChart;
