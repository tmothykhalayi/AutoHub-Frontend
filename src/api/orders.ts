import { getAccessTokenHelper } from "@/lib/authHelper"
import { url } from "./url"
import type { OrderStatus } from "@/routes/dashboard/orders/current"

// For query parameters if needed
function buildOrderQueryParams(params: Record<string, any>): string {
  const query = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      query.append(key, String(value))
    }
  }
  return query.toString()
}

// Get all orders (with optional filters)
export const getOrdersFn = async (params: Record<string, any> = {}) => {
  const token = await getAccessTokenHelper()
  const queryString = buildOrderQueryParams(params)
  const fullUrl = `${url}/orders${queryString ? `?${queryString}` : ''}`

  const response = await fetch(fullUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })

  return await response.json()
}

// Get order by ID
export const getOrderByIdFn = async (id: string, params: Record<string, any> = {}) => {
  const token = await getAccessTokenHelper()
  const queryString = buildOrderQueryParams(params)
  const fullUrl = `${url}/orders/${id}${queryString ? `?${queryString}` : ''}`

  const response = await fetch(fullUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })

  return await response.json()
}

// Create new order
export const createOrderFn = async (data: any) => {
  const token = await getAccessTokenHelper()
  const fullUrl = `${url}/orders`

  const response = await fetch(fullUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data),
  })

  return await response.json()
}

// Update order
export const updateOrderFn = async (data: any) => {
  const token = await getAccessTokenHelper()
  const fullUrl = `${url}/orders/${data.id}`

  const response = await fetch(fullUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data),
  })

  return await response.json()
}

// Delete order
export const deleteOrderFn = async (id: string) => {
  const token = await getAccessTokenHelper()
  const fullUrl = `${url}/orders/${id}`

  const response = await fetch(fullUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })

  return await response.json()
}

// Get orders by user ID
export const getOrdersByUserIdFn = async (userId: string, params: Record<string, any> = {}) => {
  const token = await getAccessTokenHelper()
  const queryString = buildOrderQueryParams(params)
  const fullUrl = `${url}/users/${userId}/orders${queryString ? `?${queryString}` : ''}`

  const response = await fetch(fullUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })

  return await response.json()
}

export const updateOrderItemFn = async (id: string,
  { itemStatus }: { itemStatus: OrderStatus }) => {
  const token = await getAccessTokenHelper();
  const fullUrl = `${url}/orders/items/${id}`;
  const response = await fetch(fullUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ itemStatus })
  });

  return await response.json();
}