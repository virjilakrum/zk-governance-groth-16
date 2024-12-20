"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export function StageComplete() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="h-[400px] flex flex-col items-center justify-center space-y-8"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="relative"
      >
        <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl" />
        <Check className="w-24 h-24 text-green-400" />
      </motion.div>
      <div className="text-center space-y-4">
        <h3 className="text-xl font-semibold text-white">Proof Verified Successfully</h3>
        <p className="text-green-200/80">Your vote has been securely recorded</p>
      </div>
    </motion.div>
  );
}