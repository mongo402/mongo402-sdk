/**
 * Basic Buyer Example
 * 
 * This example shows how to browse and query free endpoints.
 */

import { BuyerClient } from '../src/buyer';

async function main() {
  // Initialize client
  const client = new BuyerClient({
    network: 'devnet',
  });

  // Browse available endpoints
  console.log('Browsing endpoints...');
  const endpoints = await client.browseEndpoints();
  
  console.log(`Found ${endpoints.length} endpoints:`);
  endpoints.forEach((ep) => {
    console.log(`  - ${ep.name} (${ep.slug}): $${ep.price_usdc}/query`);
  });

  // Find a free endpoint
  const freeEndpoint = endpoints.find((ep) => ep.price_usdc === 0);
  
  if (freeEndpoint) {
    console.log(`\nQuerying free endpoint: ${freeEndpoint.name}`);
    
    // Execute a find query
    const result = await client.queryFree(freeEndpoint.slug, {
      operation: 'find',
      filter: {},
      limit: 5,
    });

    console.log(`Query executed in ${result.execution_time_ms}ms`);
    console.log(`Results: ${result.count} documents`);
    console.log(JSON.stringify(result.data, null, 2));
  }
}

main().catch(console.error);
