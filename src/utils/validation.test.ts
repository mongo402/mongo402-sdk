import { describe, it, expect } from 'vitest';
import {
  isValidSolanaAddress,
  isValidSlug,
  isValidUsdcAmount,
  isValidOperation,
  isValidFilter,
} from './validation';

describe('validation utilities', () => {
  describe('isValidSolanaAddress', () => {
    it('should accept valid Solana addresses', () => {
      expect(isValidSolanaAddress('11111111111111111111111111111111')).toBe(true);
      expect(isValidSolanaAddress('So11111111111111111111111111111111111111112')).toBe(true);
    });

    it('should reject invalid addresses', () => {
      expect(isValidSolanaAddress('')).toBe(false);
      expect(isValidSolanaAddress('short')).toBe(false);
      expect(isValidSolanaAddress('contains-invalid-chars-0OIl')).toBe(false);
    });
  });

  describe('isValidSlug', () => {
    it('should accept valid slugs', () => {
      expect(isValidSlug('abc123XY')).toBe(true);
      expect(isValidSlug('test-slug_123')).toBe(true);
    });

    it('should reject invalid slugs', () => {
      expect(isValidSlug('')).toBe(false);
      expect(isValidSlug('short')).toBe(false);
      expect(isValidSlug('has spaces')).toBe(false);
    });
  });

  describe('isValidUsdcAmount', () => {
    it('should accept valid amounts', () => {
      expect(isValidUsdcAmount(0)).toBe(true);
      expect(isValidUsdcAmount(0.01)).toBe(true);
      expect(isValidUsdcAmount(10)).toBe(true);
      expect(isValidUsdcAmount(0.000001)).toBe(true);
    });

    it('should reject invalid amounts', () => {
      expect(isValidUsdcAmount(-1)).toBe(false);
      expect(isValidUsdcAmount(11)).toBe(false);
      expect(isValidUsdcAmount(0.0000001)).toBe(false);
    });
  });

  describe('isValidOperation', () => {
    it('should accept valid operations', () => {
      expect(isValidOperation('find')).toBe(true);
      expect(isValidOperation('findOne')).toBe(true);
      expect(isValidOperation('count')).toBe(true);
      expect(isValidOperation('aggregate')).toBe(true);
      expect(isValidOperation('distinct')).toBe(true);
    });

    it('should reject invalid operations', () => {
      expect(isValidOperation('delete')).toBe(false);
      expect(isValidOperation('update')).toBe(false);
      expect(isValidOperation('')).toBe(false);
    });
  });

  describe('isValidFilter', () => {
    it('should accept valid filters', () => {
      expect(isValidFilter({})).toBe(true);
      expect(isValidFilter({ name: 'test' })).toBe(true);
      expect(isValidFilter(null)).toBe(true);
      expect(isValidFilter(undefined)).toBe(true);
    });

    it('should reject invalid filters', () => {
      expect(isValidFilter([])).toBe(false);
      expect(isValidFilter('string')).toBe(false);
      expect(isValidFilter(123)).toBe(false);
    });
  });
});
