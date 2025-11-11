/**
 * Seller Revenue Tracking Example
 * 
 * This example shows how to track revenue and manage endpoints.
 */

import { SellerClient } from '../src/seller';

async function main() {
  const client = new SellerClient({
    accessToken: 'your-jwt-token',
    network: 'devnet',
  });

  // Get all your endpoints
  console.log('Fetching your endpoints...');
  const endpoints = await client.getMyEndpoints();
  
  console.log(`\nYou have ${endpoints.length} endpoints:\n`);
  
  for (const ep of endpoints) {
    console.log(`📊 ${ep.name}`);
    console.log(`   Slug: ${ep.slug}`);
    console.log(`   Price: $${ep.price_usdc}/query`);
    console.log(`   Queries: ${ep.queries_count}`);
    console.log(`   Revenue: $${ep.total_revenue_usdc.toFixed(2)}`);
    console.log(`   Views: ${ep.views} | Stars: ${ep.stars}`);
    console.log(`   Active: ${ep.is_active ? '✅' : '❌'}`);
    console.log('');
  }

  // Get overall revenue stats
  console.log('Fetching revenue stats...');
  const stats = await client.getRevenueStats();
  
  console.log('\n💰 Revenue Summary:');
  console.log(`   Total Received: $${stats.total_received_usdc.toFixed(2)} USDC`);
  console.log(`   Total Payments: ${stats.total_payments}`);
  console.log(`   Active Endpoints: ${stats.endpoints_count}`);
  console.log(`   Network: ${stats.network}`);

  // Get recent payments
  console.log('\n📜 Recent Payments:');
  const payments = await client.getPaymentHistory(5);
  
  for (const payment of payments) {
    console.log(`   ${payment.created_at}: $${payment.amount_usdc} from ${payment.payer_wallet.slice(0, 8)}...`);
  }
}

main().catch(console.error);
