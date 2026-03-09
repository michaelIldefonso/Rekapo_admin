// React Router imports for client-side navigation
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Page component imports - organized by functionality
import SystemStatistics from './pages/SystemStatistics';
import UserManagement from './pages/UserManagement';
import UserAnalytics from './pages/UserAnalytics';
import SessionManagement from './pages/SessionManagement';
import SessionDetails from './pages/SessionDetails';
import Login from './pages/Login';
import AuthCallback from './pages/AuthCallback';
import AdminInterface from './pages/AdminInterface';
import Stats from './pages/Stats';
import AdminLogs from './pages/AdminLogs';

// Context providers for state management
import { AdminProvider } from './components/AdminProvider';
import { AuthProvider } from './contexts/AuthContext';
// Route protection component for authentication
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    // BrowserRouter enables client-side routing for SPA navigation
    <BrowserRouter>
      {/* AuthProvider manages authentication state across the entire app */}
      <AuthProvider>
        {/* AdminProvider manages admin-specific state and permissions */}
        <AdminProvider>
          <Routes>
            {/* Public routes - accessible without authentication */}
            <Route path="/login" element={<Login />} />
            <Route path="/auth/success" element={<AuthCallback />} />
            {/* Protected admin routes - require authentication */}
            {/* Dashboard route showing system overview */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <SystemStatistics />
                </ProtectedRoute>
              }
            />
            {/* User management functionality */}
            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <UserManagement />
                </ProtectedRoute>
              }
            />
            {/* User behavior analytics and insights */}
            <Route
              path="/user-analytics"
              element={
                <ProtectedRoute>
                  <UserAnalytics />
                </ProtectedRoute>
              }
            />
            {/* Session management overview */}
            <Route
              path="/sessions"
              element={
                <ProtectedRoute>
                  <SessionManagement />
                </ProtectedRoute>
              }
            />
            {/* Individual session details with dynamic sessionId parameter */}
            <Route
              path="/sessions/:sessionId"
              element={
                <ProtectedRoute>
                  <SessionDetails />
                </ProtectedRoute>
              }
            />
            {/* System statistics route - duplicate of dashboard, consider consolidating */}
            <Route
              path="/statistics"
              element={
                <ProtectedRoute>
                  <SystemStatistics />
                </ProtectedRoute>
              }
            />
            {/* Admin activity logs and audit trail */}
            <Route
              path="/logs"
              element={
                <ProtectedRoute>
                  <AdminLogs />
                </ProtectedRoute>
              }
            />
            {/* Root route - main admin interface landing page */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AdminInterface />
                </ProtectedRoute>
              }
            />
            {/* Alternative admin route - same as root, consider redirect instead */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminInterface />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AdminProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
