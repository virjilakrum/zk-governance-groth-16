"use client";

import { motion } from "framer-motion";
import { Lock, Unlock, Shield } from "lucide-react";

interface ProofAnimationProps {
  stage: "idle" | "generating" | "verifying" | "complete";
}

export const ProofAnimation = ({ stage }: ProofAnimationProps) => {
  const variants = {
    idle: { scale: 1, opacity: 1 },
    generating: { scale: [1, 1.2, 1], opacity: 1, transition: { repeat: Infinity, duration: 2 } },
    verifying: { rotate: [0, 360], transition: { repeat: Infinity, duration: 1.5 } },
    complete: { scale: 1.2, opacity: 1 },
  };

  return (
    <div className="relative w-48 h-48">
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        variants={variants}
        animate={stage}
      >
        {stage === "complete" ? (
          <Unlock className="w-16 h-16 text-green-400" />
        ) : (
          <Lock className="w-16 h-16 text-white" />
        )}
      </motion.div>
      
      {stage === "generating" && (
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [0.8, 1.2, 0.8], 
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-full h-full border-4 border-white/20 rounded-full" />
        </motion.div>
      )}
      
      {stage === "verifying" && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Shield className="w-24 h-24 text-white/20" />
        </motion.div>
      )}
    </div>
  );
};