export type Stage = 'setup' | 'commitment' | 'challenge' | 'response' | 'verification' | 'complete';

export interface StageProps {
  stage: Stage;
  progress?: number;
}

export interface Point {
  x: number;
  y: number;
  opacity?: number;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  angle: number;
}