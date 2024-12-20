"use client";

import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface VoteChartProps {
  votesFor: number;
  votesAgainst: number;
  totalShares: number;
}

export function VoteChart({ votesFor, votesAgainst, totalShares }: VoteChartProps) {
  const data = [
    { name: "For", value: votesFor },
    { name: "Against", value: votesAgainst },
    { name: "Remaining", value: totalShares - (votesFor + votesAgainst) }
  ];

  const COLORS = ["#22c55e", "#ef4444", "#6b7280"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-64"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ background: "rgba(0,0,0,0.8)", border: "none" }}
            itemStyle={{ color: "#fff" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
}