/**
 * HTTP client for API requests
 */

import { DEFAULT_BASE_URL, DEFAULT_TIMEOUT } from './constants';
import {
  Mongo402Error,
  AuthenticationError,
  PaymentRequiredError,
  NotFoundError,
  ValidationError,
  NetworkError,
} from './errors';
import type { Mongo402Config, X402Response } from '../types';

export interface HttpClientConfig {
  baseUrl: string;
  timeout: number;
  accessToken?: string;
}

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
  timeout?: number;
}

export class HttpClient {
  private config: HttpClientConfig;

  constructor(config: Partial<Mongo402Config> = {}) {
    this.config = {
      baseUrl: config.baseUrl || DEFAULT_BASE_URL,
      timeout: config.timeout || DEFAULT_TIMEOUT,
    };
  }

  setAccessToken(token: string | undefined): void {
    this.config.accessToken = token;
  }

  getAccessToken(): string | undefined {
    return this.config.accessToken;
  }

  private buildUrl(path: string): string {
    const base = this.config.baseUrl.replace(/\/$/, '');
    const endpoint = path.startsWith('/') ? path : `/${path}`;
    return `${base}${endpoint}`;
  }


  private buildHeaders(customHeaders?: Record<string, string>): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };

    if (this.config.accessToken) {
      headers['Authorization'] = `Bearer ${this.config.accessToken}`;
    }

    return headers;
  }

  async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const url = this.buildUrl(path);
    const method = options.method || 'GET';
    const headers = this.buildHeaders(options.headers);
    const timeout = options.timeout || this.config.timeout;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const fetchOptions: RequestInit = {
        method,
        headers,
        signal: controller.signal,
      };

      if (options.body && method !== 'GET') {
        fetchOptions.body = JSON.stringify(options.body);
      }

      const response = await fetch(url, fetchOptions);
      clearTimeout(timeoutId);

      return await this.handleResponse<T>(response);
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Mongo402Error) {
        throw error;
      }

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new NetworkError(`Request timeout after ${timeout}ms`);
        }
        throw new NetworkError(error.message);
      }

      throw new NetworkError('Unknown network error');
    }
  }


  private async handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');

    if (response.ok) {
      if (isJson) {
        return response.json() as Promise<T>;
      }
      return response.text() as unknown as T;
    }

    // Handle error responses
    let errorData: { detail?: string; error?: string } = {};
    if (isJson) {
      try {
        errorData = await response.json() as { detail?: string; error?: string };
      } catch {
        // Ignore JSON parse errors
      }
    }

    const errorMessage = errorData.detail || errorData.error || response.statusText;

    switch (response.status) {
      case 401:
        throw new AuthenticationError(errorMessage);
      case 402: {
        const x402Data = errorData as unknown as X402Response;
        const accept = x402Data.accepts?.[0];
        throw new PaymentRequiredError(errorMessage, accept ? {
          amount: accept.maxAmountRequired,
          recipient: accept.payTo,
          network: accept.network,
        } : undefined);
      }
      case 404:
        throw new NotFoundError(errorMessage);
      case 400:
        throw new ValidationError(errorMessage);
      default:
        throw new Mongo402Error(errorMessage, 'API_ERROR', response.status);
    }
  }

  // Convenience methods
  async get<T>(path: string, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T> {
    return this.request<T>(path, { ...options, method: 'GET' });
  }

  async post<T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method'>): Promise<T> {
    return this.request<T>(path, { ...options, method: 'POST', body });
  }

  async put<T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method'>): Promise<T> {
    return this.request<T>(path, { ...options, method: 'PUT', body });
  }

  async patch<T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method'>): Promise<T> {
    return this.request<T>(path, { ...options, method: 'PATCH', body });
  }

  async delete<T>(path: string, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T> {
    return this.request<T>(path, { ...options, method: 'DELETE' });
  }
}
