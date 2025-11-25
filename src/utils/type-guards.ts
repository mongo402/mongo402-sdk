/**
 * Type guards for runtime type checking
 */

import type {
  QueryResponse,
  QueryErrorResponse,
  EndpointPublic,
  EndpointDetail,
  PaymentRecord,
  X402Response,
} from '../types';

/**
 * Check if response is a successful query response
 */
export function isQueryResponse<T>(response: unknown): response is QueryResponse<T> {
  return (
    typeof response === 'object' &&
    response !== null &&
    'success' in response &&
    (response as QueryResponse<T>).success === true &&
    'data' in response
  );
}

/**
 * Check if response is a query error response
 */
export function isQueryError(response: unknown): response is QueryErrorResponse {
  return (
    typeof response === 'object' &&
    response !== null &&
    'success' in response &&
    (response as QueryErrorResponse).success === false &&
    'error' in response
  );
}

/**
 * Check if object is an EndpointPublic
 */
export function isEndpointPublic(obj: unknown): obj is EndpointPublic {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'slug' in obj &&
    'price_usdc' in obj &&
    'allowed_operations' in obj
  );
}

/**
 * Check if object is an EndpointDetail (has schema_info)
 */
export function isEndpointDetail(obj: unknown): obj is EndpointDetail {
  return isEndpointPublic(obj) && 'sample_data' in obj;
}

/**
 * Check if object is a PaymentRecord
 */
export function isPaymentRecord(obj: unknown): obj is PaymentRecord {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'tx_signature' in obj &&
    'amount_usdc' in obj &&
    'status' in obj
  );
}

/**
 * Check if object is an X402Response
 */
export function isX402Response(obj: unknown): obj is X402Response {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'x402Version' in obj &&
    'accepts' in obj &&
    Array.isArray((obj as X402Response).accepts)
  );
}
