/**
 * Centralized API Client
 * Handles authentication, error handling, and type-safe responses
 */

import { auth } from './firebase';

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

export interface ApiResult<T> {
  data: T | null;
  error: ApiError | null;
}

async function getAuthToken(): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) return null;
  try {
    return await user.getIdToken();
  } catch {
    return null;
  }
}

async function handleResponse<T>(response: Response): Promise<ApiResult<T>> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    return {
      data: null,
      error: {
        message: errorData.error || errorData.message || 'Request failed',
        status: response.status,
        code: errorData.code,
      },
    };
  }

  const data = await response.json();
  return {
    data: data.data || data,
    error: null,
  };
}

/**
 * Make an authenticated API request
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResult<T>> {
  try {
    const token = await getAuthToken();
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    };

    if (token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(endpoint, {
      ...options,
      headers,
    });

    return handleResponse<T>(response);
  } catch (error) {
    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : 'Network error',
        status: 0,
      },
    };
  }
}

/**
 * Convenience methods
 */
export const api = {
  get: <T>(endpoint: string) => apiRequest<T>(endpoint, { method: 'GET' }),
  
  post: <T>(endpoint: string, body: unknown) =>
    apiRequest<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  
  put: <T>(endpoint: string, body: unknown) =>
    apiRequest<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),
  
  delete: <T>(endpoint: string) =>
    apiRequest<T>(endpoint, { method: 'DELETE' }),
};

// Type-safe endpoints
export const endpoints = {
  // Admin
  leads: '/api/admin/leads',
  clients: '/api/admin/clients',
  shoots: '/api/admin/shoots',
  invoices: '/api/admin/invoices',
  knowledge: '/api/admin/knowledge',
  
  // Public
  booking: '/api/booking',
  publicCheckout: '/api/public-checkout',
  assistant: '/api/assistant',
};
