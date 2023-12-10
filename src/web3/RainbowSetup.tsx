import '@rainbow-me/rainbowkit/styles.css';

import {
    Chain,
    getDefaultWallets,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
    mainnet,
    polygon,
    arbitrum,
    base,
    polygonMumbai,
    sepolia,
    scrollTestnet,
    polygonZkEvmTestnet
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const ALCHEMY_KEY = import.meta.env.VITE_ALCHEMY_KEY;

const { chains, publicClient } = configureChains(
    [
      mainnet, polygon,
      arbitrum, base,
      sepolia, polygonMumbai,
      scrollTestnet,
      polygonZkEvmTestnet
    ],
    [
        alchemyProvider({ apiKey: ALCHEMY_KEY }),
        publicProvider()
    ]
);

const { connectors } = getDefaultWallets({
    appName: 'EthIndia2023',
    projectId: import.meta.env.VITE_WALLETCONNECT_KEY,
    chains
});

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
});

const RainbowSetup = ({ children }: any) => {
    return (
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            {children}
          </RainbowKitProvider>
        </WagmiConfig>
      );
};

export default RainbowSetup;