import { createHash } from 'crypto';
import { Witness } from './types';
import { generateRandomField, addField, mulField, FIELD_SIZE } from './math';

export const computeCommitment = (witness: Witness, r: bigint): string => {
  try {
    const hash = createHash('sha256');
    // Properly format witness values for hashing
    witness.variables.forEach(v => {
      const hex = v.toString(16).padStart(16, '0');
      hash.update(hex);
    });
    hash.update(r.toString(16).padStart(16, '0'));
    return hash.digest('hex');
  } catch (error) {
    console.error('Error in commitment computation:', error);
    throw new Error('Failed to compute commitment');
  }
};

export const generateChallenge = (commitment: string): string => {
  try {
    const hash = createHash('sha256');
    hash.update(commitment);
    return hash.digest('hex');
  } catch (error) {
    console.error('Error in challenge generation:', error);
    throw new Error('Failed to generate challenge');
  }
};

export const computeResponse = (
  witness: Witness,
  r: bigint,
  s: bigint,
  challenge: string
): string => {
  try {
    const challengeBigInt = BigInt('0x' + challenge.slice(0, 8));
    const response = addField(r, mulField(challengeBigInt, s));
    return response.toString(16).padStart(64, '0');
  } catch (error) {
    console.error('Error in response computation:', error);
    throw new Error('Failed to compute response');
  }
};