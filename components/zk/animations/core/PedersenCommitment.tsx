"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface CommitmentPoint {
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

export function PedersenCommitment() {
  const [points, setPoints] = useState<CommitmentPoint[]>([]);

  useEffect(() => {
    const newPoints = Array.from({ length: 8 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: 0.5 + Math.random() * 1.5,
      rotation: Math.random() * 360
    }));
    setPoints(newPoints);
  }, []);

  return (
    <div className="relative w-full h-[320px] bg-black/40 rounded-xl overflow-hidden">
      <div className="absolute inset-0">
        {points.map((point, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ x: `${point.x}%`, y: `${point.y}%`, scale: 0, rotate: 0 }}
            animate={{
              x: [`${point.x}%`, `${point.x + (Math.random() * 20 - 10)}%`],
              y: [`${point.y}%`, `${point.y + (Math.random() * 20 - 10)}%`],
              scale: [0, point.scale],
              rotate: [0, point.rotation]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <div className="w-8 h-8 bg-purple-500/30 backdrop-blur-sm rounded-full" />
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm p-4 rounded-lg">
        <motion.div className="font-mono text-sm space-y-2">
          <div className="text-purple-400">Pedersen Commitment:</div>
          <div className="text-green-400">C = g₁ʳ · g₂ᵐ mod p</div>
        </motion.div>
      </div>
    </div>
  );
}