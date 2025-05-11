"use client"; // only if using App Router (optional but safe)

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#a855f7", "#f97316", "#10b981", "#6366f1", "#ec4899", "#facc15"];

const chartData = [
  { name: "Community Rewards", value: 30 },
  { name: "Team & Advisors", value: 20 },
  { name: "Treasury Reserve", value: 15 },
  { name: "Private Sale", value: 15 },
  { name: "Public Sale (IDO)", value: 10 },
  { name: "Liquidity & CEX", value: 10 },
];

export default function TokenAllocationChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          dataKey="value"
          nameKey="name"
          paddingAngle={4}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#1a1a1d",
            borderColor: "#444",
            color: "#fff",
          }}
        />
        <Legend
          wrapperStyle={{
            color: "white",
            fontSize: "14px",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
