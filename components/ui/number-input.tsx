"use client";

import { Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NumberInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function NumberInput({ value, onChange, disabled, className }: NumberInputProps) {
  const increment = () => {
    const num = parseInt(value) || 0;
    onChange((num + 1).toString());
  };

  const decrement = () => {
    const num = parseInt(value) || 0;
    onChange((num - 1).toString());
  };

  return (
    <div className={cn("relative group", className)}>
      <div className="absolute inset-0 bg-white/5 rounded-lg blur-xl group-hover:bg-white/10 transition-all duration-300" />
      <div className="relative flex items-center bg-black border border-white/10 rounded-lg overflow-hidden">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={decrement}
          disabled={disabled}
          className="p-4 hover:bg-white/5 text-white/70 hover:text-white transition-colors"
        >
          <Minus className="w-5 h-5" />
        </motion.button>
        
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="flex-1 bg-transparent border-x border-white/10 h-14 text-center text-xl font-medium text-white focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          placeholder="Enter secret number"
        />
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={increment}
          disabled={disabled}
          className="p-4 hover:bg-white/5 text-white/70 hover:text-white transition-colors"
        >
          <Plus className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}