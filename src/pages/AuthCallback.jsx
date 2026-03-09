// OAuth2 authentication callback handler
// Processes successful login tokens and error states from external OAuth provider
import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import useAuth from '../hooks/useAuth';

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleLoginCallback } = useAuth();

  useEffect(() => {
    // Extract OAuth2 response parameters from URL
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    // Handle OAuth2 authentication errors
    if (error) {
      navigate(`/login?error=${error}`);
      return;
    }

    // Process successful authentication token
    if (token) {
      handleLoginCallback(token)
        .then(() => {
          // Redirect to main dashboard on successful authentication
          navigate('/');
        })
        .catch(() => {
          // Redirect to login with error flag on token validation failure
          navigate(`/login?error=auth_failed`);
        });
    }
  }, [searchParams, handleLoginCallback, navigate]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <CircularProgress />
    </Box>
  );
}
