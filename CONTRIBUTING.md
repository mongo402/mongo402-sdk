# Contributing to mongo402 SDK

Thank you for your interest in contributing to the mongo402 SDK!

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/mongo402/mongo402-sdk.git
   cd mongo402-sdk
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run tests:
   ```bash
   npm test
   ```

4. Build the project:
   ```bash
   npm run build
   ```

## Code Style

- We use TypeScript for all source code
- ESLint and Prettier are configured for code formatting
- Run `npm run lint` to check for issues

## Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass (`npm test`)
6. Commit your changes (`git commit -m 'feat: add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `test:` - Test additions or changes
- `chore:` - Maintenance tasks
- `refactor:` - Code refactoring

## Questions?

Feel free to open an issue for any questions or concerns.
