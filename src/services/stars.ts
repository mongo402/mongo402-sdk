/**
 * Stars and Views service for endpoint engagement
 */

import { HttpClient } from '../core/http';
import { API_ENDPOINTS } from '../core/constants';
import type { ViewsResponse, StarResponse, UserStarsResponse } from '../types';

export class StarsService {
  constructor(private http: HttpClient) {}

  /**
   * Increment views for an endpoint (public, no auth required)
   */
  async incrementViews(endpointId: string): Promise<ViewsResponse> {
    const url = API_ENDPOINTS.ENDPOINT_VIEW.replace('{id}', endpointId);
    return this.http.post<ViewsResponse>(url);
  }

  /**
   * Toggle star status for an endpoint
   * Requires authentication
   */
  async toggleStar(endpointId: string): Promise<StarResponse> {
    const url = API_ENDPOINTS.ENDPOINT_STAR.replace('{id}', endpointId);
    return this.http.post<StarResponse>(url);
  }

  /**
   * Check if current user has starred an endpoint
   * Requires authentication
   */
  async isStarred(endpointId: string): Promise<StarResponse> {
    const url = API_ENDPOINTS.ENDPOINT_STARRED.replace('{id}', endpointId);
    return this.http.get<StarResponse>(url);
  }

  /**
   * Get all endpoints starred by current user
   * Requires authentication
   */
  async getUserStars(): Promise<UserStarsResponse> {
    return this.http.get<UserStarsResponse>(API_ENDPOINTS.USER_STARS);
  }
}
