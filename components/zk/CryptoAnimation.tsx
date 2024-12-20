"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

interface Point {
  x: number;
  y: number;
  z: number;
}

interface CryptoAnimationProps {
  stage: 'setup' | 'commitment' | 'challenge' | 'response' | 'verification' | 'complete';
}

export function CryptoAnimation({ stage }: CryptoAnimationProps) {
  const [points, setPoints] = useState<Point[]>([]);
  const [curvePoints, setCurvePoints] = useState<Point[]>([]);
  const [time, setTime] = useState(0);

  // Generate elliptic curve points
  const generateCurvePoints = useCallback(() => {
    const newPoints: Point[] = [];
    // Secp256k1 curve: y² = x³ + 7
    for (let x = -2; x <= 2; x += 0.05) {
      const xCubed = Math.pow(x, 3);
      const y = Math.sqrt(xCubed + 7);
      if (!isNaN(y)) {
        newPoints.push({
          x: x * 50 + 200,
          y: -y * 50 + 200,
          z: 0
        });
        newPoints.push({
          x: x * 50 + 200,
          y: y * 50 + 200,
          z: 0
        });
      }
    }
    return newPoints;
  }, []);

  // Generate lattice points for commitment scheme
  const generateLatticePoints = useCallback(() => {
    const lattice: Point[] = [];
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        const x = (i - 10) * 20 + 200;
        const y = (j - 10) * 20 + 200;
        const z = Math.sin(i * 0.5) * Math.cos(j * 0.5) * 20;
        lattice.push({ x, y, z });
      }
    }
    return lattice;
  }, []);

  // Generate pairing points for verification
  const generatePairingPoints = useCallback(() => {
    const pairings: Point[] = [];
    for (let t = 0; t < Math.PI * 2; t += 0.1) {
      const r = 100 + Math.sin(t * 3) * 20;
      pairings.push({
        x: Math.cos(t) * r + 200,
        y: Math.sin(t) * r + 200,
        z: Math.cos(t * 3) * 20
      });
    }
    return pairings;
  }, []);

  useEffect(() => {
    let points: Point[] = [];
    switch (stage) {
      case 'setup':
        points = generateCurvePoints();
        break;
      case 'commitment':
        points = generateLatticePoints();
        break;
      case 'verification':
        points = generatePairingPoints();
        break;
      default:
        points = generateCurvePoints();
    }
    setCurvePoints(points);

    const interval = setInterval(() => {
      setTime(t => t + 0.05);
    }, 50);

    return () => clearInterval(interval);
  }, [stage, generateCurvePoints, generateLatticePoints, generatePairingPoints]);

  // Transform points based on time
  const transformedPoints = curvePoints.map(p => ({
    ...p,
    x: p.x + Math.sin(time + p.y * 0.01) * 5,
    y: p.y + Math.cos(time + p.x * 0.01) * 5,
    z: p.z + Math.sin(time * 2) * 2
  }));

  // Render mathematical formulas based on stage
  const renderFormulas = () => {
    switch (stage) {
      case 'setup':
        return (
          <div className="space-y-2 font-mono text-sm">
            <div className="text-blue-400">E: y² = x³ + 7 (secp256k1)</div>
            <div className="text-green-400">P = (x, y) ∈ E(Fp)</div>
            <div className="text-purple-400">n · P = O (group order)</div>
          </div>
        );
      case 'commitment':
        return (
          <div className="space-y-2 font-mono text-sm">
            <div className="text-blue-400">C = g₁ʳ · g₂ᵐ mod p</div>
            <div className="text-green-400">r ←$― Zp (random)</div>
            <div className="text-purple-400">m ∈ M (message space)</div>
          </div>
        );
      case 'verification':
        return (
          <div className="space-y-2 font-mono text-sm">
            <div className="text-blue-400">e(g₁, h₁)ᵃ · e(g₂, h₂)ᵇ = 1</div>
            <div className="text-green-400">∀ a,b ∈ Zp</div>
            <div className="text-purple-400">Bilinear pairing check</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-[600px] bg-black/40 backdrop-blur-lg rounded-xl overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* Main visualization */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.5)" />
            <stop offset="50%" stopColor="rgba(139, 92, 246, 0.5)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.5)" />
          </linearGradient>
        </defs>

        {/* Connect points with curves */}
        {transformedPoints.map((point, i) => {
          const nextPoint = transformedPoints[(i + 1) % transformedPoints.length];
          return (
            <motion.path
              key={`line-${i}`}
              d={`M ${point.x} ${point.y} Q ${(point.x + nextPoint.x) / 2 + Math.sin(time) * 20} 
                 ${(point.y + nextPoint.y) / 2 + Math.cos(time) * 20} ${nextPoint.x} ${nextPoint.y}`}
              stroke="url(#lineGradient)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          );
        })}

        {/* Render points */}
        {transformedPoints.map((point, i) => (
          <motion.circle
            key={`point-${i}`}
            cx={point.x}
            cy={point.y}
            r="2"
            fill="#60A5FA"
            initial={{ scale: 0 }}
            animate={{
              scale: [0, 1, 0.8],
              opacity: [0, 0.8, 0.4]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.01
            }}
          />
        ))}
      </svg>

      {/* Mathematical formulas overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {renderFormulas()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Technical parameters */}
      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm p-4 rounded-lg">
        <motion.div className="font-mono text-xs space-y-2 text-white/70">
          <div>Points: {transformedPoints.length}</div>
          <div>Field: Fp₂₅₆</div>
          <div>Protocol: Groth16</div>
        </motion.div>
      </div>
    </div>
  );
}