interface Window {
  solana?: {
    isPhantom?: boolean
    isConnected?: boolean
    connect: () => Promise<void>
    request: (params: any) => Promise<any>
  }
}
