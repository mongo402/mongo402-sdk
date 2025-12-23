/**
 * Seller Client - For data providers monetizing MongoDB endpoints
 */

import { HttpClient } from '../core/http';
import { DEFAULT_BASE_URL, DEFAULT_TIMEOUT, DEFAULT_NETWORK } from '../core/constants';
import { AuthService } from '../services/auth';
import { EndpointsService } from '../services/endpoints';
import { PaymentsService } from '../services/payments';
import type {
  SellerConfig,
  EndpointCreate,
  EndpointUpdate,
  EndpointResponse,
  PaymentRecord,
  PaymentStats,
} from '../types';

export class SellerClient {
  private http: HttpClient;
  private _network: 'mainnet-beta' | 'devnet';

  public readonly auth: AuthService;
  public readonly endpoints: EndpointsService;
  public readonly payments: PaymentsService;

  constructor(config: SellerConfig) {
    this.http = new HttpClient({
      baseUrl: config.baseUrl || DEFAULT_BASE_URL,
      timeout: config.timeout || DEFAULT_TIMEOUT,
    });

    this._network = config.network || DEFAULT_NETWORK;
    this.http.setAccessToken(config.accessToken);

    // Initialize services
    this.auth = new AuthService(this.http);
    this.endpoints = new EndpointsService(this.http);
    this.payments = new PaymentsService(this.http);
  }

  get network(): 'mainnet-beta' | 'devnet' {
    return this._network;
  }

  // ============ Endpoint Management ============

  /**
   * Create a new monetized endpoint
   */
  async createEndpoint(data: EndpointCreate): Promise<EndpointResponse> {
    return this.endpoints.createEndpoint(data);
  }


  /**
   * Get all your endpoints
   */
  async getMyEndpoints(): Promise<EndpointResponse[]> {
    return this.endpoints.getMyEndpoints();
  }

  /**
   * Get a specific endpoint by ID
   */
  async getEndpoint(endpointId: string): Promise<EndpointResponse> {
    return this.endpoints.getEndpoint(endpointId);
  }

  /**
   * Update an endpoint
   */
  async updateEndpoint(
    endpointId: string,
    data: EndpointUpdate
  ): Promise<EndpointResponse> {
    return this.endpoints.updateEndpoint(endpointId, data);
  }

  /**
   * Delete an endpoint
   */
  async deleteEndpoint(endpointId: string): Promise<{ message: string }> {
    return this.endpoints.deleteEndpoint(endpointId);
  }

  /**
   * Activate an endpoint
   */
  async activateEndpoint(endpointId: string): Promise<EndpointResponse> {
    return this.endpoints.updateEndpoint(endpointId, { is_active: true });
  }

  /**
   * Deactivate an endpoint
   */
  async deactivateEndpoint(endpointId: string): Promise<EndpointResponse> {
    return this.endpoints.updateEndpoint(endpointId, { is_active: false });
  }

  /**
   * Update endpoint pricing
   */
  async updatePricing(
    endpointId: string,
    priceUsdc: number
  ): Promise<EndpointResponse> {
    return this.endpoints.updateEndpoint(endpointId, { price_usdc: priceUsdc });
  }

  /**
   * Invalidate all cached results for an endpoint
   * Refs: Requirements 6.1
   * @param endpointId - The endpoint ID to invalidate cache for
   * @returns The count of invalidated cache entries
   */
  async invalidateCache(endpointId: string): Promise<{ invalidated_count: number }> {
    return this.endpoints.invalidateCache(endpointId);
  }

  // ============ Revenue & Analytics ============

  /**
   * Get payment history
   */
  async getPaymentHistory(limit: number = 50): Promise<PaymentRecord[]> {
    return this.payments.getPayments(limit);
  }

  /**
   * Get revenue statistics
   */
  async getRevenueStats(): Promise<PaymentStats> {
    return this.payments.getStats();
  }
}
