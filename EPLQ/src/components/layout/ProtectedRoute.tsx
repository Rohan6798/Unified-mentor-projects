import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  allowed: boolean;
  redirectTo: string;
}

const ProtectedRoute = ({ allowed, redirectTo }: ProtectedRouteProps) => {
  const { loading } = useAuth();
  
  // Show nothing while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // If user is allowed, render the outlet (child routes)
  if (allowed) {
    return <Outlet />;
  }
  
  // Otherwise redirect to the specified route
  return <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;