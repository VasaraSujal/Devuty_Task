'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '../api/client';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'AUTHOR';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check current user on mount
  useEffect(() => {
    checkCurrentUser();
  }, []);

  const checkCurrentUser = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.me();
      const userData = response.data;
      setUser({
        id: userData.id,
        email: userData.email,
        name: userData.name,
        role: userData.role === 'ADMIN' ? 'ADMIN' : 'AUTHOR'
      });
    } catch (err) {
      // Not authenticated or session expired
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setError(null);
    try {
      // CSRF token needs to be fetched first (from a cookie set by the server)
      await apiClient.login(email, password);

      // Fetch current user after login
      await checkCurrentUser();

      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  const logout = async () => {
    try {
      await apiClient.logout();
    } catch (err) {
      // Ignore logout errors
    }
    setUser(null);
    router.push('/admin/login');
  };

  const refresh = async () => {
    try {
      await apiClient.refresh();
      await checkCurrentUser();
    } catch (err) {
      // Refresh failed, user likely logged out
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export function useRequireAuth(roles: ('ADMIN' | 'AUTHOR')[] = ['ADMIN']) {
  const { user, isLoading, error } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/admin/login');
      } else if (roles.length > 0 && !roles.includes(user.role)) {
        router.push('/admin'); // Redirect to dashboard on wrong role
      }
    }
  }, [user, isLoading, roles, router]);

  return { user, isLoading, error };
}