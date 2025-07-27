import React, { useState } from 'react';
import axios from 'axios';

const AddLocationForm = () => {
  const [formData, setFormData] = useState({ name: '', latitude: '', longitude: '', sourceType: ''});

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
   await axios.post('http://localhost:5000/api/locations', {
  name: formData.name,
  latitude: parseFloat(formData.latitude),
  longitude: parseFloat(formData.longitude),
  sourceType: formData.sourceType
});

    alert("Location added!");
    window.location.reload(); // refresh the page to reload pins
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="animate-slide-in">
        <h3>Add New Charging Station</h3>
        <div className="form-group">
          <label className="form-label">Station Name</label>
          <input 
            name="name" 
            placeholder="Enter station name" 
            onChange={handleChange} 
            required 
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <div className="form-group">
            <label className="form-label">Latitude</label>
            <input 
              name="latitude" 
              placeholder="Enter latitude" 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Longitude</label>
            <input 
              name="longitude" 
              placeholder="Enter longitude" 
              onChange={handleChange} 
              required 
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Energy Source Type</label>
          <select name="sourceType" onChange={handleChange} required>
            <option value="">Select energy source</option>
            <option value="renewable">🌱 Renewable Energy</option>
            <option value="non-renewable">⚡ Non-Renewable Energy</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          Add Charging Station
        </button>
      </form>
    </div>
  );
};

export default AddLocationForm;