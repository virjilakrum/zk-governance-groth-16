"use client";

import { motion } from "framer-motion";
import { ProposalCard } from "./ProposalCard";
import { Proposal } from "@/lib/types/voting";

interface ProposalListProps {
  proposals: Proposal[];
  onSelect: (id: string) => void;
  selectedId: string | null;
}

export function ProposalList({ proposals, onSelect, selectedId }: ProposalListProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {proposals.map((proposal, index) => (
        <motion.div
          key={proposal.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <ProposalCard 
            proposal={proposal} 
            onSelect={() => onSelect(proposal.id)}
            isSelected={proposal.id === selectedId}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}