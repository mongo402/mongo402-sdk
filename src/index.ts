/**
 * mongo402 SDK
 * 
 * Official SDK for mongo402 - Pay-per-query MongoDB access using x402 protocol with USDC on Solana
 * 
 * @packageDocumentation
 */

// Main clients
export { BuyerClient } from './buyer';
export { SellerClient } from './seller';

// Types
export * from './types';

// Core utilities
export {
  Mongo402Error,
  AuthenticationError,
  PaymentRequiredError,
  NotFoundError,
  ValidationError,
  NetworkError,
} from './core/errors';

// x402 utilities
export {
  buildPaymentHeader,
  parsePaymentHeader,
  parseX402Response,
  isPaymentRequired,
} from './x402';

export type {
  X402PaymentInfo,
  X402PaymentHeader,
  TransactionResult,
} from './x402';

// Constants
export {
  DEFAULT_BASE_URL,
  USDC_MINT,
  SOLANA_RPC,
} from './core/constants';
