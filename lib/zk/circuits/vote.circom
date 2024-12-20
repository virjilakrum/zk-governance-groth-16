pragma circom 2.1.4;

include "node_modules/circomlib/circuits/poseidon.circom";
include "node_modules/circomlib/circuits/comparators.circom";
include "node_modules/circomlib/circuits/bitify.circom";

/*
 * Circuit for verifying shareholder votes with privacy
 * Inputs:
 * - Private: voterKey, shares, voteChoice
 * - Public: merkleRoot, totalShares
 */
template VoteVerifier() {
    // Public inputs
    signal input merkleRoot;
    signal input totalShares;
    
    // Private inputs
    signal input voterKey;
    signal input shares;
    signal input voteChoice; // 1 for yes, 0 for no
    signal input merklePath[32];
    signal input merklePathIndices[32];
    
    // Intermediate signals
    signal shareValid;
    signal voteValid;
    signal merkleValid;
    
    // Verify shares are valid (0 < shares <= totalShares)
    component shareRangeCheck = LessThan(252);
    shareRangeCheck.in[0] <== shares;
    shareRangeCheck.in[1] <== totalShares;
    shareValid <== shareRangeCheck.out;
    
    // Verify vote choice is binary (0 or 1)
    component voteCheck = Num2Bits(1);
    voteCheck.in <== voteChoice;
    voteValid <== voteCheck.out[0];
    
    // Verify Merkle path
    component hasher = Poseidon(3);
    hasher.inputs[0] <== voterKey;
    hasher.inputs[1] <== shares;
    hasher.inputs[2] <== 0; // Salt
    
    // Compute Merkle path
    signal intermediate[32];
    intermediate[0] <== hasher.out;
    
    for (var i = 0; i < 32; i++) {
        component hashLevel = Poseidon(2);
        component mux = MultiMux1(2);
        
        // Select proper ordering based on path index
        mux.c[0][0] <== intermediate[i];
        mux.c[0][1] <== merklePath[i];
        mux.c[1][0] <== merklePath[i];
        mux.c[1][1] <== intermediate[i];
        mux.s <== merklePathIndices[i];
        
        hashLevel.inputs[0] <== mux.out[0];
        hashLevel.inputs[1] <== mux.out[1];
        
        if (i < 31) {
            intermediate[i + 1] <== hashLevel.out;
        } else {
            merkleValid <== hashLevel.out - merkleRoot;
        }
    }
    
    // Final constraints
    shareValid === 1;
    voteValid === 1;
    merkleValid === 0;
}

component main {public [merkleRoot, totalShares]} = VoteVerifier();