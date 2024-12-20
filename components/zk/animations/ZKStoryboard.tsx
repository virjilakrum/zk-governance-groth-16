"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CryptoAnimation } from "../CryptoAnimation";
import type { Stage } from "../types";

interface ZKStoryboardProps {
  stage: Stage;
}

export function ZKStoryboard({ stage }: ZKStoryboardProps) {
  return (
    <div className="w-full h-full min-h-[600px] lg:min-h-[800px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="w-full h-full"
        >
          <CryptoAnimation stage={stage} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}