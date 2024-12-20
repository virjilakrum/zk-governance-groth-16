"use client";

import { motion, AnimatePresence } from "framer-motion";

interface StageDescriptionProps {
  stage: 'setup' | 'commitment' | 'challenge' | 'response' | 'verification' | 'complete';
}

export function StageDescription({ stage }: StageDescriptionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stage}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="text-center text-sm text-white/70 max-w-2xl mx-auto"
      >
        {stage === 'setup' && (
          <p>Initializing the zero-knowledge proof system and generating necessary cryptographic parameters...</p>
        )}
        {stage === 'commitment' && (
          <p>Creating a Pedersen commitment to your vote using elliptic curve cryptography while preserving privacy...</p>
        )}
        {stage === 'challenge' && (
          <p>Generating a cryptographic challenge using the Fiat-Shamir heuristic to ensure non-interactivity...</p>
        )}
        {stage === 'response' && (
          <p>Computing the zero-knowledge response that proves vote validity without revealing the actual vote...</p>
        )}
        {stage === 'verification' && (
          <p>Verifying the proof using bilinear pairings and ensuring cryptographic soundness...</p>
        )}
        {stage === 'complete' && (
          <p>Your vote has been securely recorded with zero-knowledge proof verification complete!</p>
        )}
      </motion.div>
    </AnimatePresence>
  );
}