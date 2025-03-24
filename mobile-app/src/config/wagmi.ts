import { NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID } from '@env';
import { createConfig } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

export const wagmiConfig = createConfig({
  chains: [sepolia],
  connectors: [
    new WalletConnectConnector({
      projectId: NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
      options: {
        qrcode: true,
      },
    }),
  ],
}); 