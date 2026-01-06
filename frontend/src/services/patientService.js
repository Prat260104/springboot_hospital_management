import api from './api';

export const patientService = {
    getAllPatients: async (page = 0, size = 10) => {
        const response = await api.get(`/admin/patients?page=${page}&size=${size}`);
        return response.data;
    },

    getPatientById: async (id) => {
        const response = await api.get(`/patients/${id}`);
        return response.data;
    },

    updatePatient: async (id, patientData) => {
        const response = await api.put(`/patients/${id}`, patientData);
        return response.data;
    },

    deletePatient: async (id) => {
        const response = await api.delete(`/admin/patients/${id}`);
        return response.data;
    },

    getPatientAppointments: async (id) => {
        const response = await api.get(`/patients/${id}/appointments`);
        return response.data;
    },

    searchPatients: async (name) => {
        const response = await api.get(`/patients/search?name=${name}`);
        return response.data;
    },

    getPatientsByBloodGroup: async (bloodGroup) => {
        const response = await api.get(`/patients/blood-group/${bloodGroup}`);
        return response.data;
    }
};
