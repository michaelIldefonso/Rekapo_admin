import React, { useState } from 'react';
import { useAdmin } from '../hooks/useAdmin';

export default function SessionManagement() {
  const { querySessions, deleteSession, getSessionMetadata } = useAdmin();
  const [query, setQuery] = useState('');
  const [selectedSession, setSelectedSession] = useState(null);
  const [confirmMsg, setConfirmMsg] = useState('');

  const sessions = querySessions(query);

  const handleDelete = (id) => {
    deleteSession(id);
    setConfirmMsg('Session deleted successfully.');
    setSelectedSession(null);
    setTimeout(() => setConfirmMsg(''), 2000);
  };

  const handleShowMetadata = (session) => {
    const md = getSessionMetadata(session.id);
    setSelectedSession({ ...session, metadata: md });
  };

  return (
    <div style={{ minHeight: '100vh', padding: '2rem', background: '#f9f9f9', color: '#222' }}>
      <div style={{ background: '#fff', border: '1px solid #e0e0e0', maxWidth: 900, margin: '0 auto', borderRadius: 8, boxShadow: '0 2px 8px #0001', padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>Session Management</h2>
        </div>
        <div style={{ marginBottom: 16 }}>
          <input
            type="text"
            placeholder="Search sessions by user id or device..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ padding: 8, width: '100%', borderRadius: 4, border: '1px solid #ccc' }}
          />
        </div>
        {confirmMsg && <div style={{ marginBottom: 16, color: 'green', fontWeight: 500 }}>{confirmMsg}</div>}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: 8 }}>Session ID</th>
              <th style={{ textAlign: 'left', padding: 8 }}>User ID</th>
              <th style={{ textAlign: 'left', padding: 8 }}>Device</th>
              <th style={{ textAlign: 'left', padding: 8 }}>Last Active</th>
              <th style={{ textAlign: 'center', padding: 8 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: 16 }}>No sessions found.</td>
              </tr>
            ) : (
              sessions.map(s => (
                <tr key={s.id}>
                  <td style={{ padding: 8 }}>{s.id}</td>
                  <td style={{ padding: 8 }}>{s.userId}</td>
                  <td style={{ padding: 8 }}>{s.device}</td>
                  <td style={{ padding: 8 }}>{s.lastActive}</td>
                  <td style={{ padding: 8, textAlign: 'center' }}>
                    <button onClick={() => handleShowMetadata(s)} style={{ marginRight: 8, padding: '4px 10px', borderRadius: 4, border: 'none', background: '#2196f3', color: '#fff', cursor: 'pointer' }}>Metadata</button>
                    <button onClick={() => handleDelete(s.id)} style={{ padding: '4px 10px', borderRadius: 4, border: 'none', background: '#f44336', color: '#fff', cursor: 'pointer' }}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {selectedSession && (
          <div style={{ marginTop: 24, padding: 16, background: '#f5f5f5', borderRadius: 6 }}>
            <strong>Session Metadata:</strong>
            <pre style={{ margin: 0 }}>{selectedSession.metadata}</pre>
            <button onClick={() => setSelectedSession(null)} style={{ marginTop: 8, padding: '2px 10px', borderRadius: 4, border: 'none', background: '#888', color: '#fff', cursor: 'pointer' }}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
