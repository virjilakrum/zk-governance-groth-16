"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  velocity: { x: number; y: number };
}

interface ParticleFieldProps {
  active: boolean;
}

export function ParticleField({ active }: ParticleFieldProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) return;

    // Generate initial particles
    const initialParticles = Array.from({ length: 50 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      velocity: {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2
      }
    }));

    setParticles(initialParticles);

    // Animation loop
    const animate = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          // Update position
          let x = particle.x + particle.velocity.x;
          let y = particle.y + particle.velocity.y;

          // Bounce off edges
          if (x < 0 || x > window.innerWidth) particle.velocity.x *= -1;
          if (y < 0 || y > window.innerHeight) particle.velocity.y *= -1;

          // Keep within bounds
          x = Math.max(0, Math.min(window.innerWidth, x));
          y = Math.max(0, Math.min(window.innerHeight, y));

          return { ...particle, x, y };
        })
      );
    };

    const interval = setInterval(animate, 1000 / 60);
    return () => clearInterval(interval);
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-blue-400/30"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.x,
            top: particle.y,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.size}px rgba(59, 130, 246, 0.3)`
          }}
          initial={false}
          animate={{
            x: particle.x,
            y: particle.y,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}