"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Proposal } from "@/lib/types/voting";

interface VotingInterfaceProps {
  proposal: Proposal;
  vote: 'for' | 'against' | null;
  setVote: (vote: 'for' | 'against' | null) => void;
  onSubmit: () => void;
  disabled: boolean;
  shares: number;
}

export function VotingInterface({ 
  proposal, 
  vote, 
  setVote, 
  onSubmit, 
  disabled,
  shares 
}: VotingInterfaceProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-6">
      <h3 className="text-xl font-semibold">Cast Your Vote</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          onClick={() => setVote('for')}
          className={`p-4 rounded-lg border ${
            vote === 'for' 
              ? 'bg-green-500/20 border-green-500' 
              : 'bg-white/5 border-white/10 hover:bg-white/10'
          }`}
        >
          <ThumbsUp className="w-8 h-8 mx-auto mb-2" />
          <div className="text-sm">Vote For</div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          onClick={() => setVote('against')}
          className={`p-4 rounded-lg border ${
            vote === 'against' 
              ? 'bg-red-500/20 border-red-500' 
              : 'bg-white/5 border-white/10 hover:bg-white/10'
          }`}
        >
          <ThumbsDown className="w-8 h-8 mx-auto mb-2" />
          <div className="text-sm">Vote Against</div>
        </motion.button>
      </div>

      <div className="text-sm text-white/70 text-center">
        Voting with {shares.toLocaleString()} shares
      </div>

      <Button
        onClick={onSubmit}
        disabled={disabled}
        className="w-full bg-white text-black hover:bg-gray-200"
      >
        Submit Vote
      </Button>
    </div>
  );
}