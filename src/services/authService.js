import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response error interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    throw error;
  }
);

export const authService = {
  /**
   * Initiate Google OAuth2 login flow
   */
  async initiateLogin() {
    try {
      console.log('Initiating login. API URL:', API_BASE_URL);
      const response = await axiosInstance.get('/admin/auth/login');
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.detail || error.message || 'Unknown error';
      console.error('Failed to initiate login:', errorMsg);
      throw new Error(`Failed to initiate login: ${errorMsg}`);
    }
  },

  /**
   * Verify admin token and get current user
   */
  async verifyToken(token) {
    try {
      const response = await axiosInstance.post('/admin/auth/verify', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to verify token:', error);
      throw error;
    }
  },

  /**
   * Logout admin user
   */
  async logout() {
    try {
      const response = await axiosInstance.post('/admin/auth/logout');
      localStorage.removeItem('adminToken');
      return response.data;
    } catch (error) {
      console.error('Failed to logout:', error);
      throw error;
    }
  },

  /**
   * Get stored token from localStorage
   */
  getToken() {
    return localStorage.getItem('adminToken');
  },

  /**
   * Save token to localStorage
   */
  setToken(token) {
    localStorage.setItem('adminToken', token);
  },

  /**
   * Clear stored token
   */
  clearToken() {
    localStorage.removeItem('adminToken');
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return !!this.getToken();
  },
};

export default authService;
