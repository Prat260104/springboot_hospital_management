export default function StatsCard({ title, value, icon, color = 'var(--primary)' }) {
    return (
        <div className="card" style={{
            padding: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
            <div style={{
                width: '60px',
                height: '60px',
                borderRadius: 'var(--radius)',
                background: `${color}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: color
            }}>
                {icon}
            </div>
            <div>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem' }}>{title}</p>
                <h3 style={{ margin: '0.25rem 0 0 0', color: 'var(--text)', fontSize: '1.75rem', fontWeight: '700' }}>{value}</h3>
            </div>
        </div>
    );
}
