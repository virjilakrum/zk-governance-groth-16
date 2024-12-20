"use client";

import { motion } from "framer-motion";
import { Shield, Users, Wallet } from "lucide-react";
import { ShareholderData } from "@/lib/types/voting";

interface VotingHeaderProps {
  shareholderData: ShareholderData;
}

export function VotingHeader({ shareholderData }: VotingHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-16"
    >
      <div className="flex items-center justify-center gap-2 mb-4">
        <Shield className="w-8 h-8 text-white/80" />
        <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
        zkλ Voting Governance
        </h1>
      </div>
      <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
        Zero-knowledge proof-based voting system for corporate governance
      </p>
      
      <motion.div 
        className="flex justify-center gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2 text-white/70">
          <Wallet className="w-5 h-5" />
          <span>{shareholderData.shares.toLocaleString()} shares</span>
        </div>
        <div className="flex items-center gap-2 text-white/70">
          <Users className="w-5 h-5" />
          <span>Voting Power: {((shareholderData.shares / 1500000) * 100).toFixed(2)}%</span>
        </div>
      </motion.div>
    </motion.div>
  );
}