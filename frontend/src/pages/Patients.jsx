import { useState, useEffect } from 'react';
import Table from '../components/Table';
import { patientService } from '../services/patientService';

export default function Patients() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPatients();
    }, []);

    const loadPatients = async () => {
        try {
            const data = await patientService.getAllPatients();
            setPatients(data);
        } catch (error) {
            console.error('Error loading patients:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (patient) => {
        if (window.confirm(`Are you sure you want to delete ${patient.name}?`)) {
            try {
                await patientService.deletePatient(patient.id);
                loadPatients();
            } catch (error) {
                console.error('Error deleting patient:', error);
                alert('Failed to delete patient');
            }
        }
    };

    const columns = [
        { header: 'ID', accessor: 'id' },
        { header: 'Name', accessor: 'name' },
        { header: 'Gender', accessor: 'gender' },
        {
            header: 'Birth Date',
            cell: (row) => new Date(row.birthDate).toLocaleDateString()
        },
        { header: 'Blood Group', accessor: 'bloodGroup' }
    ];

    if (loading) {
        return <div style={{ color: 'var(--text)' }}>Loading...</div>;
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ color: 'var(--text)', margin: 0 }}>Patients</h1>
            </div>

            <Table columns={columns} data={patients} onDelete={handleDelete} />
        </div>
    );
}
