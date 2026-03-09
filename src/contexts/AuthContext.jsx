// Authentication context provider for managing user auth state
// Handles OAuth2 login flow, token persistence, and session management
import { createContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';

// Create context with null default (requires provider)
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Core authentication state management
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from stored token on app startup
  // Critical for maintaining login sessions across browser refreshes
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = authService.getToken();
        if (token) {
          // Verify token validity and extract user data
          const authData = await authService.verifyToken(token);
          setUser(authData.user);
        }
      } catch (err) {
        console.error('Failed to initialize auth:', err);
        // Clean up invalid tokens to prevent auth loops
        authService.clearToken();
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Handle OAuth2 callback with token processing
  // Called after successful OAuth2 redirect from external provider
  const handleLoginCallback = useCallback(async (token) => {
    try {
      setLoading(true);
      setError(null);
      // Store token and verify its validity
      authService.setToken(token);
      const authData = await authService.verifyToken(token);
      setUser(authData.user);
      return authData.user;
    } catch (err) {
      setError(err.message);
      // Clean up failed login attempt
      authService.clearToken();
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout handler with proper cleanup
  // Clears both local state and stored tokens
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

  // Context value object with all auth state and methods
  // isAuthenticated computed from user presence for convenience
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
