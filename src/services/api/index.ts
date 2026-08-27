import { apiClient } from './client';

export const AuthService = {
  citizenLogin: (phone: string, otp: string) => apiClient.post('/auth/citizen/login', { phone, otp }),
  governmentLogin: (employee_id: string, password: string) => apiClient.post('/auth/government/login', { employee_id, password }),
  getMe: () => apiClient.get('/auth/me'),
  logout: () => apiClient.post('/auth/logout')
};

export const ReportService = {
  createReport: (formData: FormData) => apiClient.post('/reports', formData),
  getMyReports: () => apiClient.get('/reports/my'),
  getReport: (id: string) => apiClient.get(`/reports/${id}`)
};

export const IssueService = {
  getIssues: (params?: Record<string, string>) => {
    const qs = params ? new URLSearchParams(params).toString() : '';
    return apiClient.get(`/issues${qs ? `?${qs}` : ''}`);
  },
  getIssue: (id: string) => apiClient.get(`/issues/${id}`),
  updateIssue: (id: string, data: any) => apiClient.patch(`/issues/${id}`, data),
  assignIssue: (id: string, data: any) => apiClient.post(`/issues/${id}/assign`, data),
  startIssue: (id: string) => apiClient.post(`/issues/${id}/start`),
  resolveIssue: (id: string) => apiClient.post(`/issues/${id}/resolve`),
  reopenIssue: (id: string, notes: string) => apiClient.post(`/issues/${id}/reopen?notes=${encodeURIComponent(notes)}`),
  uploadEvidence: (id: string, formData: FormData) => apiClient.post(`/issues/${id}/resolution-evidence`, formData),
  verifyResolution: (id: string, action: string, notes?: string) => apiClient.post(`/issues/${id}/verify-resolution`, { action, notes })
};

export const DashboardService = {
  getOverview: () => apiClient.get('/dashboard/overview'),
  getMap: () => apiClient.get('/dashboard/map'),
  getHeatmap: () => apiClient.get('/dashboard/heatmap'),
  getDepartments: () => apiClient.get('/dashboard/departments')
};

export const AnalyticsService = {
  getTrends: () => apiClient.get('/analytics/trends'),
  getIssuesByType: () => apiClient.get('/analytics/issues-by-type'),
  getIssuesByCity: () => apiClient.get('/analytics/issues-by-city')
};
