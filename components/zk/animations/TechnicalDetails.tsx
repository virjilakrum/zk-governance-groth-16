"use client";

import { motion } from "framer-motion";
import type { Stage } from "../types";

interface TechnicalDetailsProps {
  stage: Stage;
}

export function TechnicalDetails({ stage }: TechnicalDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-sm"
    >
      <div className="font-mono space-y-1 text-white/60">
        <div>Stage: <span className="text-blue-400">{stage}</span></div>
        <div>Protocol: <span className="text-green-400">Groth16</span></div>
        <div>Curve: <span className="text-purple-400">BN254</span></div>
        {stage === 'complete' && (
          <div>Status: <span className="text-emerald-400">Verified ✓</span></div>
        )}
      </div>
    </motion.div>
  );
}