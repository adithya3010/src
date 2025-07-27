import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function LoginForm({ onSuccess }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Get the page the user came from (used for redirection)
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password); // 👈 login returns user object

      if (onSuccess) {
        onSuccess(user); // ✅ Trigger modal callback if present
      } else {
        // ✅ Role-based navigation for full-page login
        if (user.role === 'admin') {
          navigate('/dashboard');
        } else {
          navigate(from);
        }
      }
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="animate-fade-in">
        <h2>Sign In to Your Account</h2>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          Sign In
        </button>
      </form>
    </div>
  );
}
