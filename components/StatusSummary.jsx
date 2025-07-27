// components/StatusSummary.jsx
export default function StatusSummary({ statusCounts }) {
  return (
    <div className="card">
      <h3>Charger Status Overview</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
        <div className="badge badge-success" style={{ padding: 'var(--space-3)', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{statusCounts?.available || 0}</div>
          <div style={{ fontSize: '0.75rem' }}>Available</div>
        </div>
        <div className="badge badge-warning" style={{ padding: 'var(--space-3)', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{statusCounts?.['plugged in'] || 0}</div>
          <div style={{ fontSize: '0.75rem' }}>In Use</div>
        </div>
        <div className="badge badge-error" style={{ padding: 'var(--space-3)', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{statusCounts?.faulty || 0}</div>
          <div style={{ fontSize: '0.75rem' }}>Faulty</div>
        </div>
      </div>
    </div>
  );
}
