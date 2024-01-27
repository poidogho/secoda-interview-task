import type { NextApiRequest, NextApiResponse } from 'next';

const API_BASE_URL = 'https://pro-api.coinmarketcap.com';
const API_KEY = process.env.NEXT_API_KEY ?? '44d70180-fe03-41dc-a6e2-b78d07438ef0';

const headers = {
  'X-CMC_PRO_API_KEY': API_KEY,
  'Accept': 'application/json',
};


const fetchMetaData = async (id: number) => {
  const response = await fetch(
    `${API_BASE_URL}/v2/cryptocurrency/info?id=${id}`,
    {
      headers,
    }
  );
  return response.json()
}

/**
 * Fetches the latest cryptocurrency listings and enhances each listing with additional metadata,
 * such as the cryptocurrency's logo. Data is fetched from a base API and then each listing's metadata
 * is fetched individually. The results are then combined and returned.
 * 
 * @param {NextApiRequest} req - The API request object, including the URL from which query parameters are extracted.
 * @returns {Promise<any>} A promise that resolves to the enhanced cryptocurrency listings or an error message.
 * 
 * @example
 * // Call within an async context:
 * const result = await GET(req);
 */
export async function GET(req: NextApiRequest) {
  const urlParams = new URL(req.url as string);
  const limit = urlParams.searchParams.get('limit') || '10';
  const start = urlParams.searchParams.get('start') || '1';

  try {
    const response = await fetch(
      `${API_BASE_URL}/v1/cryptocurrency/listings/latest?limit=${limit}&start=${start}`,
      {
        headers,
      }
    );
    const hmap = new Map<number, any>()
    const cryptocurrencies = await response.json();

    cryptocurrencies.data.forEach((cryptocurrency: any) => {
      const { id } = cryptocurrency
      hmap.set(id, cryptocurrency)
    })

    const ids = Array.from(hmap.keys())
    const modifiedData = ids.map(async (id: number) => {
      const { data } = await fetchMetaData(id)
      const crypto = hmap.get(id)
      const { logo } = data[id]
      return { logo, ...crypto }
    })

    return Response.json({
      ...cryptocurrencies,
      data: await Promise.all(modifiedData)
    });
  } catch (error: any) {
    return Response.json(error.message);
  }
}
