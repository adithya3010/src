// App.jsx
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './src/styles/main.css';
import MapComponent from './components/MapComponent';
import AddLocationForm from './components/AddLocationForm';
import LocationPage from './pages/LocationPage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar'; // ✅ Import Navbar
import { AuthProvider, AuthContext } from './context/AuthContext';
import Unauthorized from './pages/Unauthorized'

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}
function AdminRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user && user.role === 'admin' ? children : <Navigate to="/unauthorized" />;
}
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar /> {/* ✅ Always visible on all pages */}
          <main className="main-content">
            <Routes>
              <Route path="/login" element={
                <div className="page-container">
                  <div className="page-header">
                    <h1 className="page-title">Welcome Back</h1>
                    <p className="page-subtitle">Sign in to access your EV charging dashboard</p>
                  </div>
                  <LoginForm />
                </div>
              } />
              <Route path="/register" element={
                <div className="page-container">
                  <div className="page-header">
                    <h1 className="page-title">Join Our Community</h1>
                    <p className="page-subtitle">Create your account to start using our EV charging network</p>
                  </div>
                  <RegisterForm />
                </div>
              } />

              <Route
                path="/dashboard"
                element={
                  <AdminRoute>
                    <div className="dashboard-container">
                      <Dashboard />
                    </div>
                  </AdminRoute>
                }
              />
              <Route path="/unauthorized" element={
                <div className="page-container">
                  <div className="page-header">
                    <h1 className="page-title">Access Denied</h1>
                    <p className="page-subtitle">You don't have permission to view this page</p>
                  </div>
                  <Unauthorized />
                </div>
              } />
              <Route
                path="/"
                element={
                  <div className="page-container">
                    <div className="page-header">
                      <img 
                        src="/WhatsApp Image 2025-07-27 at 16.50.33_0765f904.jpg" 
                        alt="EV Charging Logo" 
                        className="logo animate-bounce"
                      />
                      <h1 className="page-title">Find Your Charging Station</h1>
                      <p className="page-subtitle">Discover sustainable EV charging solutions near you</p>
                    </div>
                    <AddLocationForm />
                    <MapComponent />
                  </div>
                }
              />

              <Route path="/location/:id" element={<LocationPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
