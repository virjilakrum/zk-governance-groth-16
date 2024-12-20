import { groth16 } from 'snarkjs';
import { getVerificationKey } from '../setup';
import { Proof, PublicSignals } from '../types';

export async function verifyVoteProof(
  proof: Proof,
  publicSignals: PublicSignals
): Promise<boolean> {
  try {
    // Get verification key
    const verificationKey = getVerificationKey();
    
    // Verify the proof
    const verified = await groth16.verify(
      verificationKey,
      publicSignals,
      proof
    );
    
    if (!verified) {
      throw new Error('Proof verification failed');
    }
    
    return true;
  } catch (error) {
    console.error('Verification failed:', error);
    return false;
  }
}