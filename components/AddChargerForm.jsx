// components/AddChargerForm.jsx
import axios from 'axios';

export default function AddChargerForm({ locationId }) {
  const handleAddCharger = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newCharger = {
      name: form.name.value,
      power: form.power.value,
      type: form.type.value,
      status: form.status.value,
    };
    await axios.post(`/api/chargers/${locationId}`, newCharger ,{ withCredentials: true});
    window.location.reload();
  };

  return (
    <form onSubmit={handleAddCharger} className="animate-slide-in">
      <h3>Add New Charger</h3>
      <div className="form-group">
        <label className="form-label">Charger Name</label>
        <input name="name" placeholder="e.g. Fast Charger 1" required />
      </div>
      <div className="form-group">
        <label className="form-label">Power (kW)</label>
        <input name="power" type="number" placeholder="Enter power in kW" required />
      </div>

      <div className="form-group">
        <label className="form-label">Charger Type</label>
        <select name="type" required>
          <option value="">Select charger type</option>
          <option value="AC">AC Charger</option>
          <option value="DC">DC Fast Charger</option>
          <option value="Type2">Type 2 Connector</option>
          <option value="CCS">CCS Connector</option>
          <option value="CHAdeMO">CHAdeMO Connector</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Initial Status</label>
        <select name="status">
          <option value="available">✅ Available</option>
          <option value="plugged in">🔌 Plugged In</option>
          <option value="faulty">⚠️ Faulty</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
        Add Charger
      </button>
    </form>
  );
}
