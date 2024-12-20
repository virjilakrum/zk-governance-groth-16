export interface Proposal {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  status: 'active' | 'completed';
  votesFor: number;
  votesAgainst: number;
  totalShares: number;
}

export interface Vote {
  id: string;
  proposalId: string;
  shares: number;
  vote: 'for' | 'against';
  timestamp: Date;
  proof: any;
}

export interface ShareholderData {
  shares: number;
  hasVoted: boolean;
}