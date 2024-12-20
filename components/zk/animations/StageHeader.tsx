"use client";

import { motion } from "framer-motion";
import { getStageIcon, getStageColor } from "../utils/stageUtils";
import type { Stage } from "../types";

interface StageHeaderProps {
  stage: Stage;
}

export function StageHeader({ stage }: StageHeaderProps) {
  const StageIcon = getStageIcon(stage);
  const stageColor = getStageColor(stage);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-3 mb-6"
    >
      <motion.div
        className={`p-3 rounded-full bg-gradient-to-r ${stageColor}`}
        animate={{
          scale: [1, 1.1, 1],
          rotate: stage === 'verification' ? 360 : 0
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <StageIcon className="w-6 h-6 text-white" />
      </motion.div>
      <h2 className="text-xl font-semibold">
        {stage === 'setup' && "Initializing Zero-Knowledge System"}
        {stage === 'commitment' && "Generating Cryptographic Commitment"}
        {stage === 'challenge' && "Computing Fiat-Shamir Challenge"}
        {stage === 'response' && "Calculating Zero-Knowledge Response"}
        {stage === 'verification' && "Verifying Proof Validity"}
        {stage === 'complete' && "Proof Successfully Verified"}
      </h2>
    </motion.div>
  );
}