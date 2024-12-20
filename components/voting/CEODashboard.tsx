"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateProposalModal } from "./CreateProposalModal";
import { useVoteStore } from "@/lib/store/voteStore";

export function CEODashboard() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { proposals } = useVoteStore();

  const totalVotes = proposals.reduce((acc, p) => acc + p.votesFor + p.votesAgainst, 0);
  const totalShares = proposals[0]?.totalShares || 0;
  const participation = (totalVotes / totalShares) * 100;

  const data = [
    { name: "Voted", value: totalVotes },
    { name: "Remaining", value: totalShares - totalVotes }
  ];

  const COLORS = ["#22c55e", "#6b7280"];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">CEO Dashboard</h2>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-white text-black hover:bg-gray-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Proposal
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
        >
          <h3 className="text-lg font-medium mb-4">Overall Participation</h3>
          <div className="h-48">
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
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center mt-4">
            <div className="text-2xl font-bold">{Math.round(participation)}%</div>
            <div className="text-sm text-white/70">Total Participation Rate</div>
          </div>
        </motion.div>
      </div>

      <CreateProposalModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </div>
  );
}