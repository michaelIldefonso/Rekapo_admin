// Login page with OAuth2 integration
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
  

  

  // Handle authentication errors from URL parameters (OAuth2 callback)
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
      setError(err?.message || 'Failed to initiate login. Please try again.');
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
        backgroundColor: '#111827',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark overlay for better readability
        },
      }}
    >
      

      <Card sx={{ 
        padding: 4, 
        maxWidth: 400, 
        width: '100%', 
        position: 'relative', 
        zIndex: 1,
        boxShadow: 'none',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}>
        <Typography variant="h4" component="h1" sx={{ marginBottom: 2, textAlign: 'center', color: '#ffffffff' }}>
          Rekapo Admin
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
            backgroundColor: '#272b31ff',
            '&:hover': {
              backgroundColor: '#111827',
            },
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign in with Google'}
        </Button>

        <Typography
          variant="body2"
          sx={{ marginTop: 2, textAlign: 'center', color: '#ffffffff', fontFamily: 'Verdana, sans-serif' }}
        >
          Only authorized personnel can access this admin panel.
        </Typography>
      </Card>
    </Box>
  );
}
