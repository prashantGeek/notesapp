import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true, // Allow cookies to be sent with requests
})

// Simple auth functions
export const authAPI = {
  checkAuth: () => api.get('/auth/user'),
  logout: () => api.post('/auth/logout'),
  getGoogleLoginUrl: () => 'http://localhost:3000/auth/google'
};

// Simple notes functions  
export const notesAPI = {
  getAllNotes: () => api.get('/api/notes'),
  getNoteById: (id) => api.get(`/api/notes/${id}`),
  createNote: (data) => api.post('/api/notes', data),
  updateNote: (id, data) => api.put(`/api/notes/${id}`, data),
  deleteNote: (id) => api.delete(`/api/notes/${id}`)
};

export default api;