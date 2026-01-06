import api from './api';

export const authService = {
    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        if (response.data.userId && response.data.token) {
            localStorage.setItem('userId', response.data.userId);
            localStorage.setItem('token', response.data.token);
            return response.data;
        } else {
            throw new Error('Invalid response from server');
        }
    },

    register: async (userData) => {
        const response = await api.post('/auth/signup', userData);
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
    },

    getCurrentUser: () => {
        return localStorage.getItem('userId');
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('userId') && !!localStorage.getItem('token');
    }
};
