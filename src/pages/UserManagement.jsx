import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../hooks/useAdmin';

export default function UserManagement() {
  const { queryUsers, toggleUserStatus } = useAdmin();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  const users = queryUsers(query);

  // Toggle user status (active/disabled) via AdminProvider
  const handleStatusToggle = (id) => {
    toggleUserStatus(id);
    setRefreshKey(k => k + 1); // force re-render
  };

  return (
    <div style={{ minHeight: '100vh', padding: '2rem', background: '#f9f9f9', color: '#222' }}>
      <div style={{ background: '#fff', border: '1px solid #e0e0e0', maxWidth: 700, margin: '0 auto', borderRadius: 8, boxShadow: '0 2px 8px #0001', padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>User Management</h2>
          <button onClick={() => navigate('/')} style={{ padding: '6px 10px', borderRadius: 6, border: 'none', background: '#1976d2', color: '#fff', cursor: 'pointer' }}>Back to Admin</button>
        </div>
        <div style={{ marginBottom: 16 }}>
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ padding: 8, width: '100%', borderRadius: 4, border: '1px solid #ccc' }}
          />
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: 8 }}>Name</th>
              <th style={{ textAlign: 'left', padding: 8 }}>Email</th>
              <th style={{ textAlign: 'center', padding: 8 }}>Status</th>
              <th style={{ textAlign: 'center', padding: 8 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: 16 }}>
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td style={{ padding: 8 }}>{user.name}</td>
                  <td style={{ padding: 8 }}>{user.email}</td>
                  <td style={{ padding: 8, textAlign: 'center' }}>{user.status}</td>
                  <td style={{ padding: 8, textAlign: 'center' }}>
                    <button
                      onClick={() => handleStatusToggle(user.id)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: 4,
                        border: 'none',
                        background: user.status === 'active' ? '#2196f3' : '#f44336',
                        color: '#fff',
                        cursor: 'pointer',
                      }}
                    >
                      {user.status === 'active' ? 'Disable' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
