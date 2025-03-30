import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const { login, signUp, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isResetting) {
        await resetPassword(email);
        toast.success('Password reset email sent');
        setIsResetting(false);
        return;
      }

      if (isSignUp) {
        await signUp(email, password, fullName);
        toast.success('Account created! Please check your email for verification.');
        setIsSignUp(false);
      } else {
        const success = await login(email, password);
        if (success) {
          navigate('/admin');
        }
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Lock className="text-blue-500" size={48} />
        </div>
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          {isResetting ? 'Reset Password' : isSignUp ? 'Create Account' : 'Admin Login'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 text-gray-400" size={20} />
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                  required={isSignUp}
                />
              </div>
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 text-gray-400" size={20} />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          {!isResetting && (
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 text-gray-400" size={20} />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required={!isResetting}
                  minLength={8}
                />
              </div>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isResetting ? 'Send Reset Link' : isSignUp ? 'Create Account' : 'Login'}
          </button>
        </form>

        <div className="mt-4 flex flex-col items-center gap-2 text-sm text-gray-400">
          {!isResetting && (
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setIsResetting(false);
              }}
              className="hover:text-white transition-colors"
            >
              {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign up"}
            </button>
          )}
          <button
            onClick={() => {
              setIsResetting(!isResetting);
              setIsSignUp(false);
            }}
            className="hover:text-white transition-colors"
          >
            {isResetting ? 'Back to login' : 'Forgot password?'}
          </button>
        </div>
      </div>
    </div>
  );
}