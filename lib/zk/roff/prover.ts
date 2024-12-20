import { Circuit, Witness, Proof } from './types';
import { generateRandomField, computeLinearCombination, addField, mulField } from './math';
import { computeCommitment, generateChallenge, computeResponse } from './crypto';

export const generateWitness = (circuit: Circuit, secret: number): Witness => {
  if (isNaN(secret) || !Number.isInteger(secret) || secret < 0) {
    throw new Error('Invalid secret: must be a non-negative integer');
  }

  // Convert secret to field element
  const x = BigInt(secret) % BigInt(1 << 32);
  const xSquared = (x * x) % BigInt(1 << 32);
  
  // Calculate witness values with proper modular arithmetic
  return {
    inputs: [x],
    variables: [BigInt(1), x, xSquared] // [1, x, x^2]
  };
};

export const generateProof = async (
  circuit: Circuit,
  witness: Witness
): Promise<Proof> => {
  try {
    // Validate witness
    if (!witness.variables || witness.variables.length !== circuit.numVariables) {
      throw new Error('Invalid witness structure');
    }

    // Generate random blinding factors
    const r = generateRandomField();
    const s = generateRandomField();
    
    // Compute commitment
    const commitment = computeCommitment(witness, r);
    
    // Generate challenge
    const challenge = generateChallenge(commitment);
    
    // Compute response
    const response = computeResponse(witness, r, s, challenge);
    
    return {
      commitment,
      challenge,
      response
    };
  } catch (error) {
    console.error('Error in proof generation:', error);
    throw new Error('Failed to generate proof: ' + (error as Error).message);
  }
};