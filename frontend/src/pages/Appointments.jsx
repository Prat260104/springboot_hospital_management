import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Table from '../components/Table';
import Modal from '../components/Modal';
import { appointmentService } from '../services/appointmentService';
import { doctorService } from '../services/doctorService';
import { patientService } from '../services/patientService';

export default function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        doctorId: '',
        patientId: '',
        appointmentTime: '',
        reason: ''
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [appointmentsData, doctorsData, patientsData] = await Promise.all([
                appointmentService.getAllAppointments().catch(() => []),
                doctorService.getAllDoctors(),
                patientService.getAllPatients()
            ]);
            setAppointments(appointmentsData);
            setDoctors(doctorsData);
            setPatients(patientsData);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (appointment) => {
        if (window.confirm('Are you sure you want to cancel this appointment?')) {
            try {
                await appointmentService.deleteAppointment(appointment.id);
                loadData();
            } catch (error) {
                console.error('Error deleting appointment:', error);
                alert('Failed to cancel appointment');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await appointmentService.createAppointment(formData);
            setShowModal(false);
            setFormData({ doctorId: '', patientId: '', appointmentTime: '', reason: '' });
            loadData();
        } catch (error) {
            console.error('Error creating appointment:', error);
            alert('Failed to create appointment');
        }
    };

    const columns = [
        { header: 'ID', accessor: 'id' },
        {
            header: 'Doctor',
            cell: (row) => `Dr. ${row.doctor?.name || 'N/A'}`
        },
        {
            header: 'Appointment Time',
            cell: (row) => new Date(row.appointmentTime).toLocaleString()
        },
        { header: 'Reason', accessor: 'reason' }
    ];

    if (loading) {
        return <div style={{ color: 'var(--text)' }}>Loading...</div>;
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ color: 'var(--text)', margin: 0 }}>Appointments</h1>
                <button onClick={() => setShowModal(true)} className="btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Plus size={18} /> New Appointment
                </button>
            </div>

            <Table columns={columns} data={appointments} onDelete={handleDelete} />

            <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="New Appointment">
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text)' }}>Doctor</label>
                        <select
                            value={formData.doctorId}
                            onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                background: 'var(--bg)',
                                color: 'var(--text)'
                            }}
                        >
                            <option value="">Select Doctor</option>
                            {doctors.map(doctor => (
                                <option key={doctor.id} value={doctor.id}>Dr. {doctor.name} - {doctor.specialization}</option>
                            ))}
                        </select>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text)' }}>Patient</label>
                        <select
                            value={formData.patientId}
                            onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                background: 'var(--bg)',
                                color: 'var(--text)'
                            }}
                        >
                            <option value="">Select Patient</option>
                            {patients.map(patient => (
                                <option key={patient.id} value={patient.id}>{patient.name}</option>
                            ))}
                        </select>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text)' }}>Appointment Time</label>
                        <input
                            type="datetime-local"
                            value={formData.appointmentTime}
                            onChange={(e) => setFormData({ ...formData, appointmentTime: e.target.value })}
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                background: 'var(--bg)',
                                color: 'var(--text)'
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text)' }}>Reason</label>
                        <textarea
                            value={formData.reason}
                            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                            required
                            rows={3}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                background: 'var(--bg)',
                                color: 'var(--text)',
                                resize: 'vertical'
                            }}
                        />
                    </div>
                    <button type="submit" className="btn" style={{ width: '100%' }}>
                        Create Appointment
                    </button>
                </form>
            </Modal>
        </div>
    );
}
