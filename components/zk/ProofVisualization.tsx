"use client";

import { motion } from "framer-motion";
import { ZKStoryboard } from "./animations/ZKStoryboard";
import type { Stage } from "./types";

interface ProofVisualizationProps {
  stage: "setup" | "proving" | "verifying" | "complete";
}

export function ProofVisualization({ stage }: ProofVisualizationProps) {
  // Convert voting stage to ZK stage
  const getZKStage = (): Stage => {
    switch (stage) {
      case "proving":
        return "commitment";
      case "verifying":
        return "verification";
      case "complete":
        return "complete";
      default:
        return "setup";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full rounded-xl overflow-hidden min-h-[600px] lg:min-h-[800px]"
    >
      <ZKStoryboard stage={getZKStage()} />
    </motion.div>
  );
}