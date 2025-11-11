/**
 * Seller Create Endpoint Example
 * 
 * This example shows how to create a monetized MongoDB endpoint.
 */

import { SellerClient } from '../src/seller';

async function main() {
  // Initialize client with auth token
  const client = new SellerClient({
    accessToken: 'your-jwt-token', // Get this from wallet authentication
    network: 'devnet',
  });

  // Create a new endpoint
  console.log('Creating endpoint...');
  
  const endpoint = await client.createEndpoint({
    name: 'Weather Data API',
    description: 'Real-time weather data from 10,000+ cities worldwide',
    mongodb_uri: 'mongodb+srv://user:pass@cluster.mongodb.net',
    database: 'weather',
    collection: 'current',
    allowed_operations: ['find', 'findOne', 'count', 'aggregate'],
    price_usdc: 0.005, // $0.005 per query
    sample_query: { city: 'New York' },
    solana_wallet: 'YourSolanaWalletAddress',
    tags: ['weather', 'api', 'real-time'],
    category: 'data',
  });

  console.log('Endpoint created successfully!');
  console.log(`  ID: ${endpoint.id}`);
  console.log(`  Slug: ${endpoint.slug}`);
  console.log(`  Price: $${endpoint.price_usdc}/query`);
  console.log(`  URL: https://mongo402.xyz/api/query/${endpoint.slug}`);
}

main().catch(console.error);
