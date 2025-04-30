import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useTheme } from '../../context/ThemeContext';

const Layout = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen bg-background ${theme}`}>
      <Navbar />
      <main className="flex-grow pb-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;