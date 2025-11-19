import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from '../hooks/useAdmin';

export default function AdminInterface() {
  const { queryStatistics } = useAdmin();
  const navigate = useNavigate();
  const stats = queryStatistics();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.history.replaceState({}, '', '/login');
    navigate('/login');
    setTimeout(() => window.location.reload(), 50);
  };

  return (
    <div style={{ minHeight: '100vh', padding: '2rem', background: '#f9f9f9' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 900, margin: '0 auto 16px', gap: 12 }}>
        <h1 style={{ margin: 0 }}>Admin Interface</h1>
        <div>
          <button onClick={handleLogout} style={{ padding: '8px 12px', borderRadius: 6, border: 'none', background: '#f44336', color: '#fff', cursor: 'pointer' }}>Logout</button>
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid #e0e0e0', maxWidth: 900, margin: '0 auto', borderRadius: 8, padding: 24 }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
          <Link to="/users">User Management</Link>
          <Link to="/sessions">Session Management</Link>
        </div>

        <div style={{ marginTop: 24 }}>
          <h2>System Statistics</h2>
          <div><strong>Total Users:</strong> {stats.totalUsers}</div>
          <div><strong>Active Sessions:</strong> {stats.activeSessions}</div>
          <div><strong>Last Login:</strong> {stats.lastLogin}</div>
          <div><strong>System Load:</strong> {stats.systemLoad}</div>
        </div>
      </div>
    </div>
  );
}
