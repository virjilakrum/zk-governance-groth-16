"use client";

import { useState } from "react";
import { VotingHeader } from "@/components/voting/VotingHeader";
import { VotingInterface } from "@/components/voting/VotingInterface";
import { ProposalList } from "@/components/voting/ProposalList";
import { ProofVisualization } from "@/components/zk/ProofVisualization";
import { ProofHistory } from "@/components/zk/ProofHistory";
import { CEODashboard } from "@/components/voting/CEODashboard";
import { useVoteStore } from "@/lib/store/voteStore";
import { useVoting } from "@/lib/hooks/useVoting";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null);
  const [vote, setVote] = useState<'for' | 'against' | null>(null);
  const [activeTab, setActiveTab] = useState("shareholder");

  const { proposals } = useVoteStore();
  const { stage, handleVote } = useVoting();

  const mockShareholderData = {
    shares: 10000,
    hasVoted: false
  };

  const handleVoteSubmit = async () => {
    if (!selectedProposal || !vote) return;

    const success = await handleVote(selectedProposal, vote, mockShareholderData.shares);
    if (success) {
      setSelectedProposal(null);
      setVote(null);
    }
  };

  const selectedProposalData = selectedProposal 
    ? proposals.find(p => p.id === selectedProposal)
    : null;

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <VotingHeader shareholderData={mockShareholderData} />

        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="bg-white/5 border border-white/10">
              <TabsTrigger value="shareholder">Shareholder View</TabsTrigger>
              <TabsTrigger value="ceo">CEO Dashboard</TabsTrigger>
            </TabsList>
            
            <TabsContent value="shareholder" className="space-y-8">
              <ProposalList 
                proposals={proposals}
                onSelect={(id) => setSelectedProposal(id)}
                selectedId={selectedProposal}
              />

              {selectedProposalData && (
                <VotingInterface
                  proposal={selectedProposalData}
                  vote={vote}
                  setVote={setVote}
                  onSubmit={handleVoteSubmit}
                  disabled={!vote || stage !== "setup"}
                  shares={mockShareholderData.shares}
                />
              )}

              <ProofVisualization stage={stage} />
              <ProofHistory />
            </TabsContent>

            <TabsContent value="ceo">
              <CEODashboard />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}