"use client";

import { create } from 'zustand';
import { Proposal } from '@/lib/types/voting';

interface ProofRecord {
  id: string;
  proposalId: string;
  vote: 'for' | 'against';
  shares: number;
  proof: any;
  success: boolean;
  timestamp: Date;
}

interface VoteState {
  proposals: Proposal[];
  activeVoters: number;
  totalShares: number;
  proofHistory: ProofRecord[];
  updateVote: (proposalId: string, vote: 'for' | 'against', shares: number) => void;
  incrementActiveVoters: () => void;
  addProposal: (proposal: Proposal) => void;
  addProofRecord: (data: Omit<ProofRecord, 'id' | 'timestamp'>) => void;
}

export const useVoteStore = create<VoteState>((set) => ({
  proposals: [
    {
      id: "1",
      title: "Increase Dividend Payout",
      description: "Proposal to increase quarterly dividend payout by 15% starting next quarter.",
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: "active",
      votesFor: 750000,
      votesAgainst: 250000,
      totalShares: 1500000
    },
    {
      id: "2",
      title: "New Board Member Election",
      description: "Vote for the appointment of Jane Smith as a new board member.",
      deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      status: "active",
      votesFor: 600000,
      votesAgainst: 400000,
      totalShares: 1500000
    }
  ],
  activeVoters: 342,
  totalShares: 1500000,
  proofHistory: [],
  
  updateVote: (proposalId, vote, shares) => 
    set((state) => ({
      proposals: state.proposals.map((proposal) =>
        proposal.id === proposalId
          ? {
              ...proposal,
              votesFor: vote === 'for' ? proposal.votesFor + shares : proposal.votesFor,
              votesAgainst: vote === 'against' ? proposal.votesAgainst + shares : proposal.votesAgainst,
            }
          : proposal
      ),
    })),
    
  incrementActiveVoters: () =>
    set((state) => ({
      activeVoters: state.activeVoters + 1,
    })),
    
  addProposal: (proposal) =>
    set((state) => ({
      proposals: [...state.proposals, proposal],
    })),

  addProofRecord: (data) =>
    set((state) => ({
      proofHistory: [
        {
          ...data,
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date()
        },
        ...state.proofHistory
      ].slice(0, 5) // Keep only last 5 proofs
    })),
}));