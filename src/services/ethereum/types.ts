import type { Chain } from '@/types/web3.ts';
import { ZKsyncPlugin } from 'web3-plugin-zksync';

export type EthereumContextValue = {
  account: { isConnected: true; address: string } | { isConnected: false; address: null };
  network: Chain | null;
  switchNetwork: (chainId: string) => Promise<void>;
  connect: () => void;
  disconnect: () => void;
  getZKsync: () => ZKsyncPlugin | null;
  getProvider: () => typeof window.ethereum | undefined;
};

export type Account =
  | { isConnected: true; address: string }
  | { isConnected: false; address: null };

export type Network = Chain | null;
