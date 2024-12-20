import { Proof, VerificationKey } from '../types';
import { computePairing, validateProof } from './pairing';

export const verifyVote = async (
  proof: Proof,
  verificationKey: VerificationKey,
  publicInputs: bigint[]
): Promise<boolean> => {
  try {
    // Validate proof structure
    if (!validateProof(proof)) {
      throw new Error('Invalid proof structure');
    }

    // Verify the pairing equations
    const valid = await computePairing(proof, verificationKey, publicInputs);
    
    if (!valid) {
      throw new Error('Pairing check failed');
    }

    return true;
  } catch (error) {
    console.error('Vote verification failed:', error);
    return false;
  }
};