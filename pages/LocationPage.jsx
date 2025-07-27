import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import StatusSummary from '../components/StatusSummary';
import GoogleMap from '../components/GoogleMap';
import ChargerList from '../components/ChargerList';
import AddChargerForm from '../components/AddChargerForm';


export default function LocationPage() {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [chargers, setChargers] = useState([]);
  const [statusCounts, setStatusCounts] = useState({
    available: 0,
    'plugged in': 0,
    faulty: 0,
  });

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await axios.get(`/api/locations/${id}`);
        setLocation(res.data.location);
        setChargers(res.data.chargers);
      } catch (err) {
        console.error('Failed to fetch location', err);
      }
    };
    fetchLocation();
  }, [id]);

  useEffect(() => {
    const counts = {
      available: 0,
      'plugged in': 0,
      faulty: 0,
    };

    chargers.forEach((charger) => {
      const status = charger.status.toLowerCase();
      if (counts.hasOwnProperty(status)) {
        counts[status]++;
      }
    });

    setStatusCounts(counts);
  }, [chargers]);

  if (!location) return <div>Loading...</div>;

  return (
    <div className="location-container animate-fade-in">
      <div className="location-header">
        <h1>{location.name}</h1>
        <p className="page-subtitle">Charging station details and availability</p>
      </div>

      <div className="location-content">
        <div className="location-info">
          <StatusSummary statusCounts={statusCounts} />
          <h2>Available Chargers</h2>
          <ChargerList chargers={chargers} />
        </div>
        <div className="location-map">
          <GoogleMap latitude={location.latitude} longitude={location.longitude} />
        </div>
      </div>

      <div className="card">
        <AddChargerForm locationId={id} />
      </div>
    </div>
  );
}
