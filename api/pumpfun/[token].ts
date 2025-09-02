// api/pumpfun/[token].ts
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { token } = req.query

  if (!token || typeof token !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid contract address' })
  }

  try {
    const response = await fetch(`https://frontend-api.pump.fun/coins/${token}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json'
      }
    })

    if (!response.ok) {
      console.error('Pumpfun API returned status:', response.status)
      return res.status(response.status).json({ error: 'Failed to fetch token data' })
    }

    const data = await response.json()
    return res.status(200).json(data)
  } catch (error) {
    console.error('Pumpfun API Error:', error)
    return res.status(500).json({ error: 'Internal Server Error', details: String(error) })
  }
}
