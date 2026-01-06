import api from './api';

export const doctorService = {
    getAllDoctors: async () => {
        const response = await api.get('/public/doctors');
        return response.data;
    },

    getDoctorById: async (id) => {
        const response = await api.get(`/doctors/${id}`);
        return response.data;
    },

    onboardDoctor: async (doctorData) => {
        const response = await api.post('/admin/onBoardNewDoctor', doctorData);
        return response.data;
    },

    updateDoctor: async (id, doctorData) => {
        const response = await api.put(`/doctors/${id}`, doctorData);
        return response.data;
    },

    deleteDoctor: async (id) => {
        const response = await api.delete(`/admin/doctors/${id}`);
        return response.data;
    },

    getDoctorAppointments: async () => {
        const response = await api.get('/doctors/appointments');
        return response.data;
    },

    getDoctorsBySpecialization: async (specialization) => {
        const response = await api.get(`/doctors/specialization/${specialization}`);
        return response.data;
    }
};
