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
  Legend,
} from "recharts";
import { fetchCapacityReport } from "../api"; // ✅ FIXED

// ✅ Custom tooltip that shows ONLY the hovered bar segment
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const hovered = payload.find((p) => p.payload && p.value !== 0);

    if (hovered) {
      return (
        <div className="bg-white border p-2 rounded shadow text-sm">
          <p className="m-0">
            <strong>District:</strong> {label}
          </p>
          <p className="m-0">
            <strong>Period:</strong> {hovered.dataKey}
          </p>
          <p className="m-0">
            <strong>Capacity:</strong> {hovered.value.toLocaleString()}
          </p>
        </div>
      );
    }
  }
  return null;
};

export default function PeriodComparison({ filters }) {
  const [periods, setPeriods] = useState([]);
  const [periodKeys, setPeriodKeys] = useState([]);

  useEffect(() => {
    fetchCapacityReport(filters).then((data) => {
      console.log("API raw data:", data?.byPeriod);

      if (data && data.byPeriod && data.byPeriod.length > 0) {
        setPeriods(data.byPeriod);

        const keys = Object.keys(data.byPeriod[0]).filter(
          (k) => k.toLowerCase() !== "district"
        );
        console.log("Detected period keys:", keys);
        setPeriodKeys(keys);
      } else {
        setPeriods([]);
        setPeriodKeys([]);
      }
    });
  }, [filters]);

  const colors = [
    "#ff4d4d",
    "#007bff",
    "#28a745",
    "#ffc107",
    "#6f42c1",
    "#20c997",
  ];

  return (
    <div className="p-3 bg-white rounded-xl shadow">
      <h6 className="text-center font-bold mb-2">
        WAREHOUSE CAPACITY by District (Period Comparison)
      </h6>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={periods}
          margin={{ top: 40, right: 30, left: 120, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          {/* X-axis = Districts */}
          <XAxis dataKey="district" angle={-30} textAnchor="end">
            <Label value="Districts" position="insideBottom" offset={-10} />
          </XAxis>

          {/* Y-axis = Capacity */}
          <YAxis type="number">
            <Label
              value="Capacity"
              angle={-90}
              position="insideLeft"
              style={{ textAnchor: "middle" }}
            />
          </YAxis>

          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" wrapperStyle={{ top: 0 }} />

          {/* Stacked bars for each period */}
          {periodKeys.map((key, i) => (
            <Bar
              key={key}
              dataKey={key}
              stackId="a"
              fill={colors[i % colors.length]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
