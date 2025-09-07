import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { BackpackWalletAdapter } from "@solana/wallet-adapter-backpack";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";

export const WalletContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  console.log("🔗 WalletContextProvider initializing…");

  // Mainnet RPC only (no devnet fallback)
  const network = useMemo(() => {
    const customRpc = import.meta.env.VITE_SOLANA_RPC_URL;
    if (customRpc) {
      console.log("🌐 Using custom mainnet RPC:", customRpc);
      return customRpc;
    }

    const mainnetRpc = clusterApiUrl("mainnet-beta");
    console.log("🌐 Using default mainnet RPC:", mainnetRpc);
    return mainnetRpc;
  }, []);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new BackpackWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={network}>
      <WalletProvider wallets={wallets} autoConnect={false}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
