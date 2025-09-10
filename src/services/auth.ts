/**
 * Authentication service for wallet-based auth
 */

import { HttpClient } from '../core/http';
import { API_ENDPOINTS } from '../core/constants';
import type {
  WalletNonceResponse,
  WalletAuthRequest,
  AuthResponse,
  User,
} from '../types';

export class AuthService {
  constructor(private http: HttpClient) {}

  /**
   * Get a nonce message for wallet signing
   * The client should sign this message with their Phantom wallet
   */
  async getNonce(): Promise<WalletNonceResponse> {
    return this.http.get<WalletNonceResponse>(API_ENDPOINTS.AUTH_NONCE);
  }

  /**
   * Authenticate with a signed wallet message
   * @param walletAddress - Base58 Solana wallet address
   * @param signature - Base64 encoded signature
   * @param message - The signed message (from getNonce)
   */
  async authenticateWallet(
    walletAddress: string,
    signature: string,
    message: string
  ): Promise<AuthResponse> {
    const request: WalletAuthRequest = {
      wallet_address: walletAddress,
      signature,
      message,
    };

    const response = await this.http.post<AuthResponse>(
      API_ENDPOINTS.AUTH_WALLET,
      request
    );

    // Store the token for subsequent requests
    this.http.setAccessToken(response.access_token);

    return response;
  }

  /**
   * Get current authenticated user info
   */
  async getCurrentUser(): Promise<User> {
    return this.http.get<User>(API_ENDPOINTS.AUTH_ME);
  }

  /**
   * Update user's display name
   */
  async updateName(name: string): Promise<{ message: string; name: string }> {
    return this.http.put<{ message: string; name: string }>(
      `${API_ENDPOINTS.AUTH_UPDATE_NAME}?name=${encodeURIComponent(name)}`
    );
  }

  /**
   * Set access token manually (e.g., from stored session)
   */
  setAccessToken(token: string): void {
    this.http.setAccessToken(token);
  }

  /**
   * Clear access token (logout)
   */
  clearAccessToken(): void {
    this.http.setAccessToken(undefined);
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.http.getAccessToken();
  }
}
