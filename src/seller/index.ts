/**
 * Seller Module - For data providers monetizing MongoDB endpoints
 * 
 * @example
 * ```typescript
 * import { SellerClient } from '@mongo402/sdk/seller';
 * 
 * const client = new SellerClient({
 *   accessToken: 'your-jwt-token',
 *   network: 'devnet',
 * });
 * 
 * // Create a new endpoint
 * const endpoint = await client.createEndpoint({
 *   name: 'My Data API',
 *   description: 'Premium data access',
 *   mongodb_uri: 'mongodb+srv://...',
 *   database: 'mydb',
 *   collection: 'data',
 *   price_usdc: 0.01,
 *   sample_query: { status: 'active' },
 *   solana_wallet: 'your-wallet-address',
 * });
 * 
 * // Get revenue stats
 * const stats = await client.getRevenueStats();
 * ```
 */

export { SellerClient } from './client';
export type { SellerConfig } from '../types';
