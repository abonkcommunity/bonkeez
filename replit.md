# Bonkeez Exchange

## Overview

Bonkeez Exchange is a pre-launch Solana-based NFT marketplace specifically designed for trading Bonkeez NFT collection with native $BNKZ token integration. The platform combines traditional NFT marketplace functionality with token trading capabilities, featuring a colorful UI themed around the Bonkeez characters (Bloo, Yelloo, Redz, Pinko, Greeno). The application is built as a modern React SPA with full-stack capabilities including Express.js backend services and Solana wallet integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development patterns
- **Styling**: Tailwind CSS with custom animations and gradient themes matching the Bonkeez brand
- **Build Tool**: Vite for fast development and optimized production builds
- **State Management**: React hooks and context patterns for wallet and user state
- **UI Components**: Custom component library with reusable marketplace, trading, and profile components

### Backend Architecture  
- **Server**: Express.js Node.js server running on port 3001 for API proxy services
- **API Proxy**: Custom proxy layer for external API calls to avoid CORS issues
- **Concurrent Development**: Uses concurrently to run both frontend and backend in development
- **Production Deployment**: Configured for Vercel with serverless functions

### Wallet Integration
- **Solana Wallet Adapter**: Full integration with multiple wallet providers (Phantom, Solflare, Backpack)
- **Wallet Context**: React context provider managing wallet connection state across the app
- **Security**: HTTPS enforcement and secure context validation for production environments

### Token and NFT Infrastructure
- **Solana Integration**: Web3.js and SPL Token libraries for blockchain interactions
- **Metaplex Integration**: NFT metadata fetching and management using Metaplex SDK
- **Token Contract**: $BNKZ token integration with contract address Gr1PWUXKBvEWN3d67d3FxvBmawjCtA5HWqfnJxSgDz1F
- **Profile System**: User profile generation with NFT portfolio and token balance tracking

### Build Configuration
- **Node Polyfills**: Extensive polyfill configuration for browser compatibility with Solana libraries
- **TypeScript**: Comprehensive type definitions with relaxed linting for rapid development
- **CSS Processing**: PostCSS with Tailwind for responsive design and custom animations

## External Dependencies

### Blockchain Services
- **Solana RPC**: Mainnet connection for live blockchain data and transaction processing
- **Pump.fun API**: Real-time token data including price, volume, and holder statistics
- **Solscan**: Blockchain explorer integration for transaction and token verification

### Database and Storage
- **Supabase**: PostgreSQL database for user signups, profiles, and marketplace data with real-time subscriptions
- **Launch Signups**: Pre-launch email collection system for user notifications

### Third-Party APIs
- **Pumpfun Token Data**: External API for $BNKZ token metrics and trading statistics
- **Social Media**: Twitter and Telegram integration for community links

### Development and Deployment
- **Vercel**: Primary hosting platform with serverless function support
- **GitHub**: Version control and CI/CD pipeline integration
- **Environment Variables**: Secure configuration management for API keys and endpoints

### UI and UX Libraries
- **Lucide React**: Icon library for consistent UI elements
- **React Icons**: Additional icon set for social media and branding
- **Recharts**: Data visualization for token price charts and statistics
- **Wallet Adapter UI**: Pre-built wallet connection components and modals