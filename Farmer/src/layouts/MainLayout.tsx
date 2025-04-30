import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Sidebar from '../components/common/Sidebar';
import { useAuth } from '../context/AuthContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { currentUser, userRole } = useAuth();

  // Check if the current route is a dashboard route
  const isDashboardRoute = 
    currentUser && 
    (location.pathname.startsWith('/farmer/') || 
     location.pathname.startsWith('/admin/'));

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex flex-1">
        {isDashboardRoute && (
          <div className="hidden md:block w-64 flex-shrink-0">
            <Sidebar userRole={userRole || ''} />
          </div>
        )}
        
        <main className={`flex-1 ${isDashboardRoute ? 'p-4 md:p-8' : ''}`}>
          {children}
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default MainLayout;