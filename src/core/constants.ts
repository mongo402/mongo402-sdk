/**
 * SDK Constants
 */

export const DEFAULT_BASE_URL = 'https://mongo402.xyz/api';
export const DEFAULT_TIMEOUT = 30000;
export const DEFAULT_NETWORK = 'devnet';

// USDC Token addresses
export const USDC_MINT = {
  'mainnet-beta': 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  'devnet': '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU',
} as const;

// Solana RPC endpoints
export const SOLANA_RPC = {
  'mainnet-beta': 'https://api.mainnet-beta.solana.com',
  'devnet': 'https://api.devnet.solana.com',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH_NONCE: '/auth/nonce',
  AUTH_WALLET: '/auth/wallet',
  AUTH_ME: '/auth/me',
  AUTH_UPDATE_NAME: '/auth/me/name',
  
  // Endpoints
  ENDPOINTS: '/endpoints',
  ENDPOINTS_PUBLIC: '/endpoints/public',
  
  // Query
  QUERY: '/query',
  
  // Payments
  PAYMENTS: '/payments',
  PAYMENTS_STATS: '/payments/stats',
  
  // Views & Stars
  ENDPOINT_VIEW: '/endpoints/{id}/view',
  ENDPOINT_STAR: '/endpoints/{id}/star',
  ENDPOINT_STARRED: '/endpoints/{id}/starred',
  USER_STARS: '/stars',
} as const;
