/**
 * Get the base URL for server-side and client-side requests
 * This handles Vercel deployment automatically
 */
export function getBaseUrl(): string {
  // For server-side rendering on Vercel
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // Check for custom domain in Vercel
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  
  // For client-side
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  
  // Production fallback - use your actual domain
  if (process.env.NODE_ENV === 'production') {
    return 'https://srilankahow.vercel.app';
  }
  
  // Fallback for local development
  return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
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
