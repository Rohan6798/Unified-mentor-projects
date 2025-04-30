import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth, UserRole } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  allowedRoles, 
  redirectPath = '/login'
}) => {
  const { currentUser, userRole } = useAuth();

  if (!currentUser) {
    console.log('Access denied: Not authenticated');
    return <Navigate to={redirectPath} replace />;
  }

  if (!userRole || !allowedRoles.includes(userRole)) {
    console.log('Access denied: Insufficient permission for role:', userRole);
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;