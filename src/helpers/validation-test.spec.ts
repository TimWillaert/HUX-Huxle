import { describe, it, expect } from 'vitest';
import { containsSpecialChars } from './validation';

describe('word validation helper', () => {
  it('should return false if string only contains normal letters (case insensitive)', () => {
    expect(containsSpecialChars('myteststring')).toBe(false);
    expect(containsSpecialChars('MyTEsTsTrIng')).toBe(false);
  });
  it('should return true if string contains illegal characters', () => {
    expect(containsSpecialChars('test2')).toBe(true);
    expect(containsSpecialChars('he@llo')).toBe(true);
  });
});
