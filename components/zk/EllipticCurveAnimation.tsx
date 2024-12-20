"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface Point {
  x: number;
  y: number;
}

interface EllipticCurveAnimationProps {
  stage: 'setup' | 'commitment' | 'challenge' | 'response' | 'verification' | 'complete';
}

export function EllipticCurveAnimation({ stage }: EllipticCurveAnimationProps) {
  const [curvePoints, setCurvePoints] = useState<Point[]>([]);
  const [activePoints, setActivePoints] = useState<Point[]>([]);
  const [operationLines, setOperationLines] = useState<{start: Point; end: Point}[]>([]);

  useEffect(() => {
    generateCurvePoints();
    generateStagePoints();
  }, [stage]);

  const generateCurvePoints = () => {
    // Generate points for y² = x³ + ax + b curve
    const points: Point[] = [];
    for (let x = -2; x <= 2; x += 0.05) {
      const y = Math.sqrt(Math.pow(x, 3) + 7); // Example curve: y² = x³ + 7
      if (!isNaN(y)) {
        points.push({ 
          x: (x + 2) * 60, 
          y: (2 - y) * 60 
        });
        points.push({ 
          x: (x + 2) * 60, 
          y: (2 + y) * 60 
        });
      }
    }
    setCurvePoints(points);
  };

  const generateStagePoints = () => {
    const points: Point[] = [];
    const lines: {start: Point; end: Point}[] = [];

    switch (stage) {
      case 'commitment':
        // Generator point and random scalar multiplication
        points.push({ x: 120, y: 120 });
        points.push({ x: 180, y: 60 });
        lines.push({ 
          start: { x: 120, y: 120 }, 
          end: { x: 180, y: 60 } 
        });
        break;

      case 'challenge':
        // Hash function visualization
        for (let i = 0; i < 4; i++) {
          points.push({ 
            x: 60 + i * 40, 
            y: 120 + Math.sin(i) * 40 
          });
        }
        break;

      case 'response':
        // Polynomial evaluation points
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2;
          points.push({
            x: 120 + Math.cos(angle) * 60,
            y: 120 + Math.sin(angle) * 60
          });
        }
        break;

      case 'verification':
        // Pairing computation points
        points.push({ x: 80, y: 80 });
        points.push({ x: 160, y: 80 });
        lines.push({ 
          start: { x: 80, y: 80 }, 
          end: { x: 160, y: 80 } 
        });
        break;
    }

    setActivePoints(points);
    setOperationLines(lines);
  };

  return (
    <div className="relative w-full h-[400px] bg-black/40 rounded-xl overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0" 
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* Elliptic curve */}
      <svg className="absolute inset-0 w-full h-full">
        <motion.path
          d={`M ${curvePoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')}`}
          stroke="rgba(59, 130, 246, 0.3)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2 }}
        />

        {/* Operation lines */}
        <AnimatePresence>
          {operationLines.map((line, i) => (
            <motion.line
              key={`line-${i}`}
              x1={line.start.x}
              y1={line.start.y}
              x2={line.end.x}
              y2={line.end.y}
              stroke="rgba(59, 130, 246, 0.5)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              exit={{ pathLength: 0 }}
              transition={{ duration: 1 }}
            />
          ))}
        </AnimatePresence>
      </svg>

      {/* Active points */}
      <AnimatePresence>
        {activePoints.map((point, i) => (
          <motion.div
            key={`point-${i}`}
            className="absolute w-4 h-4 -translate-x-2 -translate-y-2"
            style={{ left: point.x, top: point.y }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="w-full h-full rounded-full bg-blue-400 animate-pulse" />
            <div className="absolute inset-0 rounded-full bg-blue-400/20 animate-ping" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Mathematical formulas */}
      <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm p-4 rounded-lg">
        <motion.div
          key={stage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-mono text-sm text-blue-400"
        >
          {stage === 'commitment' && "C = g^r · h^m"}
          {stage === 'challenge' && "c = H(g, h, C, m)"}
          {stage === 'response' && "s = r + c·x"}
          {stage === 'verification' && "e(g^s, h) = e(C · g^m, h^c)"}
        </motion.div>
      </div>
    </div>
  );
}