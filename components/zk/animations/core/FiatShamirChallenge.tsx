"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface HashNode {
  x: number;
  y: number;
  connections: number[];
}

export function FiatShamirChallenge() {
  const [nodes, setNodes] = useState<HashNode[]>([]);

  useEffect(() => {
    const generateNodes = () => {
      const newNodes: HashNode[] = [];
      for (let i = 0; i < 8; i++) {
        newNodes.push({
          x: 50 + Math.cos(i * Math.PI / 4) * 100,
          y: 160 + Math.sin(i * Math.PI / 4) * 100,
          connections: [(i + 1) % 8, (i + 2) % 8]
        });
      }
      setNodes(newNodes);
    };
    generateNodes();
  }, []);

  return (
    <div className="relative w-full h-[320px] bg-black/40 rounded-xl overflow-hidden">
      <svg className="absolute inset-0 w-full h-full">
        {nodes.map((node, i) => (
          <g key={i}>
            {node.connections.map((conn, j) => (
              <motion.line
                key={`${i}-${j}`}
                x1={node.x}
                y1={node.y}
                x2={nodes[conn].x}
                y2={nodes[conn].y}
                stroke="rgba(139, 92, 246, 0.3)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: i * 0.1 }}
              />
            ))}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="6"
              fill="#8B5CF6"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            />
          </g>
        ))}
      </svg>

      <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm p-4 rounded-lg">
        <motion.div className="font-mono text-sm space-y-2">
          <div className="text-purple-400">Fiat-Shamir Transform:</div>
          <div className="text-green-400">c = H(g, h, C, m)</div>
        </motion.div>
      </div>
    </div>
  );
}