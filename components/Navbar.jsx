// src/components/Navbar.jsx
import axios from 'axios';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
  await axios.post('/api/auth/logout', {}, { withCredentials: true });
  logout();           // properly clears context
  navigate('/login');
};


  return (
    <nav>
      <div className="nav-brand">
        <img 
          src="/WhatsApp Image 2025-07-27 at 16.50.33_0765f904.jpg" 
          alt="EV Charging Logo" 
          className="logo"
        />
        <Link to="/">EcoCharge Network</Link>
      </div>
      <div className="nav-links">
        {user ? (
          <>
            <span style={{ marginRight: '1rem', color: 'var(--primary-green)', fontWeight: '600' }}>
              Welcome, {user.email}
            </span>
            {user.role === 'admin' && (
              <Link to="/dashboard">Dashboard</Link>
            )}
            <button onClick={handleLogout} className="btn btn-outline">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
