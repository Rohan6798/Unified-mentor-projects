import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

interface UserAuthProps {
  isLogin: boolean;
}

const UserAuth = ({ isLogin }: UserAuthProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, register } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: {email?: string; password?: string} = {};
    
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      if (isLogin) {
        await login(email, password, 'user');
        showNotification('success', 'Welcome back!', 'You have successfully logged in.');
      } else {
        await register(email, password, 'user');
        showNotification('success', 'Account created', 'Your account has been successfully created.');
      }
      navigate('/user/upload');
    } catch (error) {
      const errorMessage = isLogin 
        ? 'Failed to log in. Please check your credentials.' 
        : 'Failed to create account. Please try again.';
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
            <User className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl">
            {isLogin ? 'User Login' : 'Create User Account'}
          </CardTitle>
          <CardDescription>
            {isLogin
              ? 'Enter your credentials to access your account'
              : 'Enter your details to create a new user account'}
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
                placeholder="your.email@example.com"
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
                    to="/user/reset-password"
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
              {!isLogin && (
                <p className="text-sm text-muted-foreground">
                  Password must be at least 6 characters long
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" isLoading={isLoading}>
              {isLogin ? 'Sign in' : 'Create account'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <Link
              to={isLogin ? '/user/register' : '/user/login'}
              className="text-primary hover:underline"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </Link>
          </div>
          <div className="text-sm text-center">
            <Link to="/admin/login" className="flex items-center justify-center space-x-1 text-muted-foreground hover:text-primary transition">
              <Shield className="h-4 w-4" />
              <span>Admin login</span>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserAuth;