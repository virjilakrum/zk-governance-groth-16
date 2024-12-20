"use client";

import { motion } from "framer-motion";
import { Key } from "lucide-react";

interface StageChallengeProps {
  progress: number;
}

export function StageChallenge({ progress }: StageChallengeProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8 h-[400px] flex flex-col items-center justify-center"
    >
      <div className="relative w-96 h-96 flex items-center justify-center">
        {/* Challenge Animation */}
        <motion.div
          className="absolute w-full h-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0"
              style={{ transform: `rotate(${i * 60}deg)` }}
            >
              <motion.div
                className="absolute top-0 left-1/2 w-1 h-1/2 origin-bottom"
                animate={{
                  scaleY: [1, 1.5, 1],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                <div className="w-full h-full bg-gradient-to-t from-purple-500/0 to-purple-500/30" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Central Key Icon */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="relative z-10"
        >
          <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl" />
          <Key className="w-16 h-16 text-purple-400" />
        </motion.div>
      </div>

      {/* Formula */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="text-purple-200/80">Computing Fiat-Shamir Challenge</div>
        <div className="font-mono text-lg text-purple-300">c = H(g, h, C)</div>
      </motion.div>
    </motion.div>
  );
}