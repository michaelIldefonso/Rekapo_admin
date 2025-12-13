import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  CircularProgress,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Block,
  CheckCircle,
  Delete,
  AdminPanelSettings,
  PersonOff,
  Refresh,
} from '@mui/icons-material';
import userService from '../services/userService';
import backgroundImage from '../assets/images/poolrooms.jpg';
import backgroundAudio from '../assets/audio/daisy bell.mp3';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [search, setSearch] = useState('');
  const [isAdminFilter, setIsAdminFilter] = useState('all');
  const [isDisabledFilter, setIsDisabledFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const audioRef = useRef(null);
  const [showClickPrompt] = useState(true);

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
  
  // Dialog states
  const [disableDialog, setDisableDialog] = useState({ open: false, user: null, reason: '' });
  const [deleteDialog, setDeleteDialog] = useState({ open: false, user: null });
  const [adminDialog, setAdminDialog] = useState({ open: false, user: null, isAdmin: false });

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getUsers({
        page,
        pageSize,
        search: search.trim(),
        isAdmin: isAdminFilter === 'all' ? null : isAdminFilter === 'true',
        isDisabled: isDisabledFilter === 'all' ? null : isDisabledFilter === 'true',
      });
      setUsers(data.users);
      setTotal(data.total);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, pageSize, search, isAdminFilter, isDisabledFilter]);

  // Handle disable user
  const handleDisableUser = async () => {
    try {
      await userService.disableUser(disableDialog.user.id, disableDialog.reason);
      setSuccess(`User ${disableDialog.user.email} has been disabled`);
      setDisableDialog({ open: false, user: null, reason: '' });
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to disable user');
    }
  };

  // Handle enable user
  const handleEnableUser = async (user) => {
    try {
      await userService.enableUser(user.id);
      setSuccess(`User ${user.email} has been enabled`);
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to enable user');
    }
  };

  // Handle delete user
  const handleDeleteUser = async () => {
    try {
      await userService.deleteUser(deleteDialog.user.id);
      setSuccess(`User ${deleteDialog.user.email} has been deleted`);
      setDeleteDialog({ open: false, user: null });
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to delete user');
    }
  };

  // Handle admin status update
  const handleUpdateAdminStatus = async () => {
    try {
      await userService.updateAdminStatus(adminDialog.user.id, adminDialog.isAdmin);
      const action = adminDialog.isAdmin ? 'promoted to admin' : 'demoted from admin';
      setSuccess(`User ${adminDialog.user.email} has been ${action}`);
      setAdminDialog({ open: false, user: null, isAdmin: false });
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to update admin status');
    }
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      padding: 3,
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative'
    }}>
      {/* Dark overlay for better readability */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 0
      }}></Box>

      {/* Background Audio */}
      <audio ref={audioRef} loop autoPlay>
        <source src={backgroundAudio} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <Card sx={{ 
        maxWidth: 1200, 
        margin: '0 auto', 
        padding: 3,
        position: 'relative',
        zIndex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: '0 6px 18px rgba(15,23,42,0.06)'
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
          <Typography variant="h4">User Management</Typography>
          <Button startIcon={<Refresh />} onClick={fetchUsers} disabled={loading}>
            Refresh
          </Button>
        </Box>

        {/* Filters */}
        <Box sx={{ display: 'flex', gap: 2, marginBottom: 3, flexWrap: 'wrap' }}>
          <TextField
            label="Search"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flexGrow: 1, minWidth: 200 }}
          />
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Admin Status</InputLabel>
            <Select value={isAdminFilter} onChange={(e) => setIsAdminFilter(e.target.value)} label="Admin Status">
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="true">Admin</MenuItem>
              <MenuItem value="false">Non-Admin</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Account Status</InputLabel>
            <Select value={isDisabledFilter} onChange={(e) => setIsDisabledFilter(e.target.value)} label="Account Status">
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="false">Active</MenuItem>
              <MenuItem value="true">Disabled</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Table */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell align="center">Admin</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ padding: 4 }}>
                        No users found
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name || 'N/A'}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell align="center">
                          {user.is_admin ? (
                            <Chip label="Admin" color="primary" size="small" />
                          ) : (
                            <Chip label="User" size="small" />
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {user.is_disabled ? (
                            <Chip label="Disabled" color="error" size="small" />
                          ) : (
                            <Chip label="Active" color="success" size="small" />
                          )}
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                            {user.is_disabled ? (
                              <IconButton
                                size="small"
                                color="success"
                                onClick={() => handleEnableUser(user)}
                                title="Enable User"
                              >
                                <CheckCircle />
                              </IconButton>
                            ) : (
                              <IconButton
                                size="small"
                                color="warning"
                                onClick={() => setDisableDialog({ open: true, user, reason: '' })}
                                title="Disable User"
                              >
                                <Block />
                              </IconButton>
                            )}
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => setAdminDialog({ open: true, user, isAdmin: !user.is_admin })}
                              title={user.is_admin ? 'Demote from Admin' : 'Promote to Admin'}
                            >
                              <AdminPanelSettings />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => setDeleteDialog({ open: true, user })}
                              title="Delete User"
                            >
                              <Delete />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(e, value) => setPage(value)}
                  color="primary"
                />
              </Box>
            )}
          </>
        )}
      </Card>

      {/* Disable User Dialog */}
      <Dialog open={disableDialog.open} onClose={() => setDisableDialog({ open: false, user: null, reason: '' })}>
        <DialogTitle>Disable User</DialogTitle>
        <DialogContent>
          <Typography sx={{ marginBottom: 2 }}>
            Are you sure you want to disable <strong>{disableDialog.user?.email}</strong>?
          </Typography>
          <TextField
            autoFocus
            label="Reason"
            fullWidth
            multiline
            rows={3}
            value={disableDialog.reason}
            onChange={(e) => setDisableDialog({ ...disableDialog, reason: e.target.value })}
            placeholder="Enter reason for disabling this user..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDisableDialog({ open: false, user: null, reason: '' })}>Cancel</Button>
          <Button onClick={handleDisableUser} color="warning" disabled={!disableDialog.reason.trim()}>
            Disable
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, user: null })}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ marginBottom: 2 }}>
            This action cannot be undone!
          </Alert>
          <Typography>
            Are you sure you want to permanently delete <strong>{deleteDialog.user?.email}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, user: null })}>Cancel</Button>
          <Button onClick={handleDeleteUser} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Admin Status Dialog */}
      <Dialog open={adminDialog.open} onClose={() => setAdminDialog({ open: false, user: null, isAdmin: false })}>
        <DialogTitle>{adminDialog.isAdmin ? 'Promote to Admin' : 'Demote from Admin'}</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to {adminDialog.isAdmin ? 'promote' : 'demote'}{' '}
            <strong>{adminDialog.user?.email}</strong> {adminDialog.isAdmin ? 'to admin' : 'from admin'}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAdminDialog({ open: false, user: null, isAdmin: false })}>Cancel</Button>
          <Button onClick={handleUpdateAdminStatus} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar open={!!success} autoHideDuration={6000} onClose={() => setSuccess(null)}>
        <Alert onClose={() => setSuccess(null)} severity="success">
          {success}
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>

      {/* Click Prompt at bottom */}
      {showClickPrompt && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: '30px 0',
            position: 'relative',
            zIndex: 1
          }}
        >
          <Box
            sx={{
              padding: '10px 20px',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              animation: 'fadeInPulse 2s ease-in-out infinite',
              '@keyframes fadeInPulse': {
                '0%, 100%': { opacity: 0.6 },
                '50%': { opacity: 0.9 },
              },
            }}
          >
            <Typography
              sx={{
                color: '#ffffff',
                fontFamily: 'Verdana, sans-serif',
                fontSize: '13px',
                fontWeight: 400,
                textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                letterSpacing: '0.3px',
              }}
            >
              ✨ click anywhere to feel the liminality
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}
