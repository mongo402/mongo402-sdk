# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-15

### Added
- Initial release of @mongo402/sdk
- BuyerClient for data consumers
  - Browse public endpoints
  - Query free endpoints
  - Execute paid queries with x402 protocol
  - Wallet authentication support
- SellerClient for data providers
  - Create and manage endpoints
  - Track revenue and payments
  - Update pricing and metadata
- x402 Protocol support
  - Payment header builder
  - 402 response parser
  - USDC payment verification
- Utility functions
  - Query builder with fluent API
  - Validation utilities
  - Formatting helpers
- Full TypeScript support with type definitions
- Comprehensive documentation and examples
- GitHub Actions CI/CD workflows

### Networks
- Solana Devnet support
- Solana Mainnet-beta support

### Dependencies
- Peer dependency on @solana/web3.js ^1.87.0
