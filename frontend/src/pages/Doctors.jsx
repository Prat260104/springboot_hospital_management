import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Table from '../components/Table';
import Modal from '../components/Modal';
import { doctorService } from '../services/doctorService';

export default function Doctors() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        specialization: '',
        email: ''
    });

    useEffect(() => {
        loadDoctors();
    }, []);

    const loadDoctors = async () => {
        try {
            const data = await doctorService.getAllDoctors();
            setDoctors(data);
        } catch (error) {
            console.error('Error loading doctors:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (doctor) => {
        setSelectedDoctor(doctor);
        setFormData({
            name: doctor.name,
            specialization: doctor.specialization,
            email: doctor.email
        });
        setShowModal(true);
    };

    const handleDelete = async (doctor) => {
        if (window.confirm(`Are you sure you want to delete Dr. ${doctor.name}?`)) {
            try {
                await doctorService.deleteDoctor(doctor.id);
                loadDoctors();
            } catch (error) {
                console.error('Error deleting doctor:', error);
                alert('Failed to delete doctor');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedDoctor) {
                await doctorService.updateDoctor(selectedDoctor.id, formData);
            }
            setShowModal(false);
            setSelectedDoctor(null);
            setFormData({ name: '', specialization: '', email: '' });
            loadDoctors();
        } catch (error) {
            console.error('Error saving doctor:', error);
            alert('Failed to save doctor');
        }
    };

    const columns = [
        { header: 'ID', accessor: 'id' },
        { header: 'Name', accessor: 'name' },
        { header: 'Specialization', accessor: 'specialization' },
        { header: 'Email', accessor: 'email' }
    ];

    if (loading) {
        return <div style={{ color: 'var(--text)' }}>Loading...</div>;
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ color: 'var(--text)', margin: 0 }}>Doctors</h1>
            </div>

            <Table columns={columns} data={doctors} onEdit={handleEdit} onDelete={handleDelete} />

            <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={selectedDoctor ? 'Edit Doctor' : 'Add Doctor'}>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text)' }}>Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text)' }}>Specialization</label>
                        <input
                            type="text"
                            value={formData.specialization}
                            onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
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
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text)' }}>Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            disabled={!!selectedDoctor}
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
                    <button type="submit" className="btn" style={{ width: '100%' }}>
                        {selectedDoctor ? 'Update Doctor' : 'Add Doctor'}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
