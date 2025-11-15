import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from '../components/AdminProvider';

export default function AdminInterface() {
  const { users, sessions, statistics } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth and redirect to login
    localStorage.removeItem('isAuthenticated');
    // Replace history so back button doesn't return to admin
    window.history.replaceState({}, '', '/login');
    navigate('/login');
    // reload to ensure App reads auth state
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
          <Link to="/statistics">System Statistics</Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ padding: 12, border: '1px solid #eee', borderRadius: 6 }}>
            <h3>Users</h3>
            <div>Total users: {users.length}</div>
          </div>

          <div style={{ padding: 12, border: '1px solid #eee', borderRadius: 6 }}>
            <h3>Sessions</h3>
            <div>Active sessions: {sessions.length}</div>
          </div>

          <div style={{ padding: 12, border: '1px solid #eee', borderRadius: 6 }}>
            <h3>Statistics</h3>
            <div>Last report: {statistics.lastReport || 'N/A'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
