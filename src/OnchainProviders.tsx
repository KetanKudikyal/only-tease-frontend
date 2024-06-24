'use client';

import { OnchainKitProvider } from '@coinbase/onchainkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { baseSepolia } from 'viem/chains';
import { WagmiProvider } from 'wagmi';

import { createWagmiConfig } from '@/store/createWagmiConfig';

type Props = { children: ReactNode };

const queryClient = new QueryClient();

const rpcUrl = '/api/rpc';

const wagmiConfig = createWagmiConfig(rpcUrl);

function OnchainProviders({ children }: Props) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {/* <OnchainKitProvider chain={baseSepolia}> */}
        <SessionProvider>
          {children}
        </SessionProvider>
        {/* </OnchainKitProvider> */}
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default OnchainProviders;