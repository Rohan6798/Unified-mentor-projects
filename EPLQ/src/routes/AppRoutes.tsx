import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import LandingPage from '../pages/LandingPage';
import UserAuth from '../pages/auth/UserAuth';
import AdminAuth from '../pages/auth/AdminAuth';
import UploadPage from '../pages/user/UploadPage';
import SearchPage from '../pages/user/SearchPage';
import LogsDashboard from '../pages/admin/LogsDashboard';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import { useAuth } from '../context/AuthContext';

const AppRoutes = () => {
  const { isAuthenticated, isAdmin, isUser } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route index element={<LandingPage />} />
        <Route path="user/login" element={<UserAuth isLogin />} />
        <Route path="user/register" element={<UserAuth isLogin={false} />} />
        <Route path="admin/login" element={<AdminAuth isLogin />} />
        <Route path="admin/register" element={<AdminAuth isLogin={false} />} />
        
        {/* Protected user routes */}
        <Route element={<ProtectedRoute allowed={isUser} redirectTo="/user/login" />}>
          <Route path="user/search" element={<SearchPage />} />
        </Route>
        
        {/* Protected admin routes */}
        <Route element={<ProtectedRoute allowed={isAdmin} redirectTo="/admin/login" />}>
          <Route path="admin/upload" element={<UploadPage />} />
          <Route path="admin/logs" element={<LogsDashboard />} />
        </Route>
        
        {/* Redirects */}
        <Route 
          path="dashboard" 
          element={
            isAuthenticated ? (
              isAdmin ? <Navigate to="/admin/logs" /> : <Navigate to="/user/search" />
            ) : (
              <Navigate to="/" />
            )
          } 
        />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;