import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, UserPlus, Stethoscope, LogOut, Users } from 'lucide-react';

export default function Layout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <aside style={{ width: '250px', background: 'var(--bg-card)', padding: '2rem', borderRight: '1px solid #334155' }}>
                <h2 style={{ color: 'var(--primary)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Stethoscope /> MedCore
                </h2>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <NavLink to="/" icon={<LayoutDashboard size={20} />} text="Dashboard" />
                    <NavLink to="/doctors" icon={<Stethoscope size={20} />} text="Doctors" />
                    <NavLink to="/patients" icon={<Users size={20} />} text="Patients" />
                    <NavLink to="/appointments" icon={<Stethoscope size={20} />} text="Appointments" />
                </nav>

                <button
                    onClick={handleLogout}
                    className="btn"
                    style={{ marginTop: 'auto', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', width: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}
                >
                    <LogOut size={18} /> Logout
                </button>
            </aside>
            <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                <Outlet />
            </main>
        </div>
    );
}

function NavLink({ to, icon, text }) {
    return (
        <Link to={to} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem',
            borderRadius: 'var(--radius)',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            transition: 'all 0.2s',
            fontWeight: '500'
        }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(79, 70, 229, 0.1)'; e.currentTarget.style.color = 'var(--primary)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; }}
        >
            {icon}
            {text}
        </Link>
    );
}
