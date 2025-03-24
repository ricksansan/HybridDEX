import '@rainbow-me/rainbowkit/styles.css';
import '../styles/globals.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';

// Gerekli çevre değişkenlerini kontrol et
if (!process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID) {
  throw new Error('Missing NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID');
}

if (!process.env.NEXT_PUBLIC_ALCHEMY_ID) {
  throw new Error('Missing NEXT_PUBLIC_ALCHEMY_ID');
}

const { chains, publicClient } = configureChains(
  [sepolia],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID! }),
    publicProvider()
  ]
);

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '';

const connectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [
      metaMaskWallet({ projectId, chains }),
      coinbaseWallet({ appName: 'HybridDEX', chains }),
      trustWallet({ projectId, chains }),
    ],
  },
  {
    groupName: 'Professional',
    wallets: [
      ledgerWallet({ projectId, chains }),
      walletConnectWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

// React Query client
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          chains={chains}
          theme={darkTheme({
            accentColor: '#4C82FB',
            accentColorForeground: 'white',
            borderRadius: 'large',
            fontStack: 'system',
          })}
          modalSize="wide"
        >
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
} 