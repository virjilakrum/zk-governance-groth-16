import { LucideIcon, Shield, Lock, Key, RefreshCw, Check } from "lucide-react";
import { Stage } from "../types";

export const getStageIcon = (stage: Stage): LucideIcon => {
  switch (stage) {
    case 'setup': return Shield;
    case 'commitment': return Lock;
    case 'challenge': return Key;
    case 'response': return RefreshCw;
    case 'verification': return Shield;
    case 'complete': return Check;
    default: return Shield;
  }
};

export const getStageColor = (stage: Stage): string => {
  switch (stage) {
    case 'setup': return "from-blue-500/20 to-blue-600/20";
    case 'commitment': return "from-purple-500/20 to-purple-600/20";
    case 'challenge': return "from-green-500/20 to-green-600/20";
    case 'response': return "from-orange-500/20 to-orange-600/20";
    case 'verification': return "from-cyan-500/20 to-cyan-600/20";
    case 'complete': return "from-emerald-500/20 to-emerald-600/20";
    default: return "from-blue-500/20 to-blue-600/20";
  }
};