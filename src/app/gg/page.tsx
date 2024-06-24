// WAGMI Libraries
"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig, http, useAccount, useConnect, useDisconnect } from "wagmi";
import { mainnet, polygon, sepolia } from "wagmi/chains";
import { coinbaseWallet, walletConnect } from "wagmi/connectors";


import Web3AuthConnectorInstance from '@/components/Web3AuthInstance';

const queryClient = new QueryClient()

// Set up client
const config = createConfig({
  chains: [mainnet, sepolia, polygon],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
  },
  connectors: [
    walletConnect({
      projectId: "3314f39613059cb687432d249f1658d2",
      showQrModal: true,
    }),
    coinbaseWallet({ appName: 'wagmi' }),
    Web3AuthConnectorInstance([mainnet, sepolia, polygon]),
  ],
});

function Profile() {
  const { address, connector, isConnected } = useAccount();
  const { connect, connectors, error } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div className="main">
        <div className="title">Connected to {connector?.name}</div>
        <div>{address}</div>
        <button className="card" onClick={disconnect as any}>
          Disconnect
        </button>
        {/* <SendTransaction /> */}
        {/* <Balance /> */}
        {/* <WriteContract /> */}
        {/* <SwitchChain /> */}
      </div>
    );
  } else {
    return (
      <div className="main">
        {connectors.map((connector) => {
          return (
            <button className="card" key={connector.id} onClick={() => connect({ connector })}>
              {connector.name}
            </button>
          );
        })}
        {error && <div>{error.message}</div>}
      </div>
    );
  }
}

// Pass client to React Context Provider
function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div className="container">
          <Profile />
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;