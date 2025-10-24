import { getAccessTokenHelper } from "@/lib/authHelper";
import { url } from "./url";

export const createPayment = async ({ amount }: { amount: string;}) => {
  const token = await getAccessTokenHelper();
  const full_url = `${url}/transactions/create`;

  const response = await fetch(full_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ amount })
  });

  if (!response.ok) {
    throw new Error('Failed to create payment');
  }

  return response.json();
}

export const verifyPayment = async (reference: string) => {
  const token = await getAccessTokenHelper();
  const full_url = `${url}/transactions/verify/${reference}`;

  const response = await fetch(full_url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  if (!response.ok) {
    throw new Error('Failed to verify payment');
  }

  return response.json();
}