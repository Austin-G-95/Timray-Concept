// context/AuthContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Mock login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In real app, you would call your API here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email: email,
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
      };
      
      setUser(mockUser);
      localStorage.setItem('timray-user', JSON.stringify(mockUser));
      router.push('/account');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock signup function
  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // In real app, you would call your API here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '1',
        name: name,
        email: email,
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + name
      };
      
      setUser(mockUser);
      localStorage.setItem('timray-user', JSON.stringify(mockUser));
      router.push('/account');
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock Google login
  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      // In real app, this would redirect to Google OAuth
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: 'google-123',
        name: 'Google User',
        email: 'user@gmail.com',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Google'
      };
      
      setUser(mockUser);
      localStorage.setItem('timray-user', JSON.stringify(mockUser));
      router.push('/account');
    } catch (error) {
      console.error('Google login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('timray-user');
    router.push('/');
  };

  // Load user from localStorage on mount
  useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('timray-user');
      if (saved) {
        setUser(JSON.parse(saved));
      }
    }
  });

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      signup,
      loginWithGoogle,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}