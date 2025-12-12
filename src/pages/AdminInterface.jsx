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

  const headerStyles = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 16 };
  const cardStyles = { background: '#fff', borderRadius: 10, padding: 20, boxShadow: '0 6px 18px rgba(15,23,42,0.06)' };
  const gridStyles = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginTop: 16 };
  const statNumber = { fontSize: 26, fontWeight: 700 };
  const statLabel = { color: '#6b7280', marginTop: 6 };

  return (
    <div style={{ minHeight: '100vh', padding: '24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={headerStyles}>
          <div>
            <h1 style={{ margin: 0 }}>Admin Dashboard</h1>
            <div style={{ color: '#6b7280', marginTop: 6 }}>Overview & quick actions</div>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <Link to="/users">
              <button style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer' }}>User Management</button>
            </Link>

            <Link to="/sessions">
              <button style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer' }}>Session Management</button>
            </Link>

            <button onClick={handleLogout} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: '#ef4444', color: '#fff', cursor: 'pointer' }}>Logout</button>
          </div>
        </div>

        <div style={{ ...cardStyles }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ margin: 0 }}>System Statistics</h2>
              <div style={{ color: '#6b7280', marginTop: 6 }}>Latest snapshot</div>
            </div>
          </div>

          <div style={gridStyles}>
            <div style={{ padding: 14, borderRadius: 8, background: '#f8fafc' }}>
              <div style={statNumber}>{stats.totalUsers}</div>
              <div style={statLabel}>Total Users</div>
            </div>

            <div style={{ padding: 14, borderRadius: 8, background: '#f8fafc' }}>
              <div style={statNumber}>{stats.activeSessions}</div>
              <div style={statLabel}>Active Sessions</div>
            </div>

            <div style={{ padding: 14, borderRadius: 8, background: '#f8fafc' }}>
              <div style={statNumber}>{stats.lastLogin}</div>
              <div style={statLabel}>Last Login</div>
            </div>

            <div style={{ padding: 14, borderRadius: 8, background: '#f8fafc' }}>
              <div style={statNumber}>{stats.systemLoad}</div>
              <div style={statLabel}>System Load</div>
            </div>
          </div>

          <div style={{ marginTop: 18 }}>
            <h3 style={{ margin: '0 0 8px 0' }}>Notes</h3>
            <p style={{ margin: 0, color: '#374151' }}>ey yo wassup micheal this is a local mock snapshot, connect a backend to populate real-time statistics and activity logs nigga.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
