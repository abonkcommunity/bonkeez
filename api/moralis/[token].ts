// api/moralis/[token].ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import Moralis from 'moralis';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const tokenAddress = req.query.token;
    if (!tokenAddress || typeof tokenAddress !== 'string') {
      return res.status(400).json({ error: 'Missing token address' });
    }

    // Start Moralis once
    if (!Moralis.Core.isStarted) {
      await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
    }

    const response = await Moralis.SolApi.token.getTokenPrice({
      network: "mainnet",
      address: tokenAddress,
    });

    return res.status(200).json({
    price: response.usdPrice ? `$${response.usdPrice.toFixed(6)}` : '$0.000001',
      marketCap: 'N/A',
      volume24h: 'N/A',
      holders: 'N/A',
      totalSupply: 'N/A',
      change24h: 0,
    });
  } catch (err: any) {
    console.error('Moralis error:', err);
    return res.status(500).json({
      error: 'Internal Server Error',
      details: err.message || String(err),
    });
  }
}
