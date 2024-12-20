import { createHash } from 'crypto';

export const generateCommitment = (value: string, randomness: string): string => {
  const hash = createHash('sha256');
  hash.update(value + randomness);
  return hash.digest('hex');
};

export const generateChallenge = (commitment: string): string => {
  const hash = createHash('sha256');
  hash.update(commitment);
  return hash.digest('hex').slice(0, 8);
};

export const generateResponse = (
  secret: string,
  randomness: string,
  challenge: string
): string => {
  const hash = createHash('sha256');
  hash.update(secret + randomness + challenge);
  return hash.digest('hex');
};