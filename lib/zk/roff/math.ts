// Field arithmetic operations for ZK proofs
export const FIELD_SIZE = BigInt(1 << 32);

export const generateRandomField = (): bigint => {
  const randomValue = new Uint32Array(1);
  crypto.getRandomValues(randomValue);
  return BigInt(randomValue[0]);
};

export const addField = (a: bigint, b: bigint): bigint => {
  const result = (a + b) % FIELD_SIZE;
  return result >= 0 ? result : result + FIELD_SIZE;
};

export const mulField = (a: bigint, b: bigint): bigint => {
  const result = (a * b) % FIELD_SIZE;
  return result >= 0 ? result : result + FIELD_SIZE;
};

export const computeLinearCombination = (
  vector: bigint[],
  scalar: bigint
): bigint => {
  return vector.reduce(
    (acc, val) => addField(acc, mulField(val, scalar)),
    BigInt(0)
  );
};