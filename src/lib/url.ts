/**
 * Get the base URL for server-side and client-side requests
 * This handles Vercel deployment automatically
 */
export function getBaseUrl(): string {
  // For server-side rendering on Vercel
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // For client-side or local development
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  
  // Fallback for local development
  return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
}

/**
 * Fetch wrapper that automatically uses the correct base URL
 */
export async function fetchApi(endpoint: string, options?: RequestInit) {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
}
