// Route protection component for authentication-required pages
// Redirects unauthenticated users to login and shows loading states
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  // Show loading state while auth status is being determined
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Loading...</p>
      </div>
    );
  }

  // Redirect to login if not authenticated, otherwise render protected content
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
