import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { token } = req.query

  try {
    const response = await fetch(`https://frontend-api.pump.fun/coins/${token}`)
    if (!response.ok) {
      throw new Error(`Pump.fun API error: ${response.statusText}`)
    }

    const data = await response.json()
    res.status(200).json(data)
  } catch (error: any) {
    console.error('Error fetching token data:', error)
    res.status(500).json({ error: 'Failed to fetch token data' })
  }
}