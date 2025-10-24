import type { LoginDataType, RegisterDataTypeT } from "@/util/types";
import { url } from "./url";
import { getAccessTokenHelper,  getRefreshTokenHelper, getUserIdHelper } from "@/lib/authHelper";

export const loginFn = async (data: LoginDataType) => {
  const response = await fetch(`${url}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  const json_data = await response.json()
  return json_data
}

export const registerFn = async (data: RegisterDataTypeT) => {
  const response = await fetch(`${url}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  const json_data = await response.json()
  return json_data
}


export const resetPasswordFn = async ({
  id,
  oldPassword,
  newPassword,
}: {
  id: string;
  oldPassword: string;
  newPassword: string;
}) => {
  const token = await getAccessTokenHelper()
  const response = await fetch(`${url}/auth/reset-password/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ oldPassword, newPassword }),
  });

  return await response.json();
};

export const sendCodeMail = async (email: string) => {
  console.log('email', email)
  const token = await getAccessTokenHelper()

  const response = await fetch(`${url}/auth/code`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ 'email': email, reason: 'PASSWORD_RESET' })
  })
  const response_json = await response.json()
  return response_json;
}

export const verifyCodeMail = async (code: string) => {
  const token = await getAccessTokenHelper()
  const response = await fetch(`${url}/auth/code/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ code })
  })
  const response_json = await response.json()
  return response_json;
}

export const setupTotp = async () => {
  const token = await getAccessTokenHelper()
  const fullUrl = `${url}/2fa/setup`
  console.log('full url', fullUrl)
  const response = await fetch(fullUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
  const data_json = response.json()
  return data_json
}


export const verifyTotpMail = async (code: string) => {
  const token = await getAccessTokenHelper()

  const response = await fetch(`${url}/2fa/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ totp: code })
  })
  const response_json = await response.json()
  return response_json;
}


export const disableTotp = async () => {
  const token = await getAccessTokenHelper()
  const fullUrl = `${url}/2fa/disable`
  const response = await fetch(fullUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
  const data_json = response.json()
  return data_json
}

// get access new token
export const newAccessToken = async (): Promise<string | null> => {
  try {
    const refresh = getRefreshTokenHelper();

    if (!refresh) {
      console.error('No refresh token available');
      return null;
    }

    const userId = getUserIdHelper();
    if (!userId) {
      console.error('No user ID available');
      return null;
    }

    const fullUrl = `${url}/auth/refresh/${userId}`;
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${refresh}`
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('data from token',data)

    if (!data?.data) {
      throw new Error('No access token in response');
    }

    return data.data as string;

  } catch (error) {
    console.error('Failed to refresh access token:', error);
    return null;
  }
};