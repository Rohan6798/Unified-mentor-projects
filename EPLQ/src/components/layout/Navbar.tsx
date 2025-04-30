import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useNotification } from '../../context/NotificationContext';
import { Button } from '../ui/Button';
import { Menu, X, Shield, Moon, Sun, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, isAdmin, isUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = async () => {
    try {
      await logout();
      showNotification('success', 'Logged out', 'You have been successfully logged out');
      navigate('/');
    } catch (error) {
      showNotification('error', 'Logout failed', 'Failed to log out. Please try again.');
    }
  };

  return (
    <nav className="bg-primary/90 backdrop-blur-sm text-primary-foreground sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
              <Shield className="h-8 w-8" />
              <span className="font-bold text-xl">EPLQ</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {currentUser ? (
              <>
                {isUser && (
                  <Link to="/user/search" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-foreground/10 transition">
                    Search POIs
                  </Link>
                )}
                
                {isAdmin && (
                  <>
                    <Link to="/admin/upload" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-foreground/10 transition">
                      Upload Data
                    </Link>
                    <Link to="/admin/logs" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-foreground/10 transition">
                      Logs Dashboard
                    </Link>
                  </>
                )}
                
                <div className="flex items-center ml-4 space-x-2">
                  <button 
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-primary-foreground/10 transition"
                    aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                  >
                    {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={handleLogout}
                    className="flex items-center space-x-1"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-foreground/10 transition">
                  Home
                </Link>
                <div className="flex items-center space-x-2 ml-4">
                  <Link to="/user/login">
                    <Button variant="secondary" size="sm" className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>User Login</span>
                    </Button>
                  </Link>
                  <Link to="/admin/login">
                    <Button variant="outline" size="sm" className="flex items-center space-x-1 bg-transparent border-primary-foreground/30 text-primary-foreground">
                      <Shield className="h-4 w-4" />
                      <span>Admin</span>
                    </Button>
                  </Link>
                  <button 
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-primary-foreground/10 transition"
                    aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                  >
                    {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-primary-foreground/10 transition mr-2"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary-foreground hover:bg-primary-foreground/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-primary shadow-lg">
          {currentUser ? (
            <>
              {isUser && (
                <Link
                  to="/user/search"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-foreground/10 transition"
                  onClick={closeMenu}
                >
                  Search POIs
                </Link>
              )}
              
              {isAdmin && (
                <>
                  <Link
                    to="/admin/upload"
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-foreground/10 transition"
                    onClick={closeMenu}
                  >
                    Upload Data
                  </Link>
                  <Link
                    to="/admin/logs"
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-foreground/10 transition"
                    onClick={closeMenu}
                  >
                    Logs Dashboard
                  </Link>
                </>
              )}
              
              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-primary-foreground/10 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-foreground/10 transition"
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                to="/user/login"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-foreground/10 transition"
                onClick={closeMenu}
              >
                User Login
              </Link>
              <Link
                to="/admin/login"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-foreground/10 transition"
                onClick={closeMenu}
              >
                Admin Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;