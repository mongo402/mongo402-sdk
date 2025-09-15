/**
 * Payments service for viewing payment history and stats
 */

import { HttpClient } from '../core/http';
import { API_ENDPOINTS } from '../core/constants';
import type { PaymentRecord, PaymentStats } from '../types';

export class PaymentsService {
  constructor(private http: HttpClient) {}

  /**
   * Get payment history for current user's endpoints
   * Requires authentication
   */
  async getPayments(limit: number = 50): Promise<PaymentRecord[]> {
    return this.http.get<PaymentRecord[]>(`${API_ENDPOINTS.PAYMENTS}?limit=${limit}`);
  }

  /**
   * Get payment statistics for current user
   * Requires authentication
   */
  async getStats(): Promise<PaymentStats> {
    return this.http.get<PaymentStats>(API_ENDPOINTS.PAYMENTS_STATS);
  }
}
