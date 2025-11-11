/**
 * Paid Query Example
 * 
 * This example shows how to execute a paid query with x402 protocol.
 * Note: This requires a Solana wallet and USDC tokens.
 */

import { BuyerClient, PaymentRequiredError } from '../src';

async function main() {
  const client = new BuyerClient({
    network: 'devnet',
  });

  const slug = 'your-paid-endpoint-slug';

  try {
    // Try to query without payment (will fail for paid endpoints)
    await client.queryFree(slug, {
      operation: 'find',
      filter: {},
    });
  } catch (error) {
    if (error instanceof PaymentRequiredError) {
      console.log('Payment required!');
      console.log('Payment info:', error.paymentInfo);

      // Get detailed payment info
      const paymentInfo = await client.getPaymentInfo(slug);
      
      if (paymentInfo) {
        console.log(`\nTo query this endpoint:`);
        console.log(`  Amount: $${paymentInfo.amount} USDC`);
        console.log(`  Recipient: ${paymentInfo.recipient}`);
        console.log(`  Network: ${paymentInfo.network}`);
        console.log(`  USDC Mint: ${paymentInfo.usdcMint}`);

        // After completing the USDC transfer on Solana:
        // const result = await client.queryPaid(slug, query, {
        //   signature: 'your-tx-signature',
        //   payer: 'your-wallet-address',
        //   network: 'devnet',
        // });
      }
    } else {
      throw error;
    }
  }
}

main().catch(console.error);
