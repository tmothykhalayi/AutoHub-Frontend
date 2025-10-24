import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// utils/timeFormatter.ts
export const formatTime = (timeString: string, is24Hour: boolean) => {
  const [hours, minutes] = timeString.split(':');
  const hourNum = parseInt(hours, 10);

  if (is24Hour) {
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  } else {
    const period = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum % 12 || 12; // Convert 0 to 12 for 12-hour format
    return `${displayHour}:${minutes.padStart(2, '0')} ${period}`;
  }
};


import { jwtDecode } from "jwt-decode";
import { getRefreshToken, logoutUserHelper,  updateAccessTokenHelper } from "./authHelper";
import { newAccessToken } from "@/api/auth";


interface JwtPayload {
  exp?: number; // Expiration time (Unix timestamp)
  iat?: number; // Issued at (Unix timestamp)
  nbf?: number; // Not Before (Unix timestamp)
}

export function isTokenExpired(
  token: string,
  options: {
    leewaySeconds?: number; // Grace period (default: 0)
    defaultExpirationSeconds?: number; // Fallback if no `exp` (default: 3600)
  } = {}
): boolean {
  const { leewaySeconds = 0, defaultExpirationSeconds = 3600 } = options;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const now = Date.now() / 1000; // Current time in seconds


    // 2. Check `exp` (Expiration Time)
    if (decoded.exp) {
      return decoded.exp + leewaySeconds <= now;
    }

    // 3. Fallback to `iat` + default expiration
    if (decoded.iat) {
      return decoded.iat + defaultExpirationSeconds + leewaySeconds <= now;
    }

    // 4. If no `exp` or `iat`, assume expired (or adjust logic as needed)
    return true;

  } catch (error) {
    console.error("Token decode error:", error);
    return true; // Invalid token = treat as expired
  }
}
export const handleTokenRefresh = async (): Promise<string> => {
  try {
    // 1. Check if refresh token exists
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      logoutUserHelper();
      return '';
    }
    
    // 2. Attempt to get new access token
    const newToken = await newAccessToken();
    if (!newToken) {
      logoutUserHelper();
      return '';
    }
    
    // 3. Store and return the new token
    updateAccessTokenHelper(newToken)

    return newToken;

  } catch (error) {
    console.error("Token refresh failed:", error);
    logoutUserHelper();
    return '';
  }
};



// lib/utils.ts

/**
 * Formats a date string or Date object into a readable format
 * @param dateInput - Date string or Date object
 * @param options - Optional formatting configuration
 * @returns Formatted date string
 */
export const formatDate = (
  dateInput: string | Date,
  options?: {
    includeTime?: boolean
    timeOnly?: boolean
    shortMonth?: boolean
    weekday?: boolean
    timeFormat?: '12' | '24'
  }
): string => {
  const date = new Date(dateInput)
  
  // Return empty string if invalid date
  if (isNaN(date.getTime())) return ''

  const {
    includeTime = true,
    timeOnly = false,
    shortMonth = false,
    weekday = false,
    timeFormat = '12'
  } = options || {}

  // Time formatting
  let hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = timeFormat === '12' ? hours >= 12 ? 'PM' : 'AM' : ''
  
  if (timeFormat === '12') {
    hours = hours % 12
    hours = hours ? hours : 12 // the hour '0' should be '12'
  }

  const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}${ampm ? ` ${ampm}` : ''}`

  if (timeOnly) return formattedTime

  // Date formatting
  const weekdayStr = weekday 
    ? date.toLocaleString('en-US', { weekday: 'short' }) + ', '
    : ''
  
  const month = shortMonth
    ? date.toLocaleString('en-US', { month: 'short' })
    : date.toLocaleString('en-US', { month: 'long' })

  const day = date.getDate()
  const year = date.getFullYear()

  const formattedDate = `${weekdayStr}${month} ${day}, ${year}`

  return includeTime 
    ? `${formattedDate} at ${formattedTime}`
    : formattedDate
}

// Alternative simple version if you don't need customization:
export const simpleFormatDate = (dateInput: string | Date): string => {
  const date = new Date(dateInput)
  if (isNaN(date.getTime())) return ''
  
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}