"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface MathematicalAnimationProps {
  stage: 'setup' | 'commitment' | 'challenge' | 'response' | 'verification' | 'complete';
}

export function MathematicalAnimation({ stage }: MathematicalAnimationProps) {
  const [equations, setEquations] = useState<string[]>([]);
  
  useEffect(() => {
    switch (stage) {
      case 'setup':
        setEquations([
          "E: y² = x³ + ax + b",
          "G ∈ E(Fp)",
          "H = [α]G"
        ]);
        break;
      case 'commitment':
        setEquations([
          "r ←$― Fp",
          "C = [r]G + [m]H",
          "h = H(G, H, C)"
        ]);
        break;
      case 'challenge':
        setEquations([
          "c = H(transcript)",
          "transcript = G || H || C || m",
          "c ∈ Fp"
        ]);
        break;
      case 'response':
        setEquations([
          "s = r + c·sk",
          "π = (C, s)",
          "SK ∈ Fp"
        ]);
        break;
      case 'verification':
        setEquations([
          "e(π₁, H) = e(C, G)",
          "e([s]G, H) = e(C + [m]H, G)",
          "Verify: e(π₁, H)ᵉ = e(G, H)ˢ"
        ]);
        break;
      case 'complete':
        setEquations([
          "ZK Proof Valid ✓",
          "Privacy Preserved ✓",
          "Verification Complete ✓"
        ]);
        break;
    }
  }, [stage]);

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md p-4 border-t border-white/10">
      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-2"
        >
          {equations.map((eq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="font-mono text-sm"
            >
              <span className="text-blue-400">{eq}</span>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}