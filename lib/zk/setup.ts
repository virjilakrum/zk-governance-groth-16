import { groth16 } from 'snarkjs';
import { Circuit, VerificationKey } from './types';

let initialized = false;
let circuit: Circuit | null = null;
let verificationKey: VerificationKey | null = null;

export async function initializeZKSystem() {
  if (initialized) return true;

  try {
    console.log('Starting ZK system initialization...');

    // Create default verification key if file doesn't exist
    const defaultVK: VerificationKey = {
      protocol: "groth16",
      curve: "bn128",
      nPublic: 2,
      vk_alpha_1: ["0x1", "0x2", "0x3"],
      vk_beta_2: [["0x1", "0x2"], ["0x3", "0x4"], ["0x1", "0x0"]],
      vk_gamma_2: [["0x1", "0x2"], ["0x3", "0x4"], ["0x1", "0x0"]],
      vk_delta_2: [["0x1", "0x2"], ["0x3", "0x4"], ["0x1", "0x0"]],
      vk_alphabeta_12: [
        [["0x1", "0x2"], ["0x3", "0x4"]],
        [["0x5", "0x6"], ["0x7", "0x8"]]
      ],
      IC: [["0x1", "0x2", "0x3"], ["0x4", "0x5", "0x6"]]
    };

    // Initialize circuit with empty buffers for development
    circuit = {
      wasm: new Uint8Array(0),
      zkey: new Uint8Array(0)
    };

    verificationKey = defaultVK;
    
    console.log('ZK system initialized with development keys');
    initialized = true;
    return true;

  } catch (error) {
    console.error('Failed to initialize ZK system:', error);
    initialized = false;
    throw error;
  }
}

export function getCircuit(): Circuit {
  if (!initialized || !circuit) {
    throw new Error('ZK system not initialized');
  }
  return circuit;
}

export function getVerificationKey(): VerificationKey {
  if (!initialized || !verificationKey) {
    throw new Error('ZK system not initialized');
  }
  return verificationKey;
}

export function isInitialized(): boolean {
  return initialized;
}