import { getAccessTokenHelper } from "@/lib/authHelper"
import { url } from "./url"

export const getOrderbyCustomerId = async (id:string) => {
  const token = await getAccessTokenHelper()
  const response = await fetch(`${url}/customers/${id}/orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    const json_data = await response.json()
    return json_data
}

export const getCustomerDashboardStat = async (id:string) => {
  const token = await getAccessTokenHelper()
  const response = await fetch(`${url}/customers/${id}/dashboard`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    const json_data = await response.json()
    return json_data
}



export const getCustomerOrderId = async (orderId:string) => {
  const token = await getAccessTokenHelper()
  const response = await fetch(`${url}/customers/orders/${orderId}/details`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    const json_data = await response.json()
    return json_data
}