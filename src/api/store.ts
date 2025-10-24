import { getAccessTokenHelper } from "@/lib/authHelper"
import { url } from "./url"

export const createStore = async (store: any) => {
  const token =await getAccessTokenHelper()
  const response = await fetch(`${url}/stores`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(store)
  })
  const data = response.json()
  return data
}

export const getStore = async (id: string) => {
  const token =await getAccessTokenHelper()
  const response = await fetch(`${url}/stores/${id}/applied`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },

  })
  const data =await response.json()
  return data
}

export const getStoreOrders = async (id: string) => {
  const token = await getAccessTokenHelper()
  const response = await fetch(`${url}/stores/${id}/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },

  })
  const data =await response.json()
  return data
}

export const getAdminStore = async () => {
  const token =await getAccessTokenHelper()
  const response = await fetch(`${url}/stores/admin`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },

  })
  const data = response.json()
  return data
}

export const updateStore = async (updateData: any) => {
  const token =await getAccessTokenHelper()
  const response = await fetch(`${url}/stores/${updateData.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(updateData)

  })
  const data = response.json()
  return data
}

export const getStoreById = async (id: string) => {
  const token = await getAccessTokenHelper()
  const response = await fetch(`${url}/stores/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },

  })
  const data =await response.json()
  return data
}