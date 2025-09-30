/**
 * Buyer Client - For consumers of paid MongoDB endpoints
 */

import { HttpClient } from '../core/http';
import { DEFAULT_BASE_URL, DEFAULT_TIMEOUT, DEFAULT_NETWORK } from '../core/constants';
import { AuthService } from '../services/auth';
import { EndpointsService } from '../services/endpoints';
import { QueryService } from '../services/query';
import { StarsService } from '../services/stars';
import { buildPaymentHeader } from '../x402/header';
import { parseX402Response } from '../x402/parser';
import type { BuyerConfig, QueryRequest, QueryResponse, EndpointDetail } from '../types';
import type { X402PaymentInfo, TransactionResult } from '../x402/types';

export class BuyerClient {
  private http: HttpClient;
  private _network: 'mainnet-beta' | 'devnet';
  
  public readonly auth: AuthService;
  public readonly endpoints: EndpointsService;
  public readonly query: QueryService;
  public readonly stars: StarsService;

  constructor(config: BuyerConfig = {}) {
    this.http = new HttpClient({
      baseUrl: config.baseUrl || DEFAULT_BASE_URL,
      timeout: config.timeout || DEFAULT_TIMEOUT,
    });

    this._network = config.network || DEFAULT_NETWORK;

    if (config.accessToken) {
      this.http.setAccessToken(config.accessToken);
    }

    // Initialize services
    this.auth = new AuthService(this.http);
    this.endpoints = new EndpointsService(this.http);
    this.query = new QueryService(this.http);
    this.stars = new StarsService(this.http);
  }

  get network(): 'mainnet-beta' | 'devnet' {
    return this._network;
  }


  /**
   * Browse available endpoints
   */
  async browseEndpoints(filters?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
  }) {
    return this.endpoints.getPublicEndpoints({
      category: filters?.category,
      min_price: filters?.minPrice,
      max_price: filters?.maxPrice,
    });
  }

  /**
   * Get endpoint details by slug
   */
  async getEndpoint(slug: string): Promise<EndpointDetail> {
    return this.endpoints.getEndpointBySlug(slug);
  }

  /**
   * Execute a query on a free endpoint
   */
  async queryFree<T = unknown>(
    slug: string,
    query: QueryRequest
  ): Promise<QueryResponse<T>> {
    return this.query.execute<T>(slug, query);
  }

  /**
   * Execute a query on a paid endpoint with payment
   * @param slug - Endpoint slug
   * @param query - Query parameters
   * @param transaction - Completed Solana transaction result
   */
  async queryPaid<T = unknown>(
    slug: string,
    query: QueryRequest,
    transaction: TransactionResult
  ): Promise<QueryResponse<T>> {
    const paymentHeader = buildPaymentHeader(transaction, this._network);
    return this.query.execute<T>(slug, query, { paymentHeader });
  }

  /**
   * Get payment info for an endpoint (useful for preparing payment)
   */
  async getPaymentInfo(slug: string): Promise<X402PaymentInfo | null> {
    const endpoint = await this.getEndpoint(slug);
    
    if (endpoint.price_usdc === 0) {
      return null; // Free endpoint
    }

    // Build payment info from endpoint data
    return {
      amount: endpoint.price_usdc,
      amountLamports: (endpoint.price_usdc * 1_000_000).toString(),
      recipient: endpoint.solana_wallet,
      network: this._network,
      usdcMint: this._network === 'mainnet-beta' 
        ? 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
        : '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU',
      endpointSlug: slug,
      endpointName: endpoint.name,
    };
  }
}
