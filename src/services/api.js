import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://toto-backend-bw80.onrender.com/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

// Offline queue for failed requests
const offlineQueue = JSON.parse(localStorage.getItem('offlineQueue') || '[]');

const queueOfflineRequest = (config) => {
  offlineQueue.push({
    ...config,
    timestamp: new Date().toISOString()
  });
  localStorage.setItem('offlineQueue', JSON.stringify(offlineQueue));
};

const processOfflineQueue = async () => {
  if (!navigator.onLine || offlineQueue.length === 0) return;

  const successfulRequests = [];
  
  for (const request of offlineQueue) {
    try {
      await api(request);
      successfulRequests.push(request);
    } catch (error) {
      console.error('Failed to sync offline request:', error);
    }
  }

  // Remove successful requests
  const remainingQueue = offlineQueue.filter(req => 
    !successfulRequests.includes(req)
  );
  
  localStorage.setItem('offlineQueue', JSON.stringify(remainingQueue));
};

// Listen for online event to sync offline requests
window.addEventListener('online', processOfflineQueue);

export const authService = {
  initiateWhatsAppAuth: (phone, profileType, name) => 
    api.post('/auth/initiate', { phone, profileType, name }),
  
  verifyWhatsAppCode: (phone, code) => 
    api.post('/auth/verify', { phone, code }),
  
  verifyToken: () => api.get('/auth/verify-token')
};

export const babyService = {
  createBaby: (babyData) => api.post('/baby', babyData),
  getBaby: () => api.get('/baby'),
  updateBaby: (updates) => api.patch('/baby', updates)
};

export const vaccinationService = {
  getSchedule: () => api.get('/vaccinations/schedule'),
  markCompleted: (vaccineId, data) => api.patch(`/vaccinations/${vaccineId}/complete`, data),
  markPending: (vaccineId) => api.patch(`/vaccinations/${vaccineId}/pending`)
};

export const milestoneService = {
  getMilestones: () => api.get('/milestones'),
  markAchieved: (milestoneId, data) => api.patch(`/milestones/${milestoneId}/achieved`, data),
  markPending: (milestoneId) => api.patch(`/milestones/${milestoneId}/pending`)
};

export const checklistService = {
  submitPPDChecklist: (scores) => api.post('/checklists/ppd', { scores }),
  submitPartnerChecklist: (scores) => api.post('/checklists/partner', { scores }),
  getChecklistHistory: () => api.get('/checklists/history')
};

export const chpService = {
  getNearbyCHPs: (location) => api.get('/chp/nearby', { params: location }),
  getCHPByWard: (ward) => api.get('/chp/ward', { params: { ward } }),
  contactCHP: (chpId, message) => api.post(`/chp/${chpId}/contact`, { message })
};

export default api;