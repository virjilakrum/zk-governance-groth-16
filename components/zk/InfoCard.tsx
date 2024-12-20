"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Key } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Zero-Knowledge Security",
    description: "Prove knowledge without revealing sensitive information"
  },
  {
    icon: Lock,
    title: "ROFF Circuits",
    description: "Advanced cryptographic circuits for secure proof generation"
  },
  {
    icon: Key,
    title: "Move Verification",
    description: "On-chain verification using Move smart contracts"
  }
];

export function InfoCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-white/5 rounded-xl blur-lg group-hover:bg-white/10 transition-all duration-300" />
          <div className="relative p-6 bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl">
            <feature.icon className="w-8 h-8 mb-4 text-white/80" />
            <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-sm text-white/70">{feature.description}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}