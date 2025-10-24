import { getAccessTokenHelper } from "@/lib/authHelper";
import { url } from "./url";
import type { ProductForm } from "@/util/types";

export const createProductFn = async (data: ProductForm) => {
  const token =await getAccessTokenHelper()

  const response = await fetch(`${url}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  const json_data = await response.json();
  console.log(json_data)
  return json_data;
}

export const getProductFn = async (category?: string) => {
  let fullUrl = `${url}/products`;
  
  if (category) {
    fullUrl += `?category=${encodeURIComponent(category)}`;
  }

  const response = await fetch(fullUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data_response = await response.json();
  return data_response;
}

export const updateProductFn = async (id: string, data:any) => {
  console.log('Updating product with ID:', id, 'and data:', data);
  const token = await getAccessTokenHelper();

  const response = await fetch(`${url}/products/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  
  const json_data = await response.json();
  console.log('data response',json_data);
  return json_data;
}