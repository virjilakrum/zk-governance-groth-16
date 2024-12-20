"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { StageProps } from "../types";

export function StageCommitment({ progress }: StageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8 h-[400px] flex flex-col items-center justify-center"
    >
      <div className="relative w-96 h-96 flex items-center justify-center">
        {/* Central Lock Icon */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="relative z-10"
        >
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl" />
          <Lock className="w-16 h-16 text-blue-400" />
        </motion.div>
      </div>

      {/* Formula */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="text-blue-200/80">Generating Pedersen Commitment</div>
        <div className="font-mono text-lg text-blue-300">C = g^r · h^m</div>
      </motion.div>
    </motion.div>
  );
}