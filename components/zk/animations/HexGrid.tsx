"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function HexGrid() {
  const [hexagons, setHexagons] = useState<Array<{ x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    const grid = [];
    const size = 40;
    for (let i = 0; i < 12; i++) {
      for (let j = 0; j < 8; j++) {
        const x = i * (size * 1.5);
        const y = j * (size * 1.732) + (i % 2) * (size * 0.866);
        grid.push({
          x,
          y,
          delay: (i + j) * 0.1
        });
      }
    }
    setHexagons(grid);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {hexagons.map((hex, i) => (
        <motion.div
          key={i}
          className="absolute w-10 h-10 clip-hexagon"
          style={{ left: hex.x, top: hex.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.1, 0],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3,
            delay: hex.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-full h-full bg-blue-500/20 backdrop-blur-sm" />
        </motion.div>
      ))}
    </div>
  );
}