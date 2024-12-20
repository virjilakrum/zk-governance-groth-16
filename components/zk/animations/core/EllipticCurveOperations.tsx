"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Point {
  x: number;
  y: number;
  opacity?: number;
}

export function EllipticCurveOperations() {
  const [curvePoints, setCurvePoints] = useState<Point[]>([]);
  const [operationPoints, setOperationPoints] = useState<Point[]>([]);

  useEffect(() => {
    // Generate points for secp256k1 curve: y² = x³ + 7
    const points: Point[] = [];
    for (let x = -2; x <= 2; x += 0.05) {
      const y = Math.sqrt(Math.pow(x, 3) + 7);
      if (!isNaN(y)) {
        points.push({ x: (x + 2) * 80, y: (2 - y) * 80, opacity: 0.6 });
        points.push({ x: (x + 2) * 80, y: (2 + y) * 80, opacity: 0.6 });
      }
    }
    setCurvePoints(points);

    // Generate operation points for scalar multiplication
    const ops = Array.from({ length: 5 }, () => ({
      x: Math.random() * 320,
      y: Math.random() * 320,
      opacity: 0.8
    }));
    setOperationPoints(ops);
  }, []);

  return (
    <div className="relative w-full h-[320px] bg-black/40 rounded-xl overflow-hidden">
      <div className="absolute inset-0 opacity-10 grid-bg-dark" />

      <svg className="absolute inset-0 w-full h-full">
        <motion.path
          d={`M ${curvePoints.map(p => `${p.x},${p.y}`).join(' L ')}`}
          stroke="rgba(59, 130, 246, 0.5)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2 }}
        />

        {operationPoints.map((point, i) => (
          <motion.circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#60A5FA"
            initial={{ scale: 0 }}
            animate={{ 
              scale: [0, 1.2, 1],
              opacity: [0, 0.8, point.opacity]
            }}
            transition={{ delay: i * 0.2 }}
          />
        ))}
      </svg>

      <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm p-4 rounded-lg">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-mono text-sm text-blue-400"
        >
          secp256k1: y² = x³ + 7
        </motion.div>
      </div>
    </div>
  );
}