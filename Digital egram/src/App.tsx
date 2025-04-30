import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// Public Pages
import HomePage from './pages/public/HomePage';
import ServicesPage from './pages/public/ServicesPage';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import UnauthorizedPage from './pages/auth/UnauthorizedPage';

// User Pages
import ProfilePage from './pages/user/ProfilePage';
import ServiceDetailPage from './pages/user/ServiceDetailPage';
import ApplicationsPage from './pages/user/ApplicationsPage';
import ApplicationDetail from './pages/user/ApplicationDetail';

// Staff Pages
import StaffDashboardPage from './pages/staff/StaffDashboardPage';
import StaffApplicationsPage from './pages/staff/StaffApplicationsPage';

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import ManageServicesPage from './pages/admin/ManageServicesPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          
          {/* User Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={['user', 'staff', 'admin']} />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/applications" element={<ApplicationsPage />} />
            <Route path="/applications/:applicationId" element={<ApplicationDetail />} />
          </Route>
          
          {/* Staff Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={['staff', 'admin']} />}>
            <Route path="/staff" element={<StaffDashboardPage />} />
            <Route path="/staff/applications" element={<StaffApplicationsPage />} />
          </Route>
          
          {/* Admin Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/services" element={<ManageServicesPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;