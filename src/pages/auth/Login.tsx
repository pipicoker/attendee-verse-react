
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser } from '@/contexts/UserContext';
import { toast } from '@/components/ui/use-toast';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    // Use the actual data returned from backend
    const user = {
      id: data.user._id,
      name: data.user.name,
      email: data.user.email,
      role: data.user.role, 
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.user.email}`,
    };

    login(user);

    toast({
      title: "Welcome back!",
      description: "You have successfully signed in.",
    });

    navigate('/');

    //store token in localStorage if provided
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
  } catch (error) {
    toast({
      title: "Error",
      description: error.message || "Invalid email or password.",
      variant: "destructive",
    });
  } finally {
    setLoading(false);
  }
};


  const handleGoogleLogin = () => {
    // Mock Google login - replace with actual Google OAuth
    toast({
      title: "Google Sign In",
      description: "Google authentication would be implemented here.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
            <Calendar className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">EventHub</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

           <div className="w-full mt-4 flex justify-center">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                axios.post('http://localhost:8000/api/auth/google', {
                  credential: credentialResponse.credential
                })
                .then((res) => {
                  toast({ title: 'Login Successful', description: `Welcome ${res.data.user.name}` });
                  const user = {
                    id: res.data.user._id,
                    name: res.data.user.name,
                    email: res.data.user.email,
                    role: res.data.user.role,
                    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${res.data.user.email}`,
                  };
                  login(user);
                  navigate('/');
                })
                .catch((err) => {
                  toast({ title: 'Login Failed', description: err.response?.data?.error, variant: 'destructive' });
                });
              }}
              onError={() => {
                toast({ title: "Google Sign-In Failed", variant: "destructive" });
              }}
            />

          </div>

          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
