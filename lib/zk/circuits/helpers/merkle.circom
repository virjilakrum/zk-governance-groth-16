pragma circom 2.1.4;

include "node_modules/circomlib/circuits/poseidon.circom";
include "node_modules/circomlib/circuits/mux1.circom";

/*
 * Merkle tree verification helper
 * Verifies inclusion of a leaf in a Merkle tree
 */
template MerkleVerifier(levels) {
    signal input leaf;
    signal input root;
    signal input pathElements[levels];
    signal input pathIndices[levels];
    
    signal intermediate[levels + 1];
    intermediate[0] <== leaf;
    
    for (var i = 0; i < levels; i++) {
        component hashLevel = Poseidon(2);
        component mux = MultiMux1(2);
        
        mux.c[0][0] <== intermediate[i];
        mux.c[0][1] <== pathElements[i];
        mux.c[1][0] <== pathElements[i];
        mux.c[1][1] <== intermediate[i];
        mux.s <== pathIndices[i];
        
        hashLevel.inputs[0] <== mux.out[0];
        hashLevel.inputs[1] <== mux.out[1];
        
        intermediate[i + 1] <== hashLevel.out;
    }
    
    // Final root check
    root === intermediate[levels];
}