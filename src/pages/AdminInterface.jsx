import React from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';

export default function AdminInterface() {
  const { queryStatistics } = useAdmin();
  // use auth context to logout properly (clears tokens, server session)
  const { logout } = useAuth();
  const stats = queryStatistics();

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // ensure token is cleared even if API logout fails
      console.warn('Logout API failed; clearing token locally');
      try {
        // fallback: clear token directly
        localStorage.removeItem('adminToken');
      } catch (ex) {
        console.warn('Failed to clear token:', ex);
      }
    } finally {
      // Force navigation to login so app re-evaluates auth state
      window.location.assign('/login');
    }
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
