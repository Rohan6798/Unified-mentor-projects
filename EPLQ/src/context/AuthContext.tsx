import { createContext, useContext, useEffect, useState } from 'react';
import { logEvent } from '../services/logService';

export type UserRole = 'user' | 'admin' | null;

interface User {
  id: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean;
  isUser: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// This is a mock implementation. In a real app, use Firebase Auth
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for stored auth on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('auth');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored auth:', error);
        localStorage.removeItem('auth');
      }
    }
    setLoading(false);
  }, []);

  // In a real app, these would call Firebase Auth methods
  const login = async (email: string, password: string, role: UserRole) => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication logic
      if (password.length < 6) {
        throw new Error('Invalid credentials');
      }
      
      const user = { id: `user-${Date.now()}`, email, role };
      setCurrentUser(user);
      localStorage.setItem('auth', JSON.stringify(user));
      
      // Log the login event
      logEvent({
        type: 'LOGIN',
        userId: user.id,
        userRole: role,
        details: { email }
      });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, role: UserRole) => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock registration logic
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      const user = { id: `user-${Date.now()}`, email, role };
      setCurrentUser(user);
      localStorage.setItem('auth', JSON.stringify(user));
      
      // Log the registration event
      logEvent({
        type: 'REGISTER',
        userId: user.id,
        userRole: role,
        details: { email }
      });
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (currentUser) {
        // Log the logout event
        logEvent({
          type: 'LOGOUT',
          userId: currentUser.id,
          userRole: currentUser.role,
          details: { email: currentUser.email }
        });
      }
      
      setCurrentUser(null);
      localStorage.removeItem('auth');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const isAdmin = currentUser?.role === 'admin';
  const isUser = currentUser?.role === 'user';
  const isAuthenticated = !!currentUser;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        login,
        register,
        logout,
        isAdmin,
        isUser,
        isAuthenticated,
      }}
    >
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