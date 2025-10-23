import { describe, it, expect } from 'vitest';
import { buildPaymentHeader, parsePaymentHeader } from './header';

describe('x402 header utilities', () => {
  describe('buildPaymentHeader', () => {
    it('should build a valid payment header for devnet', () => {
      const transaction = {
        signature: 'test-signature-123',
        payer: 'test-payer-wallet',
        network: 'devnet',
      };

      const header = buildPaymentHeader(transaction, 'devnet');
      expect(header).toBeTruthy();
      expect(typeof header).toBe('string');

      // Should be base64 encoded
      const decoded = parsePaymentHeader(header);
      expect(decoded).toBeTruthy();
      expect(decoded?.x402Version).toBe(1);
      expect(decoded?.scheme).toBe('exact');
      expect(decoded?.network).toBe('solana-devnet');
      expect(decoded?.payload.signature).toBe('test-signature-123');
      expect(decoded?.payload.payer).toBe('test-payer-wallet');
    });

    it('should build a valid payment header for mainnet', () => {
      const transaction = {
        signature: 'mainnet-sig',
        payer: 'mainnet-payer',
        network: 'mainnet-beta',
      };

      const header = buildPaymentHeader(transaction, 'mainnet-beta');
      const decoded = parsePaymentHeader(header);
      
      expect(decoded?.network).toBe('solana-mainnet');
    });
  });

  describe('parsePaymentHeader', () => {
    it('should parse a valid header', () => {
      const header = buildPaymentHeader({
        signature: 'sig',
        payer: 'payer',
        network: 'devnet',
      });

      const parsed = parsePaymentHeader(header);
      expect(parsed).toBeTruthy();
      expect(parsed?.payload.signature).toBe('sig');
    });

    it('should return null for invalid header', () => {
      expect(parsePaymentHeader('invalid')).toBeNull();
      expect(parsePaymentHeader('')).toBeNull();
    });
  });
});
