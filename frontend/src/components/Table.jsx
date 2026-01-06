export default function Table({ columns, data, onEdit, onDelete }) {
    return (
        <div style={{ overflowX: 'auto' }}>
            <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius)',
                overflow: 'hidden'
            }}>
                <thead>
                    <tr style={{ background: 'rgba(79, 70, 229, 0.1)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                        {columns.map((column, index) => (
                            <th key={index} style={{
                                padding: '1rem',
                                textAlign: 'left',
                                color: 'var(--text)',
                                fontWeight: '600',
                                fontSize: '0.875rem'
                            }}>
                                {column.header}
                            </th>
                        ))}
                        {(onEdit || onDelete) && (
                            <th style={{
                                padding: '1rem',
                                textAlign: 'right',
                                color: 'var(--text)',
                                fontWeight: '600',
                                fontSize: '0.875rem'
                            }}>
                                Actions
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} style={{
                            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                            transition: 'background 0.2s'
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(79, 70, 229, 0.05)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                            {columns.map((column, colIndex) => (
                                <td key={colIndex} style={{
                                    padding: '1rem',
                                    color: 'var(--text-muted)',
                                    fontSize: '0.875rem'
                                }}>
                                    {column.accessor ? row[column.accessor] : column.cell(row)}
                                </td>
                            ))}
                            {(onEdit || onDelete) && (
                                <td style={{ padding: '1rem', textAlign: 'right' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                        {onEdit && (
                                            <button onClick={() => onEdit(row)} className="btn" style={{
                                                padding: '0.5rem 1rem',
                                                fontSize: '0.875rem',
                                                background: 'rgba(79, 70, 229, 0.1)',
                                                color: 'var(--primary)'
                                            }}>
                                                Edit
                                            </button>
                                        )}
                                        {onDelete && (
                                            <button onClick={() => onDelete(row)} className="btn" style={{
                                                padding: '0.5rem 1rem',
                                                fontSize: '0.875rem',
                                                background: 'rgba(239, 68, 68, 0.1)',
                                                color: 'var(--danger)'
                                            }}>
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
