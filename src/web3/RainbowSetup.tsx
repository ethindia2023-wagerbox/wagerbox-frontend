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
    optimism,
    arbitrum,
    base,
    zora,
    polygonMumbai
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const ALCHEMY_KEY = import.meta.env.VITE_ALCHEMY_KEY;

const sepolia: Chain = {
    id: 43_114,
    name: 'Sepolia',
    network: 'sepolia',
    iconUrl: 'https://assets-global.website-files.com/5f973c970bea5548ad4287ef/61e70d05f3c7146ab79e66bb_ethereum-eth.svg',
    iconBackground: '#fff',
    nativeCurrency: {
      decimals: 18,
      name: 'Sepolia',
      symbol: 'SepoliaETH',
    },
    rpcUrls: {
      public: { http: ['https://eth-sepolia.g.alchemy.com/v2/EYz4orWLK-ILJo4YVgrYkzyhWzdgNb2H'] },
      default: { http: ['https://eth-sepolia.g.alchemy.com/v2/EYz4orWLK-ILJo4YVgrYkzyhWzdgNb2H'] },
    },
    blockExplorers: {
      default: { name: 'SepoliaScan', url: 'https://sepolia.etherscan.io/' },
      etherscan: { name: 'SepoliaScan', url: 'https://sepolia.etherscan.io/' },
    },
    testnet: true,
  };

const { chains, publicClient } = configureChains(
    [mainnet, polygon, optimism, arbitrum, base, zora, sepolia, polygonMumbai],
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