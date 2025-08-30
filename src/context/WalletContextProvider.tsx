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

  // Use a more reliable RPC endpoint
  const network = useMemo(() => {
    try {
      // Try environment variable first, fallback to reliable public RPC
      const customRpc = import.meta.env.VITE_SOLANA_RPC_URL;
      if (customRpc) {
        console.log("🌐 Using custom RPC:", customRpc);
        return customRpc;
      }

      // Use a more reliable devnet RPC
      const devnetRpc = "https://api.devnet.solana.com";
      console.log("🌐 Using devnet RPC:", devnetRpc);
      return devnetRpc;

      // Fallback to clusterApiUrl if needed
      // return clusterApiUrl("devnet")
    } catch (error) {
      console.error("❌ Network setup error:", error);
      // Last resort fallback
      return "https://api.devnet.solana.com";
    }
  }, []);

  const wallets = useMemo(() => {
    try {
      console.log("👛 Setting up wallet adapters…");
      const walletList = [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter(),
        new BackpackWalletAdapter(),
      ];
      console.log("✅ Wallet adapters created successfully");
      return walletList;
    } catch (error) {
      console.error("❌ Wallet adapter error:", error);
      return [];
    }
  }, []);

  try {
    console.log("🎯 Rendering wallet providers…");
    return (
      <ConnectionProvider endpoint={network}>
        <WalletProvider wallets={wallets} autoConnect={false}>
          <WalletModalProvider>{children}</WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    );
  } catch (error) {
    console.error("💥 WalletContextProvider render error:", error);
    return <div>Wallet initialization error. Check console.</div>;
  }
};