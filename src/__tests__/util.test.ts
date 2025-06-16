import { describe, it, expect } from 'vitest';
import { triangleArea } from '../utils/geometry';

// simple area test

describe('triangleArea', () => {
  it('computes area', () => {
    const a = triangleArea({ x: 0, y: 0, z: 0 } as any, { x: 1, y: 0, z: 0 } as any, { x: 0, y: 1, z: 0 } as any);
    expect(a).toBeCloseTo(0.5);
  });
});
