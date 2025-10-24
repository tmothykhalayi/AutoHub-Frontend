import { url } from "./url"

export const getCounties = async () => {
  const fullUrl = `${url}/county`
  console.log('full url', fullUrl)
  const response = await fetch(fullUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data_json = response.json()
  return data_json
}