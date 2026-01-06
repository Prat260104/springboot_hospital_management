import api from './api';

export const departmentService = {
    getAllDepartments: async () => {
        const response = await api.get('/public/departments');
        return response.data;
    },

    getDepartmentById: async (id) => {
        const response = await api.get(`/admin/departments/${id}`);
        return response.data;
    },

    createDepartment: async (departmentData) => {
        const response = await api.post('/admin/departments', departmentData);
        return response.data;
    },

    updateDepartment: async (id, departmentData) => {
        const response = await api.put(`/admin/departments/${id}`, departmentData);
        return response.data;
    },

    deleteDepartment: async (id) => {
        const response = await api.delete(`/admin/departments/${id}`);
        return response.data;
    },

    assignDoctor: async (departmentId, doctorId) => {
        const response = await api.post(`/admin/departments/${departmentId}/doctors/${doctorId}`);
        return response.data;
    },

    removeDoctor: async (departmentId, doctorId) => {
        const response = await api.delete(`/admin/departments/${departmentId}/doctors/${doctorId}`);
        return response.data;
    }
};
