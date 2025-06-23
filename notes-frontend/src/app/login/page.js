'use client';
import { useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function LoginPage() {
  const { theme } = useTheme();
  
  useEffect(() => {
    // Redirect to home page, which handles login
    window.location.href = '/';
  }, []);

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      theme === 'light' 
        ? 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50' 
        : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    }`}>
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-xl animate-pulse">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <p className={`text-xl ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
          Redirecting to login...
        </p>
      </div>
    </div>
  );
}