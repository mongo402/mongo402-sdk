# @mongo402/sdk

Official SDK for **mongo402** - Pay-per-query MongoDB access using x402 protocol with USDC on Solana.

[![npm version](https://badge.fury.io/js/@mongo402%2Fsdk.svg)](https://www.npmjs.com/package/@mongo402/sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

mongo402 enables data providers to monetize their MongoDB databases through a simple pay-per-query model. Buyers pay with USDC on Solana, and sellers receive instant payments for each query.

## Installation

```bash
npm install @mongo402/sdk
# or
yarn add @mongo402/sdk
# or
pnpm add @mongo402/sdk
```

### Peer Dependencies

```bash
npm install @solana/web3.js
```

## Quick Start

### For Buyers (Data Consumers)

```typescript
import { BuyerClient } from '@mongo402/sdk/buyer';

const client = new BuyerClient({
  network: 'devnet', // or 'mainnet-beta'
});

// Browse available endpoints
const endpoints = await client.browseEndpoints();

// Query a free endpoint
const result = await client.queryFree('endpoint-slug', {
  operation: 'find',
  filter: { status: 'active' },
  limit: 10,
});

console.log(result.data);
```

### For Sellers (Data Providers)

```typescript
import { SellerClient } from '@mongo402/sdk/seller';

const client = new SellerClient({
  accessToken: 'your-jwt-token',
  network: 'devnet',
});

// Create a monetized endpoint
const endpoint = await client.createEndpoint({
  name: 'Premium Data API',
  description: 'Access to premium market data',
  mongodb_uri: 'mongodb+srv://...',
  database: 'mydb',
  collection: 'data',
  price_usdc: 0.01, // $0.01 per query
  sample_query: { type: 'market' },
  solana_wallet: 'YourSolanaWalletAddress',
  tags: ['market', 'data'],
  category: 'finance',
});

// Check revenue
const stats = await client.getRevenueStats();
console.log(`Total earned: $${stats.total_received_usdc}`);
```


## Paid Queries with x402 Protocol

For paid endpoints, you need to complete a USDC payment on Solana before querying:

```typescript
import { BuyerClient } from '@mongo402/sdk/buyer';
import { Connection, PublicKey, Transaction } from '@solana/web3.js';

const client = new BuyerClient({ network: 'devnet' });

// 1. Get payment info for the endpoint
const paymentInfo = await client.getPaymentInfo('paid-endpoint-slug');

if (paymentInfo) {
  // 2. Create and send USDC transfer transaction
  // (Use your preferred Solana wallet adapter)
  const transaction = await createUsdcTransfer({
    recipient: paymentInfo.recipient,
    amount: paymentInfo.amountLamports,
    mint: paymentInfo.usdcMint,
  });
  
  const signature = await sendTransaction(transaction);
  
  // 3. Query with payment proof
  const result = await client.queryPaid('paid-endpoint-slug', 
    { operation: 'find', filter: {} },
    { signature, payer: 'your-wallet-address', network: 'devnet' }
  );
}
```

## API Reference

### BuyerClient

| Method | Description |
|--------|-------------|
| `browseEndpoints(filters?)` | List available endpoints |
| `getEndpoint(slug)` | Get endpoint details |
| `queryFree(slug, query)` | Query a free endpoint |
| `queryPaid(slug, query, tx)` | Query with payment |
| `getPaymentInfo(slug)` | Get payment requirements |

### SellerClient

| Method | Description |
|--------|-------------|
| `createEndpoint(data)` | Create new endpoint |
| `getMyEndpoints()` | List your endpoints |
| `updateEndpoint(id, data)` | Update endpoint |
| `deleteEndpoint(id)` | Delete endpoint |
| `getPaymentHistory(limit?)` | View payments received |
| `getRevenueStats()` | Get revenue statistics |

## Query Operations

Supported MongoDB operations:

- `find` - Find multiple documents
- `findOne` - Find a single document
- `count` - Count documents
- `aggregate` - Run aggregation pipeline
- `distinct` - Get distinct values

```typescript
// Find with options
await client.query.find('slug', { status: 'active' }, {
  projection: { name: 1, price: 1 },
  sort: { price: -1 },
  limit: 20,
  skip: 0,
});

// Aggregation
await client.query.aggregate('slug', [
  { $match: { category: 'tech' } },
  { $group: { _id: '$type', count: { $sum: 1 } } },
]);
```
