import { createContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from stored token
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = authService.getToken();
        if (token) {
          const authData = await authService.verifyToken(token);
          setUser(authData.user);
        }
      } catch (err) {
        console.error('Failed to initialize auth:', err);
        authService.clearToken();
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const handleLoginCallback = useCallback(async (token) => {
    try {
      setLoading(true);
      setError(null);
      authService.setToken(token);
      const authData = await authService.verifyToken(token);
      setUser(authData.user);
      return authData.user;
    } catch (err) {
      setError(err.message);
      authService.clearToken();
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await authService.logout();
      setUser(null);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    handleLoginCallback,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
