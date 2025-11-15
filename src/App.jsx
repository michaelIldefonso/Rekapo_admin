
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import SessionManagement from './pages/SessionManagement';
import Login from './pages/Login';
import AdminInterface from './pages/AdminInterface';
import SystemStatistics from './pages/SystemStatistics';

import { AdminProvider } from './components/AdminProvider';
import React from 'react';

function App() {
  // simple auth state persisted to localStorage
  const [isAuthenticated, setIsAuthenticated] = React.useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  React.useEffect(() => {
    // Ensure user sees the login page if not authenticated
    if (!isAuthenticated && typeof window !== 'undefined') {
      if (window.location.pathname !== '/login') {
        window.history.replaceState({}, '', '/login');
      }
    }
  }, [isAuthenticated]);

  return (
    <AdminProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          {!isAuthenticated ? (
            <Route path="*" element={<Navigate to="/login" replace />} />
          ) : (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/sessions" element={<SessionManagement />} />
              <Route path="/statistics" element={<SystemStatistics />} />
              <Route path="/" element={<AdminInterface />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  );
}

export default App;
