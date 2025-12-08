/**
 * Validation utilities
 */

/**
 * Validate a Solana wallet address format
 */
export function isValidSolanaAddress(address: string): boolean {
  // Base58 characters (no 0, O, I, l)
  const base58Regex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
  return base58Regex.test(address);
}

/**
 * Validate endpoint slug format
 */
export function isValidSlug(slug: string): boolean {
  // URL-safe base64 format
  const slugRegex = /^[A-Za-z0-9_-]{8,}$/;
  return slugRegex.test(slug);
}

/**
 * Validate USDC amount (must be positive and have max 6 decimals)
 */
export function isValidUsdcAmount(amount: number): boolean {
  if (typeof amount !== 'number' || isNaN(amount)) return false;
  if (amount < 0) return false;
  if (amount > 10) return false; // Max price per query
  if (!isFinite(amount)) return false;
  
  // Check for max 6 decimal places by multiplying and checking if it's an integer
  // This handles scientific notation correctly
  const scaled = amount * 1_000_000;
  if (!Number.isInteger(Math.round(scaled * 1e10) / 1e10)) return false;
  
  return true;
}

/**
 * Validate query operation
 */
export function isValidOperation(operation: string): boolean {
  const validOps = ['find', 'findOne', 'count', 'aggregate', 'distinct'];
  return validOps.includes(operation);
}

/**
 * Validate MongoDB filter object (basic check)
 */
export function isValidFilter(filter: unknown): boolean {
  if (filter === null || filter === undefined) return true;
  if (typeof filter !== 'object') return false;
  if (Array.isArray(filter)) return false;
  return true;
}
