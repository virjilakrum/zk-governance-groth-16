"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProofAnimation } from "./ProofAnimation";
import { generateProof } from "@/lib/zk/prover";
import { verifyProof } from "@/lib/zk/verifier";

export const ProofForm = () => {
  const [secret, setSecret] = useState("");
  const [stage, setStage] = useState<"idle" | "generating" | "verifying" | "complete">("idle");
  const [proof, setProof] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setStage("generating");
      const newProof = await generateProof({ secret, publicValue: "public" });
      setProof(newProof);
      
      setStage("verifying");
      const result = await verifyProof(newProof);
      
      if (result.isValid) {
        setStage("complete");
      } else {
        setStage("idle");
      }
    } catch (error) {
      console.error("Proof generation failed:", error);
      setStage("idle");
    }
  };

  return (
    <Card className="p-8 bg-white/5 backdrop-blur border-white/10">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex justify-center">
          <ProofAnimation stage={stage} />
        </div>
        
        <div className="space-y-4">
          <Input
            type="password"
            placeholder="Enter your secret value"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className="bg-black/50 border-white/20"
            disabled={stage !== "idle"}
          />
          
          <Button
            type="submit"
            disabled={!secret || stage !== "idle"}
            className="w-full bg-white text-black hover:bg-gray-200 transition-colors"
          >
            Generate ZK Proof
          </Button>
        </div>

        {proof && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-gray-400 break-all"
          >
            <p>Commitment: {proof.commitment.slice(0, 20)}...</p>
            <p>Challenge: {proof.challenge.slice(0, 20)}...</p>
            <p>Response: {proof.response.slice(0, 20)}...</p>
          </motion.div>
        )}
      </form>
    </Card>
  );
};