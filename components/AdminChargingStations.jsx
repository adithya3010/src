import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminChargingStations() {
  const [stations, setStations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const res = await axios.get('/api/locations');
        setStations(res.data);
      } catch (err) {
        console.error('Error fetching stations:', err);
      }
    };

    fetchStations();
  }, []);

  // Filter stations based on search input
  const filteredStations = stations.filter(station =>
    station.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      <h2>Charging Stations Management</h2>
      
      <input
        type="text"
        placeholder="Search by station name..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{ marginBottom: 'var(--space-4)' }}
      />

      <ul className="charger-list">
        {filteredStations.map(station => (
          <li key={station._id} className="charger-item">
            <div className="charger-name">{station.name}</div>
            <div className="charger-details">
              <strong>Energy Source:</strong> 
              <span className={station.sourceType === 'renewable' ? 'text-success' : 'text-warning'}>
                {station.sourceType === 'renewable' ? '🌱 Renewable' : '⚡ Non-Renewable'}
              </span>
            </div>
          </li>
        ))}
      </ul>

      {filteredStations.length === 0 && (
        <div className="text-center" style={{ padding: 'var(--space-8)' }}>
          <p style={{ color: 'var(--neutral-500)' }}>No stations found matching your search.</p>
        </div>
      )}
    </div>
  );
}
