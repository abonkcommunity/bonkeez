import type { VercelRequest, VercelResponse } from '@vercel/node'
import fetch from 'node-fetch'   // 👈 add this

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { ca } = req.query

  if (!ca || typeof ca !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid contract address' })
  }

  try {
    const response = await fetch(`https://frontend-api.pump.fun/coins/${ca}`)
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch token data' })
    }

    const data = await response.json()
    return res.status(200).json(data)
  } catch (error) {
    console.error('Pumpfun API Error:', error)
    return res.status(500).json({ error: 'Internal Server Error', details: String(error) })
  }
}