"use client";

import type { ReactNode } from "react";

import { MetaMaskProvider } from "@/hooks/metamask/useMetaMaskProvider";
import { InMemoryStorageProvider } from "@/hooks/useInMemoryStorage";
import { MetaMaskEthersSignerProvider } from "@/hooks/metamask/useMetaMaskEthersSigner";

import { RPC_URL } from "@/constants";
import { FheProvider } from "@/config/FheRelayey";

type Props = {
  children: ReactNode;
};

export function Providers({ children }: Props) {
  return (
    <MetaMaskProvider>
      <MetaMaskEthersSignerProvider initialMockChains={{11155111: RPC_URL}}>
        <InMemoryStorageProvider><FheProvider>{children}</FheProvider></InMemoryStorageProvider>
      </MetaMaskEthersSignerProvider>
    </MetaMaskProvider>
  );
}
