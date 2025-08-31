// frontend/src/utils/api.js
import axios from 'axios';
import { showError } from './toast';

// Base API URL
const API_BASE_URL = 'http://localhost:8000';

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('access_token');
};

// Generic API request function
export const apiRequest = async (url, method = 'GET', data = null, isFormData = false) => {
  try {
    const token = getAuthToken();
    const headers = {
      'Authorization': token ? `Bearer ${token}` : '',
    };

    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }

    const config = {
      method,
      url: `${API_BASE_URL}${url}`,
      headers,
      data: isFormData ? data : JSON.stringify(data),
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error('API Request Error:', error);
    
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/login';
    }
    
    const errorMessage = error.response?.data?.error || error.response?.data?.message || 'An error occurred';
    showError(errorMessage);
    throw new Error(errorMessage);
  }
};

// Auth API functions
export const loginUser = (credentials) => {
  return apiRequest('/api/auth/login/', 'POST', credentials);
};

export const registerUser = (userData) => {
  return apiRequest('/api/auth/register/', 'POST', userData);
};

export const refreshToken = (refreshToken) => {
  return apiRequest('/api/auth/token/refresh/', 'POST', { refresh: refreshToken });
};

// Submissions API functions
export const getSubmissions = () => {
  return apiRequest('/api/admin/submissions/', 'GET');
};

export const getSubmission = (id) => {
  return apiRequest(`/api/admin/submissions/${id}/`, 'GET');
};

export const updateSubmission = (id, data) => {
  return apiRequest(`/api/admin/submissions/${id}/`, 'PATCH', data);
};

export const deleteSubmission = (id) => {
  return apiRequest(`/api/admin/submissions/${id}/`, 'DELETE');
};

// FactChecks API functions
export const getFactChecks = () => {
  return apiRequest('/api/factchecks/', 'GET');
};

export const getFactCheck = (id) => {
  return apiRequest(`/api/factchecks/${id}/`, 'GET');
};

export const createFactCheck = (data) => {
  return apiRequest('/api/admin/factchecks/', 'POST', data);
};

export const updateFactCheck = (id, data) => {
  return apiRequest(`/api/admin/factchecks/${id}/`, 'PUT', data);
};

export const deleteFactCheck = (id) => {
  return apiRequest(`/api/admin/factchecks/${id}/`, 'DELETE');
};

// Positive Content API functions
export const getPositiveContent = () => {
  return apiRequest('/api/positive-content/', 'GET');
};

export const createPositiveContent = (formData) => {
  return apiRequest('/api/admin/positive-content/', 'POST', formData, true);
};

export const updatePositiveContent = (id, formData) => {
  return apiRequest(`/api/admin/positive-content/${id}/`, 'PUT', formData, true);
};

export const deletePositiveContent = (id) => {
  return apiRequest(`/api/admin/positive-content/${id}/`, 'DELETE');
};

// User API functions
export const getUsers = () => {
  return apiRequest('/api/admin/users/', 'GET');
};

export const updateUser = (id, data) => {
  return apiRequest(`/api/admin/users/${id}/`, 'PATCH', data);
};

// Dashboard API functions
export const getAdminStats = () => {
  return apiRequest('/api/admin/stats/', 'GET');
};

export const getUserDashboard = () => {
  return apiRequest('/api/user/dashboard/', 'GET');
};

// AI Analysis API functions
export const processSubmissionAI = (submissionId) => {
  return apiRequest(`/api/ai/process-submission/${submissionId}/`, 'POST');
};

export const getAIAnalysis = (submissionId) => {
  return apiRequest(`/api/ai/analysis/${submissionId}/`, 'GET');
};