export default function Unauthorized() {
  return (
    <div className="container">
      <div className="card text-center animate-fade-in">
        <div style={{ fontSize: '4rem', marginBottom: 'var(--space-4)' }}>🚫</div>
        <h2 style={{ color: 'var(--error)' }}>403 - Access Denied</h2>
        <p>You don't have the required permissions to access this page.</p>
        <p style={{ color: 'var(--neutral-500)' }}>Please contact an administrator if you believe this is an error.</p>
      </div>
    </div>
  );
}
