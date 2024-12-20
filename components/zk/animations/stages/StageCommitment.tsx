"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";

interface StageCommitmentProps {
  progress: number;
}

export function StageCommitment({ progress }: StageCommitmentProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8 h-[400px] flex flex-col items-center justify-center"
    >
      <div className="relative w-96 h-96 flex items-center justify-center">
        {/* Commitment Animation */}
        <motion.div
          className="absolute w-full h-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-24 origin-bottom"
              style={{
                left: '50%',
                bottom: '50%',
                transform: `rotate(${i * 45}deg)`,
              }}
            >
              <motion.div
                className="w-full h-full bg-gradient-to-t from-blue-500/0 to-blue-500/30"
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  height: ['0%', '100%', '0%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            </motion.div>
          ))}
        </motion.div>

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