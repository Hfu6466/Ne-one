import { describe, it, expect } from 'vitest';
import { calculateAge } from '../../lib/ageCalculator';

describe('calculateAge', () => {
  it('should calculate the correct age', () => {
    const dob = '1990-01-01';
    const age = calculateAge(dob);
    const now = new Date();
    const expectedYears = now.getFullYear() - 1990;
    expect(age.years).toBe(expectedYears);
  });
});
