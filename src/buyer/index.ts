/**
 * Buyer Module - For consumers of paid MongoDB endpoints
 * 
 * @example
 * ```typescript
 * import { BuyerClient } from '@mongo402/sdk/buyer';
 * 
 * const client = new BuyerClient({
 *   network: 'devnet',
 * });
 * 
 * // Browse available endpoints
 * const endpoints = await client.browseEndpoints();
 * 
 * // Query a free endpoint
 * const result = await client.queryFree('my-endpoint', {
 *   operation: 'find',
 *   filter: { status: 'active' },
 * });
 * ```
 */

export { BuyerClient } from './client';
export type { BuyerConfig } from '../types';
