# mongo402 SDK Examples

This directory contains example code for using the mongo402 SDK.

## Buyer Examples

### Basic Usage (`buyer-basic.ts`)
Browse available endpoints and query free endpoints.

```bash
npx ts-node examples/buyer-basic.ts
```

### Paid Queries (`buyer-paid-query.ts`)
Execute paid queries using the x402 protocol with USDC on Solana.

```bash
npx ts-node examples/buyer-paid-query.ts
```

## Seller Examples

### Create Endpoint (`seller-create-endpoint.ts`)
Create a new monetized MongoDB endpoint.

```bash
npx ts-node examples/seller-create-endpoint.ts
```

### Revenue Tracking (`seller-revenue.ts`)
Track revenue and manage your endpoints.

```bash
npx ts-node examples/seller-revenue.ts
```

## Prerequisites

1. Install dependencies:
   ```bash
   npm install
   ```

2. For seller examples, you need a JWT token from wallet authentication.

3. For paid queries, you need:
   - A Solana wallet (Phantom recommended)
   - USDC tokens on devnet or mainnet

## Getting USDC on Devnet

For testing, you can get devnet USDC from the Solana faucet or use the devnet USDC mint address:
`4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU`
