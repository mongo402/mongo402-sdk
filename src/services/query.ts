/**
 * Query service for executing paid MongoDB queries
 */

import { HttpClient } from '../core/http';
import { API_ENDPOINTS } from '../core/constants';
import type {
  QueryRequest,
  QueryResponse,
} from '../types';

export interface QueryOptions {
  /** X-PAYMENT header value for paid queries */
  paymentHeader?: string;
}

export class QueryService {
  constructor(private http: HttpClient) {}

  /**
   * Execute a query on an endpoint
   * For paid endpoints, this will throw PaymentRequiredError with payment info
   * 
   * @param slug - Endpoint slug
   * @param query - Query parameters
   * @param options - Optional payment header for paid queries
   */
  async execute<T = unknown>(
    slug: string,
    query: QueryRequest,
    options?: QueryOptions
  ): Promise<QueryResponse<T>> {
    const headers: Record<string, string> = {};
    
    if (options?.paymentHeader) {
      headers['X-PAYMENT'] = options.paymentHeader;
    }

    return this.http.post<QueryResponse<T>>(
      `${API_ENDPOINTS.QUERY}/${slug}`,
      query,
      { headers }
    );
  }

  /**
   * Execute a find query
   */
  async find<T = unknown>(
    slug: string,
    filter?: Record<string, unknown>,
    options?: {
      projection?: Record<string, unknown>;
      sort?: Record<string, 1 | -1>;
      limit?: number;
      skip?: number;
      paymentHeader?: string;
    }
  ): Promise<QueryResponse<T[]>> {
    const query: QueryRequest = {
      operation: 'find',
      filter,
      projection: options?.projection,
      sort: options?.sort,
      limit: options?.limit,
      skip: options?.skip,
    };

    return this.execute<T[]>(slug, query, { paymentHeader: options?.paymentHeader });
  }


  /**
   * Execute a findOne query
   */
  async findOne<T = unknown>(
    slug: string,
    filter?: Record<string, unknown>,
    options?: {
      projection?: Record<string, unknown>;
      paymentHeader?: string;
    }
  ): Promise<QueryResponse<T | null>> {
    const query: QueryRequest = {
      operation: 'findOne',
      filter,
      projection: options?.projection,
    };

    return this.execute<T | null>(slug, query, { paymentHeader: options?.paymentHeader });
  }

  /**
   * Execute a count query
   */
  async count(
    slug: string,
    filter?: Record<string, unknown>,
    options?: { paymentHeader?: string }
  ): Promise<QueryResponse<{ count: number }>> {
    const query: QueryRequest = {
      operation: 'count',
      filter,
    };

    return this.execute<{ count: number }>(slug, query, { paymentHeader: options?.paymentHeader });
  }

  /**
   * Execute an aggregation pipeline
   */
  async aggregate<T = unknown>(
    slug: string,
    pipeline: Record<string, unknown>[],
    options?: { paymentHeader?: string }
  ): Promise<QueryResponse<T[]>> {
    const query: QueryRequest = {
      operation: 'aggregate',
      pipeline,
    };

    return this.execute<T[]>(slug, query, { paymentHeader: options?.paymentHeader });
  }

  /**
   * Execute a distinct query
   */
  async distinct<T = unknown>(
    slug: string,
    field: string,
    filter?: Record<string, unknown>,
    options?: { paymentHeader?: string }
  ): Promise<QueryResponse<T[]>> {
    const query: QueryRequest = {
      operation: 'distinct',
      field,
      filter,
    };

    return this.execute<T[]>(slug, query, { paymentHeader: options?.paymentHeader });
  }
}
