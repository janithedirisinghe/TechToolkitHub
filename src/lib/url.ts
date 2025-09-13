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
  
  // For server-side rendering on Vercel
  if (process.env.VERCEL_URL) {
    const url = `https://${process.env.VERCEL_URL}`;
    console.log('[DEBUG] Using VERCEL_URL:', url);
    return url;
  }
  
  // Check for custom domain in Vercel
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    const url = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    console.log('[DEBUG] Using VERCEL_PROJECT_PRODUCTION_URL:', url);
    return url;
  }
  
  // For client-side
  if (typeof window !== 'undefined') {
    console.log('[DEBUG] Using window.location.origin:', window.location.origin);
    return window.location.origin;
  }
  
  // Production fallback - use your actual domain
  if (process.env.NODE_ENV === 'production') {
    const url = 'https://srilankahow.vercel.app';
    console.log('[DEBUG] Using production fallback:', url);
    return url;
  }
  
  // Fallback for local development
  const fallback = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  console.log('[DEBUG] Using development fallback:', fallback);
  return fallback;
}

/**
 * Fetch wrapper that automatically uses the correct base URL
 */
export async function fetchApi(endpoint: string, options?: RequestInit) {
  let url: string;
  
  // For server-side rendering, use relative URLs when possible
  if (typeof window === 'undefined') {
    // Server-side: try relative URL first
    url = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    
    // If that doesn't work, fall back to full URL
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });
      
      if (response.ok) {
        return response;
      }
    } catch (error) {
      console.warn('Relative URL failed, trying absolute URL:', error);
    }
    
    // Fallback to absolute URL
    const baseUrl = getBaseUrl();
    url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  } else {
    // Client-side: use relative URLs
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
