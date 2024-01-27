// app/crypto.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("api called", req)
  const { limit, offset } = req.query;
  try {
    const response = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=${limit}`, {
        method: 'GET',
        headers: {
        'X-CMC_PRO_API_KEY': '44d70180-fe03-41dc-a6e2-b78d07438ef0',
        'Accept': 'application/json',
        }
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
}
