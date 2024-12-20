"use client";

import { motion, AnimatePresence } from "framer-motion";
import { EllipticCurveVisual } from "./EllipticCurveVisual";
import { CryptoFlow } from "./CryptoFlow";

interface ProofStagesProps {
  stage: 'setup' | 'commitment' | 'challenge' | 'response' | 'verification' | 'complete';
}

export function ProofStages({ stage }: ProofStagesProps) {
  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {/* Stage-specific visualizations */}
        <motion.div
          key={stage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Left panel */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white/70">
              {stage === 'setup' && "Initializing ZK System"}
              {stage === 'commitment' && "Elliptic Curve Operations"}
              {stage === 'challenge' && "Generating Challenge"}
              {stage === 'response' && "Computing Response"}
              {stage === 'verification' && "Verifying Proof"}
              {stage === 'complete' && "Proof Verified"}
            </h3>
            <EllipticCurveVisual />
          </div>

          {/* Right panel */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white/70">
              {stage === 'setup' && "System Parameters"}
              {stage === 'commitment' && "Commitment Generation"}
              {stage === 'challenge' && "Hash Computation"}
              {stage === 'response' && "ZK Response"}
              {stage === 'verification' && "Pairing Check"}
              {stage === 'complete' && "Final Verification"}
            </h3>
            <CryptoFlow />
          </div>

          {/* Mathematical formulas */}
          <motion.div
            className="col-span-2 bg-black/60 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="font-mono text-sm space-y-2">
              {stage === 'setup' && (
                <>
                  <div className="text-blue-400">System Parameters:</div>
                  <div className="text-green-400">G ∈ E(Fp), H = [α]G</div>
                </>
              )}
              {stage === 'commitment' && (
                <>
                  <div className="text-blue-400">Pedersen Commitment:</div>
                  <div className="text-green-400">C = g^r · h^m</div>
                </>
              )}
              {stage === 'challenge' && (
                <>
                  <div className="text-purple-400">Fiat-Shamir Challenge:</div>
                  <div className="text-green-400">c = H(g, h, C)</div>
                </>
              )}
              {stage === 'response' && (
                <>
                  <div className="text-blue-400">Schnorr Response:</div>
                  <div className="text-green-400">s = r + c·x</div>
                </>
              )}
              {stage === 'verification' && (
                <>
                  <div className="text-purple-400">Verification Equation:</div>
                  <div className="text-green-400">e(g^s, h) = e(C · g^m, h^c)</div>
                </>
              )}
              {stage === 'complete' && (
                <>
                  <div className="text-green-400">✓ Proof Valid</div>
                  <div className="text-blue-400">Privacy Preserved</div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}