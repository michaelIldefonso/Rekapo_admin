// User management service for admin operations
// Handles CRUD operations, user filtering, and role management
import axios from 'axios';

// Environment-based API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Dedicated axios instance for user management operations
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Auto-inject admin token for secure user management operations
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Enhanced error logging for user management operations
// Helps distinguish user service errors from other API errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('User API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    throw error;
  }
);

export const userService = {
  /**
   * Get paginated list of users with advanced filtering capabilities
   * Supports search, role filtering, and status-based queries
   * @param {Object} options - Filtering and pagination options
   * @param {number} options.page - Page number for pagination
   * @param {number} options.pageSize - Number of users per page 
   * @param {string} options.search - Search term for user lookup
   * @param {boolean|null} options.isAdmin - Filter by admin role
   * @param {boolean|null} options.isDisabled - Filter by disabled status
   * @param {boolean|null} options.isActive - Filter by active status
   */
  async getUsers({ page = 1, pageSize = 20, search = '', isAdmin = null, isDisabled = null, isActive = null } = {}) {
    try {
      // Build query parameters dynamically based on provided filters
      const params = new URLSearchParams({ page: page.toString(), page_size: pageSize.toString() });
      if (search) params.append('search', search);
      if (isAdmin !== null) params.append('is_admin', isAdmin.toString());
      if (isDisabled !== null) params.append('is_disabled', isDisabled.toString());
      if (isActive !== null) params.append('is_active', isActive.toString());

      const response = await axiosInstance.get(`/admin/users?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Failed to get users:', error);
      throw error;
    }
  },

  /**
   * Get detailed information about a specific user
   */
  async getUserDetails(userId) {
    try {
      const response = await axiosInstance.get(`/admin/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to get user details:', error);
      throw error;
    }
  },

  /**
   * Disable a user account
   */
  async disableUser(userId, reason) {
    try {
      const response = await axiosInstance.post(`/admin/users/${userId}/disable`, { reason });
      return response.data;
    } catch (error) {
      console.error('Failed to disable user:', error);
      throw error;
    }
  },

  /**
   * Enable a previously disabled user account
   */
  async enableUser(userId) {
    try {
      const response = await axiosInstance.post(`/admin/users/${userId}/enable`);
      return response.data;
    } catch (error) {
      console.error('Failed to enable user:', error);
      throw error;
    }
  },

  /**
   * Update admin status of a user (promote/demote)
   */
  async updateAdminStatus(userId, isAdmin) {
    try {
      const response = await axiosInstance.patch(`/admin/users/${userId}/admin-status`, { is_admin: isAdmin });
      return response.data;
    } catch (error) {
      console.error('Failed to update admin status:', error);
      throw error;
    }
  },

  /**
   * Permanently delete a user account
   */
  async deleteUser(userId) {
    try {
      const response = await axiosInstance.delete(`/admin/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete user:', error);
      throw error;
    }
  },

  /**
   * Get user analytics
   */
  async getUserAnalytics(userId) {
    try {
      const response = await axiosInstance.get(`/admin/users/${userId}/analytics`);
      return response.data;
    } catch (error) {
      console.error('Failed to get user analytics:', error);
      throw error;
    }
  },

  /**
   * Get all users analytics with pagination and time period filter
   */
  async getUsersAnalytics({ page = 1, pageSize = 20, timePeriod = 'all' } = {}) {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        page_size: pageSize.toString(),
        time_period: timePeriod
      });
      const response = await axiosInstance.get(`/admin/analytics/users?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Failed to get users analytics:', error);
      throw error;
    }
  },
};

export default userService;
