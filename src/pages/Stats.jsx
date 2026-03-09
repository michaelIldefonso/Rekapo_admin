// Simple statistics page placeholder using admin hooks
// Basic implementation for quick statistical queries (consider consolidating with SystemStatistics)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../hooks/useAdmin';

export default function SystemStatistics() {
  const { queryStatistics } = useAdmin();
  const navigate = useNavigate();
  // Basic state management for simple statistics display
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  // Simple statistics query handler with loading simulation
  const handleQuery = () => {
    setLoading(true);
    // Simulate API delay for better UX
    setTimeout(() => {
      setStats(queryStatistics());
      setLoading(false);
    }, 500);
  };

  // Simple, clean layout for basic statistics display
  return (
    <div style={{ minHeight: '100vh', padding: '2rem', background: '#f9f9f9' }}>
      <div style={{ background: '#fff', border: '1px solid #e0e0e0', maxWidth: 700, margin: '0 auto', borderRadius: 8, padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>System Statistics</h2>
          {/* Breadcrumb navigation back to main admin interface */}
          <button onClick={() => navigate('/')} style={{ padding: '6px 10px', borderRadius: 6, border: 'none', background: '#1976d2', color: '#fff', cursor: 'pointer' }}>Back to Admin</button>
        </div>
        {/* Statistics query trigger with loading state */}
        <button onClick={handleQuery} disabled={loading} style={{ padding: '8px 16px', borderRadius: 6, border: 'none', background: '#1976d2', color: '#fff', cursor: 'pointer' }}>
          {loading ? 'Querying...' : 'Query Statistics'}
        </button>

        {/* Statistics display area - populated after query */}
        {stats && (
          <div style={{ marginTop: 16 }}>
            <div><strong>Total Users:</strong> {stats.totalUsers}</div>
            <div><strong>Active Sessions:</strong> {stats.activeSessions}</div>
            <div><strong>Last Login:</strong> {stats.lastLogin}</div>
            <div><strong>System Load:</strong> {stats.systemLoad}</div>
          </div>
        )}
      </div>
    </div>
  );
}
