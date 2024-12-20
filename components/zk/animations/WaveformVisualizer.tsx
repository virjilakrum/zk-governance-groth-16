"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function WaveformVisualizer() {
  const [waveform, setWaveform] = useState<number[]>([]);

  useEffect(() => {
    const generateWaveform = () => {
      const points = Array.from({ length: 100 }, (_, i) => {
        const t = i / 100;
        return Math.sin(t * Math.PI * 4) * Math.cos(t * Math.PI * 2) * 50;
      });
      setWaveform(points);
    };

    generateWaveform();
    const interval = setInterval(generateWaveform, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg className="w-full h-32" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d={`M 0,50 ${waveform.map((y, x) => `L ${x},${y + 50}`).join(" ")}`}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}