import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // Simulate successful login: call parent handler then navigate to admin
    if (onLogin) onLogin();
    navigate('/');
  };

  return (
    <div style={{ maxWidth: 320, margin: '100px auto', padding: 24, border: '1px solid #ccc', borderRadius: 8, textAlign: 'center' }}>
      <h2>Login</h2>
      <button
        onClick={handleGoogleLogin}
        style={{
          width: '100%',
          padding: 10,
          background: '#fff',
          border: '1px solid #ccc',
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          fontWeight: 500,
          cursor: 'pointer',
        }}
      >
        <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" style={{ width: 20, height: 20 }} />
        Sign in with Google
      </button>
    </div>
  );
}
