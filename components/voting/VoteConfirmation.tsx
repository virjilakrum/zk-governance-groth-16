"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, Shield, Lock, Unlock } from "lucide-react";
import { useEffect, useState } from "react";
import { CryptoAnimation } from "../zk/CryptoAnimation";
import { ParticleField } from "../zk/ParticleField";
import { initializeZKSystem, isInitialized } from "@/lib/zk/setup";
import { generateVoteProof } from "@/lib/zk/prover";
import { verifyVoteProof } from "@/lib/zk/verifier";

interface VoteConfirmationProps {
  show: boolean;
  shares: number;
  vote: 'for' | 'against';
  onComplete: () => void;
}

export function VoteConfirmation({ show, shares, vote, onComplete }: VoteConfirmationProps) {
  const [stage, setStage] = useState<'setup' | 'commitment' | 'challenge' | 'response' | 'verification' | 'complete'>('setup');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (show) {
      handleVoteProcess();
    }
  }, [show]);

  const handleVoteProcess = async () => {
    try {
      // Initialize
      setStage('setup');
      setProgress(0);
      await animateProgress(0, 20);
      
      if (!isInitialized()) {
        await initializeZKSystem();
      }
      
      // Generate proof
      setStage('commitment');
      await animateProgress(20, 40);
      
      const { proof, publicSignals, success } = await generateVoteProof(
        {
          privateKey: BigInt(Math.floor(Math.random() * 1000000)),
          voterAddress: BigInt(Math.floor(Math.random() * 1000000)),
          shares: BigInt(shares),
          voteChoice: BigInt(vote === 'for' ? 1 : 0)
        },
        {
          publicShares: BigInt(shares),
          publicVoteChoice: BigInt(vote === 'for' ? 1 : 0)
        }
      );

      if (!success || !proof || !publicSignals) {
        throw new Error('Failed to generate proof');
      }

      // Verify proof
      setStage('verification');
      await animateProgress(40, 80);
      
      const verified = await verifyVoteProof(proof, publicSignals);
      
      if (!verified) {
        throw new Error('Proof verification failed');
      }

      // Complete
      setStage('complete');
      await animateProgress(80, 100);
      
      setTimeout(onComplete, 2000);

    } catch (error) {
      console.error('Vote process failed:', error);
    }
  };

  const animateProgress = async (from: number, to: number) => {
    const duration = 1000;
    const steps = 60;
    const increment = (to - from) / steps;
    
    for (let i = 0; i <= steps; i++) {
      setProgress(from + increment * i);
      await new Promise(resolve => setTimeout(resolve, duration / steps));
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-lg flex items-center justify-center z-50"
        >
          <ParticleField active={stage !== 'complete'} />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-black/60 border border-white/10 rounded-2xl p-8 max-w-4xl w-full mx-4"
          >
            {/* Progress Bar */}
            <motion.div 
              className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
              style={{ width: `${progress}%` }}
            />

            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex items-center justify-center gap-3 mb-4"
              >
                {stage === 'complete' ? (
                  <Shield className="w-8 h-8 text-green-400" />
                ) : (
                  <Lock className="w-8 h-8 text-blue-400" />
                )}
                <h2 className="text-2xl font-bold">
                  {stage === 'complete' 
                    ? 'Vote Secured!' 
                    : 'Generating Zero-Knowledge Proof'}
                </h2>
              </motion.div>
              
              <p className="text-white/70">
                {shares.toLocaleString()} shares voting {vote}
              </p>
            </div>

            {/* Visualization */}
            <div className="relative mb-8">
              <CryptoAnimation stage={stage} />
            </div>

            {/* Status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-white/60"
            >
              {stage === 'setup' && "Initializing ZK system..."}
              {stage === 'commitment' && "Generating cryptographic commitment..."}
              {stage === 'challenge' && "Computing Fiat-Shamir challenge..."}
              {stage === 'response' && "Calculating zero-knowledge response..."}
              {stage === 'verification' && "Verifying proof validity..."}
              {stage === 'complete' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center justify-center gap-2 text-green-400"
                >
                  <Check className="w-5 h-5" />
                  <span>Vote successfully recorded with zero-knowledge proof</span>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}