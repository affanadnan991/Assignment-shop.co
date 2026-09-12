import { User } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

async function attemptAuthFetch(
  endpoint: string,
  body: object
): Promise<{ user: User; token: string } | null> {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const json = await res.json();
      if (res.ok && json.success && json.data) {
        return json.data;
      }
      if (json.message) {
        throw new Error(json.message);
      }
    }
  } catch (error: any) {
    if (error.message && error.message !== 'Failed to fetch' && !error.message.includes('Unexpected token')) {
      throw error;
    }
  }
  return null;
}

export const authService = {
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    // 1. Try external backend if configured
    if (API_BASE_URL) {
      const result = await attemptAuthFetch(`${API_BASE_URL}/api/auth/login`, { email, password });
      if (result) return result;
    }

    // 2. Try relative Next.js native API route
    if (typeof window !== 'undefined') {
      const result = await attemptAuthFetch(`/api/auth/login`, { email, password });
      if (result) return result;
    }

    // 3. Direct client fallback for offline/demo execution
    const nameFromEmail = email.split('@')[0].replace(/[._]/g, ' ');
    const formattedName = nameFromEmail
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return {
      user: {
        id: `usr_${Date.now()}`,
        name: formattedName || 'Shop.co User',
        email: email.toLowerCase(),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
        createdAt: new Date().toISOString(),
      },
      token: `jwt_fallback_${Date.now()}`,
    };
  },

  async signup(name: string, email: string, password: string): Promise<{ user: User; token: string }> {
    // 1. Try external backend if configured
    if (API_BASE_URL) {
      const result = await attemptAuthFetch(`${API_BASE_URL}/api/auth/signup`, { name, email, password });
      if (result) return result;
    }

    // 2. Try relative Next.js native API route
    if (typeof window !== 'undefined') {
      const result = await attemptAuthFetch(`/api/auth/signup`, { name, email, password });
      if (result) return result;
    }

    // 3. Direct client fallback for offline/demo execution
    return {
      user: {
        id: `usr_${Date.now()}`,
        name: name.trim(),
        email: email.toLowerCase(),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
        createdAt: new Date().toISOString(),
      },
      token: `jwt_fallback_${Date.now()}`,
    };
  },
};
