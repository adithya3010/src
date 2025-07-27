import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import LoginForm from './LoginForm';
import Modal from './Modal';
import { AuthContext } from '../context/AuthContext';

export default function ChargerList({ chargers }) {
  const [showFormId, setShowFormId] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [formData, setFormData] = useState({
    batteryCapacity: '',
    currentCharge: '',
    targetCharge: '',
    chargingPower: '',
  });

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const updateCountdowns = () => {
      const now = new Date().getTime();
      document.querySelectorAll('.remaining-countdown').forEach(span => {
        const eta = new Date(span.dataset.eta).getTime();
        const chargerId = span.dataset.chargerId;
        const diff = eta - now;

        if (diff <= 0) {
          span.textContent = "Available now";
          autoPlugOut(chargerId);
        } else {
          const mins = Math.floor(diff / 60000);
          const secs = Math.floor((diff % 60000) / 1000);
          span.textContent = `Remaining: ${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }
      });
    };

    const autoPlugOut = async (chargerId) => {
      try {
        await axios.post(`/api/chargers/${chargerId}/plug-out`);
        window.location.reload();
      } catch (err) {
        console.error('Auto plug out failed', err);
      }
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePlugIn = async (e, chargerId) => {
    e.preventDefault();
    try {
      await axios.post(`/api/chargers/${chargerId}/plug-in`, formData, { withCredentials: true });
      window.location.reload();
    } catch (err) {
      console.error("Plug in failed:", err);
    }
  };

  const handlePlugOut = async (chargerId) => {
    try {
      await axios.post(`/api/chargers/${chargerId}/plug-out`);
      window.location.reload();
    } catch (err) {
      console.error("Plug out failed:", err);
    }
  };

  if (chargers.length === 0) return <p>No chargers yet.</p>;

  return (
    <>
      <ul className="charger-list">
        {chargers.map(charger => (
          <li key={charger._id} className="charger-item">
            <div className="charger-name">{charger.name}</div>
            <div className="charger-details">
              <strong>Type:</strong> {charger.type} | <strong>Power:</strong> {charger.power} kW | 
              <strong>Status:</strong> <span className={`status-${charger.status.replace(' ', '-')}`}>{charger.status}</span>
            </div>

            {charger.status === 'plugged in' && charger.chargingSession ? (
              <div className="charger-details">
                <strong>Charging Time:</strong> {charger.chargingSession.chargingTime} minutes<br />
                <strong>ETA:</strong> {new Date(charger.chargingSession.eta).toLocaleString()}<br />
                <span
                  className="remaining-countdown"
                  data-eta={new Date(charger.chargingSession.eta).toISOString()}
                  data-charger-id={charger._id}
                >
                  Remaining: ...
                </span>
                <div className="charger-actions">
                  <button onClick={() => handlePlugOut(charger._id)} className="btn btn-secondary">
                    🔌 Plug Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="charger-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    if (!user) {
                      alert("Please log in to plug in");
                      setShowLogin(true); // ✅ Corrected state variable
                    } else {
                      setShowFormId(charger._id);
                    }
                  }}
                >
                  🔌 Plug In
                </button>

                {showFormId === charger._id && (
                  <form onSubmit={(e) => handlePlugIn(e, charger._id)} style={{ marginTop: 'var(--space-4)' }}>
                    <input
                      type="number"
                      name="batteryCapacity"
                      placeholder="Battery Capacity (kWh)"
                      value={formData.batteryCapacity}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="number"
                      name="currentCharge"
                      placeholder="Current Charge (%)"
                      value={formData.currentCharge}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="number"
                      name="targetCharge"
                      placeholder="Target Charge (%)"
                      value={formData.targetCharge}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="number"
                      name="chargingPower"
                      placeholder="Charging Power (kW)"
                      value={formData.chargingPower}
                      onChange={handleInputChange}
                      required
                    />
                    <button type="submit" className="btn btn-primary">Start Charging</button>
                  </form>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* ✅ Login Modal */}
      {showLogin && (
        <Modal onClose={() => setShowLogin(false)}>
          <LoginForm onSuccess={() => setShowLogin(false)} />
        </Modal>
      )}
    </>
  );
}
