"use client";

import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";

interface StageResponseProps {
  progress: number;
}

export function StageResponse({ progress }: StageResponseProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8 h-[400px] flex flex-col items-center justify-center"
    >
      <div className="relative w-96 h-96 flex items-center justify-center">
        {/* Response Animation */}
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
                <div className="w-full h-full bg-gradient-to-t from-green-500/0 to-green-500/30" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Central Response Icon */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="relative z-10"
        >
          <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl" />
          <RefreshCw className="w-16 h-16 text-green-400" />
        </motion.div>
      </div>

      {/* Formula */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="text-green-200/80">Generating Zero-Knowledge Response</div>
        <div className="font-mono text-lg text-green-300">s = r + c·x</div>
      </motion.div>
    </motion.div>
  );
}