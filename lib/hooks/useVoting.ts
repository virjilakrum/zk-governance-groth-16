"use client";

import { useState } from 'react';
import { useVoteStore } from '@/lib/store/voteStore';

export function useVoting() {
  const [stage, setStage] = useState<"setup" | "proving" | "verifying" | "complete">("setup");
  const { updateVote, incrementActiveVoters, addProofRecord } = useVoteStore();

  const handleVote = async (
    proposalId: string,
    vote: 'for' | 'against',
    shares: number
  ) => {
    try {
      setStage("proving");
      
      // Update vote in store
      updateVote(proposalId, vote, shares);
      incrementActiveVoters();
      
      // Simulate proof generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStage("verifying");
      
      // Generate mock proof data
      const proofData = {
        commitment: `0x${Math.random().toString(16).slice(2)}`,
        challenge: `0x${Math.random().toString(16).slice(2)}`,
        response: `0x${Math.random().toString(16).slice(2)}`
      };
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStage("complete");
      
      // Add proof record
      addProofRecord({
        proposalId,
        vote,
        shares,
        proof: proofData,
        success: true
      });
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStage("setup");
      
      return true;
    } catch (error) {
      console.error("Vote verification failed:", error);
      setStage("setup");
      return false;
    }
  };

  return {
    stage,
    handleVote,
  };
}