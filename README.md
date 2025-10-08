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
