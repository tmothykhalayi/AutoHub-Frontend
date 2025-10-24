import { getAccessTokenHelper } from "@/lib/authHelper"
import { url } from "./url"

export const getConstituenciesByCounty = async (county: string) => {
  if (!county) {
    throw new Error('County is required to fetch constituencies')
  }

  const fullUrl = `${url}/constituency?county=${encodeURIComponent(county)}`

  try {
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`)
    }

    const contentType = response.headers.get('Content-Type')
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json()
      console.log('data api', data)
      return data
    } else {
      console.warn('Empty or invalid JSON response')
      return null
    }
  } catch (error) {
    console.error('Error fetching constituencies:', error)
    throw error
  }
}


export const createConstituencies = async (payload: {
  county_id: string;
  constituencies: string[];
}) => {
  const fullUrl = `${url}/constituency`
    const token = await getAccessTokenHelper()
  const response = await fetch(fullUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Bearer ${token}`
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to create constituencies');
  }

  return await response.json();
};