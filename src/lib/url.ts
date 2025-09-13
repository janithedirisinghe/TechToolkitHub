/**
 * Get the base URL for server-side and client-side requests
 * This handles Vercel deployment automatically
 */
export function getBaseUrl(): string {
  console.log('[DEBUG] URL Resolution - Environment check:');
  console.log('[DEBUG] - process.env.VERCEL_URL:', process.env.VERCEL_URL);
  console.log('[DEBUG] - process.env.VERCEL_PROJECT_PRODUCTION_URL:', process.env.VERCEL_PROJECT_PRODUCTION_URL);
  console.log('[DEBUG] - process.env.NODE_ENV:', process.env.NODE_ENV);
  console.log('[DEBUG] - typeof window:', typeof window);
  
  // If running on the server, prefer returning an empty string so that callers can safely
  // prefix relative paths without forcing an absolute host (avoids preview domain 401 issues).
  if (typeof window === 'undefined') {
    // Still log what WOULD have been chosen for debugging.
    if (process.env.VERCEL_URL) {
      console.log('[DEBUG] (Info) VERCEL_URL available but returning empty string for relative server fetches.');
    } else if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
      console.log('[DEBUG] (Info) VERCEL_PROJECT_PRODUCTION_URL available but returning empty string for relative server fetches.');
    }
    return '';
  }

  // Client-side must use absolute origin.
  if (typeof window !== 'undefined') {
    console.log('[DEBUG] Using window.location.origin:', window.location.origin);
    return window.location.origin;
  }

  // Fallback (should rarely execute)
  return '';
}

/**
 * Fetch wrapper that automatically uses the correct base URL
 */
export async function fetchApi(endpoint: string, options?: RequestInit) {
  let url: string;
  
  // For server-side rendering, use relative URLs when possible
  if (typeof window === 'undefined') {
    // Server-side: always attempt relative path (baseUrl may be empty by design for internal calls)
    url = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    try {
      return await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });
    } catch (error) {
      console.warn('[fetchApi] Relative server fetch failed, attempting absolute fallback:', error);
      const baseUrl = getBaseUrl();
      const absolute = `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
      return await fetch(absolute, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });
    }
  } else {
    url = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  }
  
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
}
