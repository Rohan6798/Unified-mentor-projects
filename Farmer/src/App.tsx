import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';

// Layouts
import MainLayout from './layouts/MainLayout';

// Public Pages
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Farmer Pages
import FarmerDashboard from './pages/farmer/FarmerDashboard';
import SchemesList from './pages/farmer/SchemesList';
import SchemeDetails from './pages/farmer/SchemeDetails';
import MyApplications from './pages/farmer/MyApplications';
import CropInfo from './pages/farmer/CropInfo';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageSchemes from './pages/admin/ManageSchemes';
import ManageCrops from './pages/admin/ManageCrops';
import ApplicationReview from './pages/admin/ApplicationReview';

// Protected Route Component
const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  allowedRoles: string[];
}> = ({ children, allowedRoles }) => {
  const { currentUser, userRole, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!currentUser || !allowedRoles.includes(userRole || '')) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
        <Route path="/about" element={<MainLayout><AboutPage /></MainLayout>} />
        <Route path="/login" element={<MainLayout><LoginPage /></MainLayout>} />
        <Route path="/register" element={<MainLayout><RegisterPage /></MainLayout>} />

        {/* Farmer Routes */}
        <Route 
          path="/farmer/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['farmer']}>
              <MainLayout><FarmerDashboard /></MainLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/farmer/schemes" 
          element={
            <ProtectedRoute allowedRoles={['farmer']}>
              <MainLayout><SchemesList /></MainLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/farmer/schemes/:id" 
          element={
            <ProtectedRoute allowedRoles={['farmer']}>
              <MainLayout><SchemeDetails /></MainLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/farmer/applications" 
          element={
            <ProtectedRoute allowedRoles={['farmer']}>
              <MainLayout><MyApplications /></MainLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/farmer/crops" 
          element={
            <ProtectedRoute allowedRoles={['farmer']}>
              <MainLayout><CropInfo /></MainLayout>
            </ProtectedRoute>
          } 
        />

        {/* Admin Routes */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <MainLayout><AdminDashboard /></MainLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/schemes" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <MainLayout><ManageSchemes /></MainLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/crops" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <MainLayout><ManageCrops /></MainLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/applications" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <MainLayout><ApplicationReview /></MainLayout>
            </ProtectedRoute>
          } 
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="top-right" />
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;