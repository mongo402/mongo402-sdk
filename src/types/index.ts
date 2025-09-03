/**
 * Core types for mongo402 SDK
 */

// ============ Configuration Types ============

export interface Mongo402Config {
  /** Base URL for the API (default: https://mongo402.xyz/api) */
  baseUrl?: string;
  /** Request timeout in milliseconds (default: 30000) */
  timeout?: number;
  /** Solana network to use */
  network?: 'mainnet-beta' | 'devnet';
}

export interface BuyerConfig extends Mongo402Config {
  /** JWT access token for authenticated requests */
  accessToken?: string;
}

export interface SellerConfig extends Mongo402Config {
  /** JWT access token for authenticated requests (required for seller operations) */
  accessToken: string;
}

// ============ Authentication Types ============

export interface WalletNonceResponse {
  message: string;
  nonce: string;
}

export interface WalletAuthRequest {
  wallet_address: string;
  signature: string;
  message: string;
}

export interface User {
  id: string;
  wallet_address: string;
  name?: string;
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

// ============ Schema Types ============

export interface FieldInfo {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'date' | 'objectId';
  nullable: boolean;
  indexed: boolean;
}


export interface IndexInfo {
  name: string;
  fields: string[];
  unique: boolean;
}

export interface SchemaInfo {
  fields: FieldInfo[];
  indexes: IndexInfo[];
  document_count: number;
  avg_document_size: number;
}

// ============ Endpoint Types ============

export interface EndpointPublic {
  id: string;
  name: string;
  description: string;
  database: string;
  collection: string;
  allowed_operations: QueryOperation[];
  price_usdc: number;
  sample_query: Record<string, unknown>;
  solana_wallet: string;
  owner_name: string;
  slug: string;
  views: number;
  stars: number;
  tags: string[];
  category: string;
}

export interface EndpointDetail extends EndpointPublic {
  schema_info?: SchemaInfo;
  sample_data: Record<string, unknown>[];
  created_at: string;
}

export interface EndpointCreate {
  name: string;
  description: string;
  mongodb_uri: string;
  database: string;
  collection: string;
  allowed_operations?: QueryOperation[];
  price_usdc: number;
  sample_query: Record<string, unknown>;
  solana_wallet: string;
  tags?: string[];
  category?: string;
}

export interface EndpointUpdate {
  name?: string;
  description?: string;
  price_usdc?: number;
  is_active?: boolean;
  tags?: string[];
  category?: string;
}

export interface EndpointResponse {
  id: string;
  owner_id: string;
  name: string;
  description: string;
  database: string;
  collection: string;
  allowed_operations: QueryOperation[];
  price_usdc: number;
  sample_query: Record<string, unknown>;
  solana_wallet: string;
  slug: string;
  is_active: boolean;
  queries_count: number;
  total_revenue_usdc: number;
  created_at: string;
  views: number;
  stars: number;
  tags: string[];
  category: string;
  schema_info?: SchemaInfo;
  sample_data: Record<string, unknown>[];
}


// ============ Query Types ============

export type QueryOperation = 'find' | 'findOne' | 'count' | 'aggregate' | 'distinct';

export interface QueryRequest {
  operation: QueryOperation;
  filter?: Record<string, unknown>;
  projection?: Record<string, unknown>;
  sort?: Record<string, 1 | -1>;
  limit?: number;
  skip?: number;
  pipeline?: Record<string, unknown>[];
  field?: string;
}

export interface QueryResponse<T = unknown> {
  success: boolean;
  data: T;
  count?: number;
  execution_time_ms: number;
  cost_usdc: number;
}

export interface QueryErrorResponse {
  success: false;
  error: string;
  error_code?: string;
}

// ============ x402 Payment Types ============

export interface X402Accept {
  scheme: string;
  network: string;
  maxAmountRequired: string;
  resource: string;
  description: string;
  mimeType: string;
  payTo: string;
  asset: string;
  maxTimeoutSeconds: number;
  extra: Record<string, unknown>;
}

export interface X402Response {
  x402Version: number;
  accepts: X402Accept[];
}

export interface X402PaymentPayload {
  x402Version: number;
  scheme: string;
  network: string;
  payload: {
    signature: string;
    payer: string;
  };
}

export interface X402PaymentResult {
  success: boolean;
  transaction?: string;
  network?: string;
  payer?: string;
  errorReason?: string;
}

// ============ Payment Types ============

export interface PaymentRecord {
  id: string;
  endpoint_id: string;
  endpoint_name: string;
  payer_wallet: string;
  recipient_wallet: string;
  amount_usdc: number;
  tx_signature: string;
  network: string;
  status: 'pending' | 'confirmed' | 'failed';
  created_at: string;
}

export interface PaymentStats {
  total_received_usdc: number;
  total_payments: number;
  endpoints_count: number;
  network: string;
}

// ============ Views & Stars Types ============

export interface ViewsResponse {
  endpoint_id: string;
  views: number;
}

export interface StarResponse {
  endpoint_id: string;
  is_starred: boolean;
  stars: number;
}

export interface UserStarsResponse {
  endpoint_ids: string[];
}
