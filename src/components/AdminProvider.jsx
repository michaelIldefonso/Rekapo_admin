import React, { createContext, useContext, useState } from 'react';
import { users as initialUsers } from '../data/users';
import { sessions as initialSessions } from '../data/sessions';
import { systemStatistics as initialStats } from '../data/systemStatistics';

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [users, setUsers] = useState(initialUsers);
  const [sessions, setSessions] = useState(initialSessions);
  const [statistics, setStatistics] = useState(initialStats);

  // Users API
  const queryUsers = (query) => {
    if (!query) return users;
    const q = query.toLowerCase();
    return users.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  };

  const toggleUserStatus = (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'disabled' : 'active' } : u));
  };

  // Sessions API
  const querySessions = (query) => {
    if (!query) return sessions;
    const q = query.toLowerCase();
    return sessions.filter(s => s.device.toLowerCase().includes(q) || String(s.userId).includes(q));
  };

  const deleteSession = (id) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    return true;
  };

  const getSessionMetadata = (id) => sessions.find(s => s.id === id)?.metadata || null;

  // Statistics API (simple simulation)
  const queryStatistics = () => statistics;

  return (
    <AdminContext.Provider value={{
      users,
      sessions,
      statistics,
      queryUsers,
      toggleUserStatus,
      querySessions,
      deleteSession,
      getSessionMetadata,
      queryStatistics,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}
