pragma circom 2.1.4;

include "node_modules/circomlib/circuits/comparators.circom";
include "node_modules/circomlib/circuits/bitify.circom";

/*
 * Range proof helper
 * Verifies a number is within a valid range
 */
template RangeProof(bits) {
    signal input in;
    signal input max;
    
    component n2b = Num2Bits(bits);
    n2b.in <== in;
    
    component lt = LessThan(bits);
    lt.in[0] <== in;
    lt.in[1] <== max;
    
    lt.out === 1;
}