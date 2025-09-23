/**
 * x402 Payment Header Builder
 */

import type { X402PaymentHeader, TransactionResult } from './types';

/**
 * Build the X-PAYMENT header value from a transaction result
 */
export function buildPaymentHeader(
  transaction: TransactionResult,
  network: 'mainnet-beta' | 'devnet' = 'devnet'
): string {
  const header: X402PaymentHeader = {
    x402Version: 1,
    scheme: 'exact',
    network: network === 'mainnet-beta' ? 'solana-mainnet' : 'solana-devnet',
    payload: {
      signature: transaction.signature,
      payer: transaction.payer,
    },
  };

  // Base64 encode the JSON
  const jsonString = JSON.stringify(header);
  
  // Use btoa for browser, Buffer for Node.js
  if (typeof btoa !== 'undefined') {
    return btoa(jsonString);
  }
  
  return Buffer.from(jsonString).toString('base64');
}

/**
 * Parse an X-PAYMENT header value
 */
export function parsePaymentHeader(headerValue: string): X402PaymentHeader | null {
  try {
    let jsonString: string;
    
    // Use atob for browser, Buffer for Node.js
    if (typeof atob !== 'undefined') {
      jsonString = atob(headerValue);
    } else {
      jsonString = Buffer.from(headerValue, 'base64').toString('utf-8');
    }
    
    return JSON.parse(jsonString) as X402PaymentHeader;
  } catch {
    return null;
  }
}
