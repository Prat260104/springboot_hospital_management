import api from './api';

export const appointmentService = {
    getAllAppointments: async () => {
        const response = await api.get('/admin/appointments');
        return response.data;
    },

    createAppointment: async (appointmentData) => {
        const response = await api.post('/patients/appointments', appointmentData);
        return response.data;
    },

    updateAppointment: async (id, appointmentData) => {
        const response = await api.put(`/appointments/${id}`, appointmentData);
        return response.data;
    },

    deleteAppointment: async (id) => {
        const response = await api.delete(`/patients/appointments/${id}`);
        return response.data;
    },

    getDoctorAppointments: async (doctorId) => {
        const response = await api.get(`/doctors/appointments`);
        return response.data;
    },

    getPatientAppointments: async (patientId) => {
        const response = await api.get(`/patients/${patientId}/appointments`);
        return response.data;
    }
};
