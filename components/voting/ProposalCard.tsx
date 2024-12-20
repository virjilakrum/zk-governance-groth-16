"use client";

import { motion } from "framer-motion";
import { FileText, Clock, Users } from "lucide-react";
import { Proposal } from "@/lib/types/voting";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface ProposalCardProps {
  proposal: Proposal;
  onSelect: () => void;
  isSelected: boolean;
}

export function ProposalCard({ proposal, onSelect, isSelected }: ProposalCardProps) {
  const progress = (proposal.votesFor / proposal.totalShares) * 100;
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={cn(
        "bg-white/5 backdrop-blur-sm border rounded-xl p-6 cursor-pointer transition-colors duration-200",
        isSelected ? "border-blue-500" : "border-white/10",
        isSelected ? "bg-white/10" : "hover:bg-white/7"
      )}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">{proposal.title}</h3>
          <p className="text-white/70 text-sm line-clamp-2">{proposal.description}</p>
        </div>
        <FileText className="w-6 h-6 text-white/50" />
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="text-white/70">
              Ends {formatDistanceToNow(proposal.deadline, { addSuffix: true })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="text-white/70">
              {proposal.votesFor + proposal.votesAgainst} votes
            </span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-green-500 to-green-400"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}