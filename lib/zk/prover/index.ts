import { groth16 } from 'snarkjs';
import { buildPoseidon } from 'circomlibjs';
import { getCircuit } from '../setup';
import { Circuit } from '../types';

export async function generateVoteProof(
  privateInputs: {
    privateKey: bigint;
    voterAddress: bigint;
    shares: bigint;
    voteChoice: bigint;
  },
  publicInputs: {
    publicShares: bigint;
    publicVoteChoice: bigint;
  }
) {
  try {
    // Get initialized circuit
    const circuit = getCircuit();
    
    // Generate witness
    const witness = await generateWitness(privateInputs, publicInputs);
    
    // Generate proof using the witness
    const { proof, publicSignals } = await groth16.prove(circuit, witness);
    
    return {
      proof,
      publicSignals,
      success: true
    };
  } catch (error) {
    console.error('Proof generation failed:', error);
    return {
      proof: null,
      publicSignals: null,
      success: false
    };
  }
}

async function generateWitness(privateInputs: any, publicInputs: any) {
  const poseidon = await buildPoseidon();
  
  // Calculate witness values
  const witness = {
    privateKey: privateInputs.privateKey,
    voterAddress: privateInputs.voterAddress,
    shares: privateInputs.shares,
    voteChoice: privateInputs.voteChoice,
    publicShares: publicInputs.publicShares,
    publicVoteChoice: publicInputs.publicVoteChoice
  };
  
  // Calculate hash for key verification
  witness.keyHash = poseidon([privateInputs.privateKey, privateInputs.voterAddress]);
  
  return witness;
}