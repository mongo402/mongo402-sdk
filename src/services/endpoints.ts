/**
 * Endpoints service for browsing and managing API endpoints
 */

import { HttpClient } from '../core/http';
import { API_ENDPOINTS } from '../core/constants';
import type {
  EndpointPublic,
  EndpointDetail,
  EndpointCreate,
  EndpointUpdate,
  EndpointResponse,
} from '../types';

export interface EndpointFilters {
  category?: string;
  min_price?: number;
  max_price?: number;
}

export class EndpointsService {
  constructor(private http: HttpClient) {}

  /**
   * Get all public endpoints with optional filtering
   */
  async getPublicEndpoints(filters?: EndpointFilters): Promise<EndpointPublic[]> {
    const params = new URLSearchParams();
    
    if (filters?.category) {
      params.append('category', filters.category);
    }
    if (filters?.min_price !== undefined) {
      params.append('min_price', filters.min_price.toString());
    }
    if (filters?.max_price !== undefined) {
      params.append('max_price', filters.max_price.toString());
    }

    const queryString = params.toString();
    const url = queryString 
      ? `${API_ENDPOINTS.ENDPOINTS_PUBLIC}?${queryString}`
      : API_ENDPOINTS.ENDPOINTS_PUBLIC;

    return this.http.get<EndpointPublic[]>(url);
  }

  /**
   * Get endpoint details by slug
   */
  async getEndpointBySlug(slug: string): Promise<EndpointDetail> {
    return this.http.get<EndpointDetail>(`${API_ENDPOINTS.QUERY}/${slug}`);
  }
}


  // ============ Seller Methods (require authentication) ============

  /**
   * Get current user's endpoints
   * Requires authentication
   */
  async getMyEndpoints(): Promise<EndpointResponse[]> {
    return this.http.get<EndpointResponse[]>(API_ENDPOINTS.ENDPOINTS);
  }

  /**
   * Create a new endpoint
   * Requires authentication
   */
  async createEndpoint(data: EndpointCreate): Promise<EndpointResponse> {
    return this.http.post<EndpointResponse>(API_ENDPOINTS.ENDPOINTS, data);
  }

  /**
   * Get a specific endpoint by ID
   * Requires authentication and ownership
   */
  async getEndpoint(endpointId: string): Promise<EndpointResponse> {
    return this.http.get<EndpointResponse>(`${API_ENDPOINTS.ENDPOINTS}/${endpointId}`);
  }

  /**
   * Update an endpoint
   * Requires authentication and ownership
   */
  async updateEndpoint(endpointId: string, data: EndpointUpdate): Promise<EndpointResponse> {
    return this.http.patch<EndpointResponse>(`${API_ENDPOINTS.ENDPOINTS}/${endpointId}`, data);
  }

  /**
   * Delete an endpoint
   * Requires authentication and ownership
   */
  async deleteEndpoint(endpointId: string): Promise<{ message: string }> {
    return this.http.delete<{ message: string }>(`${API_ENDPOINTS.ENDPOINTS}/${endpointId}`);
  }
}
