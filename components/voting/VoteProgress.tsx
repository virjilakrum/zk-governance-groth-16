"use client";

import { motion } from "framer-motion";

interface VoteProgressProps {
  votesFor: number;
  votesAgainst: number;
  totalShares: number;
}

export function VoteProgress({ votesFor, votesAgainst, totalShares }: VoteProgressProps) {
  const forPercentage = (votesFor / totalShares) * 100;
  const againstPercentage = (votesAgainst / totalShares) * 100;

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm">
        <span>For ({Math.round(forPercentage)}%)</span>
        <span>Against ({Math.round(againstPercentage)}%)</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div className="relative h-full">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${forPercentage}%` }}
            className="absolute left-0 h-full bg-green-500"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${againstPercentage}%` }}
            className="absolute right-0 h-full bg-red-500"
          />
        </div>
      </div>
      <div className="text-sm text-white/70 text-center">
        {totalShares - (votesFor + votesAgainst)} shares remaining
      </div>
    </div>
  );
}