import { useState, useEffect } from 'react';
import { Users, Stethoscope, Calendar, Building2 } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import { doctorService } from '../services/doctorService';
import { patientService } from '../services/patientService';
import { appointmentService } from '../services/appointmentService';
import { departmentService } from '../services/departmentService';

export default function Dashboard() {
    const [stats, setStats] = useState({
        patients: 0,
        doctors: 0,
        appointments: 0,
        departments: 0
    });
    const [recentAppointments, setRecentAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            const [doctors, patients, appointments, departments] = await Promise.all([
                doctorService.getAllDoctors(),
                patientService.getAllPatients(),
                appointmentService.getAllAppointments().catch(() => []),
                departmentService.getAllDepartments()
            ]);

            setStats({
                patients: patients.length,
                doctors: doctors.length,
                appointments: appointments.length,
                departments: departments.length
            });

            setRecentAppointments(appointments.slice(0, 5));
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div style={{ color: 'var(--text)' }}>Loading...</div>;
    }

    return (
        <div>
            <h1 style={{ color: 'var(--text)', marginBottom: '2rem' }}>Dashboard</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <StatsCard title="Total Patients" value={stats.patients} icon={<Users size={28} />} color="var(--primary)" />
                <StatsCard title="Total Doctors" value={stats.doctors} icon={<Stethoscope size={28} />} color="#10b981" />
                <StatsCard title="Appointments" value={stats.appointments} icon={<Calendar size={28} />} color="#f59e0b" />
                <StatsCard title="Departments" value={stats.departments} icon={<Building2 size={28} />} color="#8b5cf6" />
            </div>

            <div className="card" style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius)' }}>
                <h2 style={{ color: 'var(--text)', marginBottom: '1rem' }}>Recent Appointments</h2>
                {recentAppointments.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)' }}>No appointments found</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {recentAppointments.map((appointment) => (
                            <div key={appointment.id} style={{
                                padding: '1rem',
                                background: 'rgba(79, 70, 229, 0.05)',
                                borderRadius: 'var(--radius)',
                                border: '1px solid rgba(79, 70, 229, 0.1)'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <p style={{ margin: 0, color: 'var(--text)', fontWeight: '600' }}>
                                            Dr. {appointment.doctor?.name}
                                        </p>
                                        <p style={{ margin: '0.25rem 0 0 0', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                            {appointment.reason}
                                        </p>
                                    </div>
                                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                        {new Date(appointment.appointmentTime).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
