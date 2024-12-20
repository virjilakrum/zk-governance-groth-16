"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Clock, Check, X, ArrowRight, Shield, XCircle } from "lucide-react";
import { useState } from "react";
import { useVoteStore } from "@/lib/store/voteStore";

interface ProofRecord {
  id: string;
  proposalId: string;
  vote: 'for' | 'against';
  shares: number;
  proof: {
    commitment: string;
    challenge: string;
    response: string;
  };
  success: boolean;
  timestamp: Date;
}

export function ProofHistory() {
  const { proofHistory, proposals } = useVoteStore();
  const [selectedProof, setSelectedProof] = useState<ProofRecord | null>(null);

  const getProposalTitle = (proposalId: string) => {
    return proposals.find(p => p.id === proposalId)?.title || 'Unknown Proposal';
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-xl bg-black/40 backdrop-blur-sm p-6 border border-white/10"
      >
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Recent Proofs
        </h2>
        
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {proofHistory.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-white/50 text-center py-8 border border-dashed border-white/10 rounded-lg"
              >
                <Shield className="w-8 h-8 mx-auto mb-3 opacity-50" />
                <p>No proofs generated yet</p>
              </motion.div>
            ) : (
              proofHistory.map((record) => (
                <motion.div
                  key={record.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="group flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedProof(record)}
                >
                  <div className="flex items-center gap-4">
                    {record.success ? (
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Check className="w-4 h-4 text-green-500" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                        <X className="w-4 h-4 text-red-500" />
                      </div>
                    )}
                    <div>
                      <p className="font-mono text-sm">
                        {record.shares.toLocaleString()} shares voted {record.vote}
                      </p>
                      <p className="text-xs text-white/50">
                        {record.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-white/50 font-mono">
                      {record.proof.commitment.slice(0, 10)}...
                    </div>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-50 transition-opacity" />
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Proof Details Modal */}
      <AnimatePresence>
        {selectedProof && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedProof(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-black/90 border border-white/10 rounded-xl p-6 max-w-2xl w-full space-y-6"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Proof Details</h3>
                  <p className="text-sm text-white/50">
                    {getProposalTitle(selectedProof.proposalId)}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProof(null)}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              {/* Vote Information */}
              <div className="bg-white/5 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Vote Direction</span>
                  <span className="font-mono">{selectedProof.vote}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Shares</span>
                  <span className="font-mono">{selectedProof.shares.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Timestamp</span>
                  <span className="font-mono">{selectedProof.timestamp.toLocaleString()}</span>
                </div>
              </div>

              {/* Proof Components */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-white/70">Zero-Knowledge Proof</h4>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <label className="text-xs text-white/50">Commitment</label>
                    <div className="bg-white/5 p-3 rounded font-mono text-sm break-all">
                      {selectedProof.proof.commitment}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-white/50">Challenge</label>
                    <div className="bg-white/5 p-3 rounded font-mono text-sm break-all">
                      {selectedProof.proof.challenge}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-white/50">Response</label>
                    <div className="bg-white/5 p-3 rounded font-mono text-sm break-all">
                      {selectedProof.proof.response}
                    </div>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${selectedProof.success ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className={selectedProof.success ? 'text-green-500' : 'text-red-500'}>
                  {selectedProof.success ? 'Proof Verified' : 'Verification Failed'}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}