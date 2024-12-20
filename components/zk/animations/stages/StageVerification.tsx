"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";

interface StageVerificationProps {
  progress: number;
}

export function StageVerification({ progress }: StageVerificationProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8 h-[400px] flex flex-col items-center justify-center"
    >
      <div className="relative w-96 h-96">
        {/* Verification Animation */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-full"
              style={{ transform: `rotate(${i * 45}deg)` }}
            >
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1/2"
                animate={{
                  scaleY: [1, 1.5, 1],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              >
                <div className="w-full h-full bg-gradient-to-t from-blue-500/0 via-violet-500/30 to-blue-500/0" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Central Shield Icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-violet-500/20 rounded-full blur-xl" />
            <Shield className="w-16 h-16 text-violet-400" />
          </div>
        </motion.div>
      </div>

      {/* Verification Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="text-violet-200/80">Verifying Zero-Knowledge Proof</div>
        <div className="font-mono text-lg text-violet-300">
          Validating proof components...
        </div>
      </motion.div>
    </motion.div>
  );
}