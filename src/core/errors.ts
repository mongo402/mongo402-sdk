/**
 * Custom error classes for mongo402 SDK
 */

export class Mongo402Error extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly statusCode?: number
  ) {
    super(message);
    this.name = 'Mongo402Error';
  }
}

export class AuthenticationError extends Mongo402Error {
  constructor(message: string = 'Authentication failed. Please ensure you have a valid access token.') {
    super(message, 'AUTH_ERROR', 401);
    this.name = 'AuthenticationError';
  }
}

export class PaymentRequiredError extends Mongo402Error {
  constructor(
    message: string = 'Payment required',
    public readonly paymentInfo?: {
      amount: string;
      recipient: string;
      network: string;
    }
  ) {
    super(message, 'PAYMENT_REQUIRED', 402);
    this.name = 'PaymentRequiredError';
  }
}

export class NotFoundError extends Mongo402Error {
  constructor(message: string = 'The requested endpoint or resource was not found.') {
    super(message, 'NOT_FOUND', 404);
    this.name = 'NotFoundError';
  }
}

export class ValidationError extends Mongo402Error {
  constructor(message: string = 'Validation failed') {
    super(message, 'VALIDATION_ERROR', 400);
    this.name = 'ValidationError';
  }
}

export class NetworkError extends Mongo402Error {
  constructor(message: string = 'Network request failed') {
    super(message, 'NETWORK_ERROR');
    this.name = 'NetworkError';
  }
}
