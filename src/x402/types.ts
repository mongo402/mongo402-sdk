/**
 * x402 Protocol Types
 */

export interface X402PaymentInfo {
  /** Amount in USDC (human readable) */
  amount: number;
  /** Amount in USDC lamports (6 decimals) */
  amountLamports: string;
  /** Recipient wallet address */
  recipient: string;
  /** Solana network */
  network: 'mainnet-beta' | 'devnet';
  /** USDC token mint address */
  usdcMint: string;
  /** Endpoint slug */
  endpointSlug: string;
  /** Endpoint name */
  endpointName: string;
}

export interface X402PaymentHeader {
  x402Version: number;
  scheme: string;
  network: string;
  payload: {
    signature: string;
    payer: string;
  };
}

export interface TransactionResult {
  signature: string;
  payer: string;
  network: string;
}
