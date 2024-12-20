export interface Circuit {
  constraints: Constraint[];
  numInputs: number;
  numVariables: number;
}

export interface Constraint {
  a: number[];
  b: number[];
  c: number[];
}

export interface Witness {
  inputs: bigint[];
  variables: bigint[];
}

export interface Proof {
  commitment: string;
  challenge: string;
  response: string;
}