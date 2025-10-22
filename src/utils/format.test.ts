import { describe, it, expect } from 'vitest';
import {
  formatUsdc,
  lamportsToUsdc,
  usdcToLamports,
  truncateAddress,
  formatDate,
  formatExecutionTime,
} from './format';

describe('format utilities', () => {
  describe('formatUsdc', () => {
    it('should format USDC amounts correctly', () => {
      expect(formatUsdc(0)).toBe('$0.00');
      expect(formatUsdc(0.01)).toBe('$0.01');
      expect(formatUsdc(1.5)).toBe('$1.50');
      expect(formatUsdc(100)).toBe('$100.00');
    });
  });

  describe('lamportsToUsdc', () => {
    it('should convert lamports to USDC', () => {
      expect(lamportsToUsdc(1000000)).toBe(1);
      expect(lamportsToUsdc('10000')).toBe(0.01);
      expect(lamportsToUsdc(0)).toBe(0);
    });
  });

  describe('usdcToLamports', () => {
    it('should convert USDC to lamports', () => {
      expect(usdcToLamports(1)).toBe('1000000');
      expect(usdcToLamports(0.01)).toBe('10000');
      expect(usdcToLamports(0)).toBe('0');
    });
  });

  describe('truncateAddress', () => {
    it('should truncate long addresses', () => {
      const address = 'So11111111111111111111111111111111111111112';
      expect(truncateAddress(address)).toBe('So11...1112');
      expect(truncateAddress(address, 6)).toBe('So1111...111112');
    });

    it('should not truncate short addresses', () => {
      expect(truncateAddress('short')).toBe('short');
    });
  });

  describe('formatDate', () => {
    it('should format dates correctly', () => {
      const date = new Date('2024-01-15');
      expect(formatDate(date)).toMatch(/Jan 15, 2024/);
    });

    it('should handle string dates', () => {
      expect(formatDate('2024-06-20')).toMatch(/Jun 20, 2024/);
    });
  });

  describe('formatExecutionTime', () => {
    it('should format milliseconds', () => {
      expect(formatExecutionTime(50)).toBe('50ms');
      expect(formatExecutionTime(999)).toBe('999ms');
    });

    it('should format seconds', () => {
      expect(formatExecutionTime(1000)).toBe('1.00s');
      expect(formatExecutionTime(2500)).toBe('2.50s');
    });
  });
});
