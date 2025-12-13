import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';
import backgroundImage from '../assets/images/lvl fun!.jpg';
import backgroundAudio from '../assets/audio/Escape The Backrooms OST - Fun (You Day!) (Filtered Version).mp3';

export default function AdminInterface() {
  const { queryStatistics } = useAdmin();
  // use auth context to logout properly (clears tokens, server session)
  const { logout } = useAuth();
  const stats = queryStatistics();
  const audioRef = useRef(null);

  // Auto-play background music
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Set volume to 30%
      audioRef.current.play().catch(err => {
        console.log('Auto-play prevented:', err);
      });
    }

    // Add click handler to play audio on first user interaction
    const handleFirstClick = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(err => {
          console.log('Audio play failed:', err);
        });
      }
      // Remove listener after first click
      document.removeEventListener('click', handleFirstClick);
    };

    document.addEventListener('click', handleFirstClick);

    return () => {
      document.removeEventListener('click', handleFirstClick);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // ensure token is cleared even if API logout fails
      console.warn('Logout API failed; clearing token locally');
      try {
        // fallback: clear token directly
        localStorage.removeItem('adminToken');
      } catch (ex) {
        console.warn('Failed to clear token:', ex);
      }
    } finally {
      // Force navigation to login so app re-evaluates auth state
      window.location.assign('/login');
    }
  };

  const headerStyles = { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    gap: 12, 
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    padding: '20px',
    borderRadius: '10px'
  };
  const cardStyles = { 
    background: 'rgba(255, 255, 255, 0.1)', 
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderRadius: 10, 
    padding: 20, 
    boxShadow: '0 6px 18px rgba(15,23,42,0.06)' 
  };
  const gridStyles = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginTop: 16 };
  const statBoxStyles = { 
    padding: 14, 
    borderRadius: 8, 
    background: 'rgba(194, 190, 190, 0.1)', 
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    boxShadow: '0 6px 18px rgba(15,23,42,0.06)',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };
  const statNumber = { fontSize: 26, fontWeight: 700, color: '#ffffffff', textShadow: '0 2px 4px rgba(0,0,0,0.5)', fontFamily: 'Verdana, sans-serif' };
  const statLabel = { color: '#cacacaff', marginTop: 6, textShadow: '0 1px 3px rgba(0,0,0,0.4)', fontFamily: 'Verdana, sans-serif' };

  return (
    <div style={{ 
      minHeight: '100vh', 
      padding: '24px',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative'
    }}>
      {/* Dark overlay for better readability */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 0
      }}></div>

      {/* Background Audio */}
      <audio ref={audioRef} loop autoPlay>
        <source src={backgroundAudio} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={headerStyles}>
          <div>
            <h1 style={{ margin: 0, color: '#ffffffff', textShadow: '0 2px 6px rgba(0,0,0,0.6)', fontFamily: 'Verdana, sans-serif' }}>Admin Dashboard</h1>
            <div style={{ color: '#cacacaff', marginTop: 6, textShadow: '0 1px 3px rgba(0,0,0,0.4)', fontFamily: 'Verdana, sans-serif' }}>Overview & quick actions</div>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <Link to="/users">
              <button 
                style={{ 
                  padding: '8px 12px', 
                  borderRadius: 8, 
                  border: '1px solid rgba(255, 255, 255, 0.3)', 
                  background: 'rgba(255, 255, 255, 0.15)', 
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  cursor: 'pointer',
                  color: '#ffffff',
                  fontFamily: 'Verdana, sans-serif',
                  fontWeight: 500,
                  textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.25)';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                User Management
              </button>
            </Link>

            <Link to="/sessions">
              <button 
                style={{ 
                  padding: '8px 12px', 
                  borderRadius: 8, 
                  border: '1px solid rgba(255, 255, 255, 0.3)', 
                  background: 'rgba(255, 255, 255, 0.15)', 
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  cursor: 'pointer',
                  color: '#ffffff',
                  fontFamily: 'Verdana, sans-serif',
                  fontWeight: 500,
                  textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.25)';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Session Management
              </button>
            </Link>

            <button 
              onClick={handleLogout} 
              style={{ 
                padding: '8px 12px', 
                borderRadius: 8, 
                border: '1px solid rgba(239, 68, 68, 0.5)', 
                background: 'rgba(239, 68, 68, 0.8)', 
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                color: '#fff', 
                cursor: 'pointer',
                fontFamily: 'Verdana, sans-serif',
                fontWeight: 500,
                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(239, 68, 68, 1)';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(239, 68, 68, 0.8)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Logout
            </button>
          </div>
        </div>

        <div style={{ ...cardStyles }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ margin: 0, color: '#ffffffff', textShadow: '0 2px 6px rgba(0,0,0,0.6)', fontFamily: 'Verdana, sans-serif' }}>System Statistics</h2>
              <div style={{ color: '#cacacaff', marginTop: 6, textShadow: '0 1px 3px rgba(0,0,0,0.4)', fontFamily: 'Verdana, sans-serif' }}>Latest snapshot</div>
            </div>
          </div>

          <div style={gridStyles}>
            <div 
              style={statBoxStyles}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(194, 190, 190, 0.2)';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(15,23,42,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(194, 190, 190, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(15,23,42,0.06)';
              }}
            >
              <div style={statNumber}>{stats.totalUsers}</div>
              <div style={statLabel}>Total Users</div>
            </div>

            <div 
              style={statBoxStyles}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(194, 190, 190, 0.2)';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(15,23,42,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(194, 190, 190, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(15,23,42,0.06)';
              }}
            >
              <div style={statNumber}>{stats.activeSessions}</div>
              <div style={statLabel}>Active Sessions</div>
            </div>

            <div 
              style={statBoxStyles}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(194, 190, 190, 0.2)';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(15,23,42,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(194, 190, 190, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(15,23,42,0.06)';
              }}
            >
              <div style={statNumber}>{stats.lastLogin}</div>
              <div style={statLabel}>Last Login</div>
            </div>

            <div 
              style={statBoxStyles}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(194, 190, 190, 0.2)';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(15,23,42,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(194, 190, 190, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(15,23,42,0.06)';
              }}
            >
              <div style={statNumber}>{stats.systemLoad}</div>
              <div style={statLabel}>System Load</div>
            </div>
          </div>

          <div style={{ marginTop: 18 }}>
            <h3 style={{ margin: '0 0 8px 0', color: '#ffffff', textShadow: '0 2px 4px rgba(0,0,0,0.4)', fontFamily: 'Verdana, sans-serif' }}>Notes</h3>
            <p style={{ margin: 0, color: '#e5e7eb', textShadow: '0 1px 2px rgba(0,0,0,0.3)', fontFamily: 'Verdana, sans-serif' }}>ey yo wassup micheal this is a local mock snapshot, connect a backend to populate real-time statistics and activity logs nigga.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
