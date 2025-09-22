/**
 * x402 Response Parser
 */

import { USDC_MINT } from '../core/constants';
import type { X402Response } from '../types';
import type { X402PaymentInfo } from './types';

/**
 * Parse a 402 response to extract payment information
 */
export function parseX402Response(
  response: X402Response,
  endpointSlug: string
): X402PaymentInfo | null {
  if (!response.accepts || response.accepts.length === 0) {
    return null;
  }

  const accept = response.accepts[0];
  
  // Parse network
  const network = accept.network.includes('mainnet') 
    ? 'mainnet-beta' 
    : 'devnet';

  // Convert lamports to human readable amount (6 decimals for USDC)
  const amountLamports = accept.maxAmountRequired;
  const amount = parseInt(amountLamports, 10) / 1_000_000;

  return {
    amount,
    amountLamports,
    recipient: accept.payTo,
    network,
    usdcMint: USDC_MINT[network],
    endpointSlug,
    endpointName: accept.description.replace('Query: ', ''),
  };
}

/**
 * Check if an error is a 402 Payment Required error
 */
export function isPaymentRequired(error: unknown): boolean {
  if (error && typeof error === 'object' && 'name' in error) {
    return (error as { name: string }).name === 'PaymentRequiredError';
  }
  return false;
}
