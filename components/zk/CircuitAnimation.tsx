"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface CircuitAnimationProps {
  stage: 'setup' | 'commitment' | 'challenge' | 'response' | 'verification' | 'complete';
}

export function CircuitAnimation({ stage }: CircuitAnimationProps) {
  const [particles, setParticles] = useState<Array<{
    x: number;
    y: number;
    scale: number;
    rotation: number;
    opacity: number;
  }>>([]);

  useEffect(() => {
    generateParticles();
  }, [stage]);

  const generateParticles = () => {
    const newParticles = Array.from({ length: 30 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: 0.5 + Math.random() * 1.5,
      rotation: Math.random() * 360,
      opacity: 0.3 + Math.random() * 0.7
    }));
    setParticles(newParticles);
  };

  return (
    <div className="relative w-full h-[400px] bg-black/40 rounded-xl overflow-hidden">
      {/* Background grid effect */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Animated particles */}
      <div className="absolute inset-0">
        <AnimatePresence>
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: `${particle.x}%`,
                y: `${particle.y}%`,
                scale: 0,
                rotate: 0,
                opacity: 0
              }}
              animate={{
                x: [`${particle.x}%`, `${particle.x + (Math.random() * 20 - 10)}%`],
                y: [`${particle.y}%`, `${particle.y + (Math.random() * 20 - 10)}%`],
                scale: [0, particle.scale],
                rotate: [0, particle.rotation],
                opacity: [0, particle.opacity]
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              {/* Geometric shapes representing cryptographic elements */}
              <div className="w-8 h-8 relative">
                {stage === 'commitment' && (
                  <div className="absolute inset-0 bg-blue-500/30 backdrop-blur-sm transform rotate-45" />
                )}
                {stage === 'challenge' && (
                  <div className="absolute inset-0 bg-purple-500/30 backdrop-blur-sm clip-hexagon" />
                )}
                {stage === 'response' && (
                  <div className="absolute inset-0 bg-green-500/30 backdrop-blur-sm rounded-full" />
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Mathematical formulas overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-mono text-sm text-blue-400 space-y-2"
        >
          {stage === 'commitment' && (
            <>
              <div className="flex items-center justify-center space-x-2">
                <span>Computing Pedersen commitment:</span>
                <span className="text-green-400">C = g^r · h^m</span>
              </div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                className="h-0.5 bg-gradient-to-r from-blue-500/20 via-blue-500 to-blue-500/20"
              />
            </>
          )}
          {stage === 'challenge' && (
            <div className="text-purple-400">
              Generating Fiat-Shamir challenge: c = H(g, h, C)
            </div>
          )}
          {stage === 'response' && (
            <div className="text-green-400">
              Computing response: s = r + c·x
            </div>
          )}
        </motion.div>
      </div>

      {/* Stage-specific effects */}
      {stage === 'verification' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.2, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </div>
  );
}