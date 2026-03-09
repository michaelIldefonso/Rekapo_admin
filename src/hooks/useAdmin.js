// Custom hook for accessing admin functionality and data
// Provides centralized access to user, session, and statistics management
import { useContext } from 'react';
import { AdminContext } from '../contexts/AdminContext';

export function useAdmin() {
  const ctx = useContext(AdminContext);
  // Ensure hook is used within AdminProvider for proper context access
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}
