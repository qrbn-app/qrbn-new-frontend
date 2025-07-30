# Web3 Integration Setup

## Overview

This project integrates with Xellar Kit for Web3 wallet functionality, providing seamless wallet connection and blockchain interaction capabilities.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# WalletConnect Project ID (get from https://cloud.walletconnect.com)
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id_here

# Xellar App ID
NEXT_PUBLIC_XELLAR_APP_ID=fa0c9416-cbee-4ebc-bda7-03d146734f77

# Xellar Environment (sandbox or production)
NEXT_PUBLIC_XELLAR_ENV=sandbox
```

## Getting WalletConnect Project ID

1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com)
2. Create a new project
3. Copy the Project ID and add it to your `.env.local` file

## Features

- **Wallet Connection**: Connect/disconnect wallet functionality
- **Multi-chain Support**: Currently configured for Polygon Amoy testnet
- **Balance Display**: Shows native token balance
- **Address Management**: Copy wallet address functionality
- **Dark Theme**: Integrated with Xellar Kit's dark theme

## Components

### Web3Provider (`components/providers/web3-provider.tsx`)
- Wraps the app with Wagmi, React Query, and Xellar Kit providers
- Configures blockchain networks and wallet connections
- Provides the Web3 context to all child components

### WalletConnect (`components/wallet-connect.tsx`)
- UI component for wallet connection/disconnection
- Displays wallet address, network, and balance
- Handles wallet state management

## Usage

The Web3Provider is already integrated into the root layout, so all components can access Web3 functionality using Wagmi hooks:

```tsx
import { useAccount, useBalance, useConnect, useDisconnect } from 'wagmi'

function MyComponent() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  
  // Component logic here
}
```

## Networks

Currently configured for:
- **Polygon Amoy Testnet** (for development/testing)

To add more networks, update the `chains` array in `web3-provider.tsx`:

```tsx
import { polygon, mainnet } from "viem/chains";

const config = defaultConfig({
  // ... other config
  chains: [polygonAmoy, polygon, mainnet],
});
```
