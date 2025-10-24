import { getAccessTokenHelper } from "@/lib/authHelper"
import { url } from "./url"

export const getVendorDashboard = async (id: string) => {
  const token = await getAccessTokenHelper()
  const fullUrl = `${url}/stores/${id}/dashboard`
  console.log('full url', fullUrl)
  const response = await fetch(fullUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })

  const data = await response.json()
  return data
}
