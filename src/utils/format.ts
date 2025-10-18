/**
 * Formatting utilities
 */

/**
 * Format USDC amount for display
 */
export function formatUsdc(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

/**
 * Format USDC lamports to human readable
 */
export function lamportsToUsdc(lamports: string | number): number {
  const value = typeof lamports === 'string' ? parseInt(lamports, 10) : lamports;
  return value / 1_000_000;
}

/**
 * Convert USDC to lamports
 */
export function usdcToLamports(usdc: number): string {
  return Math.floor(usdc * 1_000_000).toString();
}

/**
 * Truncate wallet address for display
 */
export function truncateAddress(address: string, chars: number = 4): string {
  if (address.length <= chars * 2 + 3) return address;
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

/**
 * Format date for display
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format execution time
 */
export function formatExecutionTime(ms: number): string {
  if (ms < 1000) return `${ms.toFixed(0)}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}
