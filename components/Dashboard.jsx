import AdminChargingStations from './AdminChargingStations';

export default function Dashboard() {
  return (
    <div className="dashboard-container animate-fade-in">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p className="page-subtitle">Manage your EV charging network</p>
      </div>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <AdminChargingStations />
        </div>
      </div>
    </div>
  );
}
