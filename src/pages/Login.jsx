import React from 'react';

export default function Login() {
  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth logic here
    alert('Google login clicked');
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
