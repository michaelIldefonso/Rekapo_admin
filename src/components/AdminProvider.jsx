import React, { useState } from 'react';
import { users as initialUsers } from '../data/users';
import { sessions as initialSessions } from '../data/sessions';
import { systemStatistics as initialStats } from '../data/systemStatistics';
import { AdminContext } from '../contexts/AdminContext';
// NOTE: This stores data temporarily in memory for the app session only
// In production, this would be replaced with actual API calls to backend services
export function AdminProvider({ children }) {
  // Initialize state with mock data for development
  const [users, setUsers] = useState(initialUsers);
  const [sessions, setSessions] = useState(initialSessions);
  const [statistics] = useState(initialStats);

  // User Management API Methods
  // Provides search functionality across user names and emails
  const queryUsers = (query) => {
    if (!query) return users;
    const q = query.toLowerCase();
    return users.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  };

  // Toggle user active/disabled status for admin control
  const toggleUserStatus = (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'disabled' : 'active' } : u));
  };

  // Session Management API Methods
  // Search sessions by device type or user ID for monitoring
  const querySessions = (query) => {
    if (!query) return sessions;
    const q = query.toLowerCase();
    return sessions.filter(s => s.device.toLowerCase().includes(q) || String(s.userId).includes(q));
  };

  // Session deletion for admin security management
  const deleteSession = (id) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    return true;
  };

  // Retrieve detailed session metadata for analysis
  const getSessionMetadata = (id) => sessions.find(s => s.id === id)?.metadata || null;

  // Statistics API Methods
  // Simple statistics retrieval for dashboard monitoring
  const queryStatistics = () => statistics;

  return (
    <AdminContext.Provider value={{
      // Data state
      users,
      sessions,
      statistics,
      // User management methods
      queryUsers,
      toggleUserStatus,
      // Session management methods
      querySessions,
      deleteSession,
      getSessionMetadata,
      // Statistics methods
      queryStatistics,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

// Note: `useAdmin` moved to `src/hooks/useAdmin.js` to avoid fast-refresh warnings
