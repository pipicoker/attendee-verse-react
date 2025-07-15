
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUser } from '@/contexts/UserContext';
import { toast } from '@/components/ui/use-toast';
import { GoogleLogin } from '@react-oauth/google';

import axios from '@/lib/axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    toast({
      title: "Error",
      description: "Passwords do not match.",
      variant: "destructive",
    });
    return;
  }

  setLoading(true);

  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/signup`, {
      name: formData.name,
      email: formData.email,
      password: formData.password
    });

   toast({
  title: "Verify your email",
  description: "Check your email to verify your account before logging in.",
});
navigate('/verify-email-sent'); 


  } catch (error) {
    toast({
      title: "Error",
      description: error.response?.data?.error || "Signup failed.",
      variant: "destructive",
    });
  } finally {
    setLoading(false);
  }
};


  const handleGoogleSignup = () => {
    // Mock Google signup - replace with actual Google OAuth
    toast({
      title: "Google Sign Up",
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
          <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-gray-600">Join EventHub today</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="mt-1"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="mt-1"
                placeholder="Enter your email"
              />
            </div>
{/* 
            <div>
              <Label htmlFor="role">Account type</Label>
              <Select
                value={formData.role}
                onValueChange={(value: 'customer' | 'agent') => 
                  setFormData({ ...formData, role: value })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="agent">Support Agent</SelectItem>
                </SelectContent>
              </Select>
            </div> */}

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  placeholder="Create a password"
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

            <div>
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <div className="relative mt-1">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating account...' : 'Create account'}
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
                axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/google`, {
                  credential: credentialResponse.credential
                })
                .then((res) => {
                  // ✅ Save the token
                  const token = res.data.token;
                  localStorage.setItem('token', token);

                  // ✅ Attach token to axios for future requests
                  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                  toast({ title: 'Login Successful', description: `Welcome ${res.data.user.name}` });
                  const user = {
                    id: res.data.user._id,
                    name: res.data.user.name,
                    email: res.data.user.email,
                    role: res.data.user.role,
                    avatar: res.data.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${res.data.user.email}`,
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
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
