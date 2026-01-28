"use client";

import { ReactNode } from "react";
import { WagmiConfig, createClient, configureChains } from "wagmi";
import { avalancheFuji } from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { publicProvider } from "wagmi/providers/public";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Configure chains
const { chains, provider } = configureChains(
  [avalancheFuji],
  [publicProvider()],
);

// Create Wagmi client
const client = createClient({
  autoConnect: true,
  connectors: [new InjectedConnector({ chains })],
  provider,
});

// React Query
const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiConfig client={client}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiConfig>
  );
}
