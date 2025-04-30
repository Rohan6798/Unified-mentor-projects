import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

interface AdminAuthProps {
  isLogin: boolean;
}

const AdminAuth = ({ isLogin }: AdminAuthProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [errors, setErrors] = useState<{email?: string; password?: string; adminCode?: string}>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, register } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: {email?: string; password?: string; adminCode?: string} = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!isLogin && !adminCode) {
      newErrors.adminCode = 'Admin code is required';
    } else if (!isLogin && adminCode !== 'admin123') { // Simple admin code for demo
      newErrors.adminCode = 'Invalid admin code';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      if (isLogin) {
        await login(email, password, 'admin');
        showNotification('success', 'Admin logged in', 'Welcome to the admin dashboard.');
      } else {
        await register(email, password, 'admin');
        showNotification('success', 'Admin account created', 'Your admin account has been successfully created.');
      }
      navigate('/admin/logs');
    } catch (error) {
      const errorMessage = isLogin 
        ? 'Failed to log in. Please check your credentials.' 
        : 'Failed to create admin account. Please try again.';
      showNotification('error', 'Authentication error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container flex justify-center items-center min-h-[calc(100vh-16rem)]">
      <Card className="w-full max-w-md fade-in">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <Shield className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl">
            {isLogin ? 'Admin Login' : 'Create Admin Account'}
          </CardTitle>
          <CardDescription>
            {isLogin
              ? 'Enter your admin credentials to access the dashboard'
              : 'Enter your details to create a new admin account'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                {isLogin && (
                  <Link
                    to="/admin/reset-password"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <Input
                id="password"
                type="password"
                placeholder={isLogin ? '••••••••' : 'Create a password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
              />
            </div>
            
            {!isLogin && (
              <div className="space-y-2">
                <label htmlFor="adminCode" className="text-sm font-medium">
                  Admin Code
                </label>
                <Input
                  id="adminCode"
                  type="text"
                  placeholder="Enter admin code"
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  error={errors.adminCode}
                />
                <p className="text-sm text-muted-foreground">
                  You need a valid admin code to create an admin account
                </p>
              </div>
            )}
            
            <Button type="submit" className="w-full" isLoading={isLoading}>
              {isLogin ? 'Admin Sign in' : 'Create admin account'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            {isLogin ? "Don't have an admin account? " : "Already have an admin account? "}
            <Link
              to={isLogin ? '/admin/register' : '/admin/login'}
              className="text-primary hover:underline"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </Link>
          </div>
          <div className="text-sm text-center">
            <Link to="/user/login" className="flex items-center justify-center space-x-1 text-muted-foreground hover:text-primary transition">
              <User className="h-4 w-4" />
              <span>User login</span>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminAuth;