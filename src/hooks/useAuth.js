// Custom hook for accessing authentication context
// Provides type-safe access to auth state with proper error handling
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

export function useAuth() {
  const context = useContext(AuthContext);
  // Defensive programming: ensure hook is used within proper provider
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Export both named and default for flexibility
export default useAuth;
