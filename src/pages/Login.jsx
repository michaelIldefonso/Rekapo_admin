import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Button, Card, CircularProgress, Typography, Alert } from '@mui/material';
import useAuth from '../hooks/useAuth';
import authService from '../services/authService';

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check for error in URL params
  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      setError(`Authentication failed: ${errorParam}`);
    }
  }, [searchParams]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate('/');
    }
  }, [isAuthenticated, loading, navigate]);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      const { authorization_url } = await authService.initiateLogin();
      window.location.href = authorization_url;
    } catch (err) {
      setError('Failed to initiate login. Please try again.');
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Card sx={{ padding: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h4" component="h1" sx={{ marginBottom: 2, textAlign: 'center' }}>
          Admin Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}

        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={handleGoogleLogin}
          disabled={loading}
          sx={{
            backgroundColor: '#1f2937',
            '&:hover': {
              backgroundColor: '#111827',
            },
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign in with Google'}
        </Button>

        <Typography
          variant="body2"
          sx={{ marginTop: 2, textAlign: 'center', color: '#666' }}
        >
          Only authorized admin users can access this system.
        </Typography>
      </Card>
    </Box>
  );
}
