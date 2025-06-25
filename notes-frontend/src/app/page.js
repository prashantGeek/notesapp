'use client';
import { useState, useEffect } from "react";
import { authAPI } from "./lib/api.js";
import toast from 'react-hot-toast';
import Header from './components/Header';
import LoadingScreen from './components/LoadingScreen';
import UserHeroSection from './components/UserHeroSection';
import ActionCards from './components/ActionCards';
import GuestHeroSection from './components/GuestHeroSection';
import LoginCard from './components/LoginCard';

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // check if user is authenticated
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await authAPI.checkAuth();
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.log("Not logged in");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    window.location.href = authAPI.getGoogleLoginUrl();
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      setUser(null);
      toast.success('Logged out successfully! 👋');
    } catch (error) {
      console.error("Logout failed", error);
      toast.error('Logout failed. Please try again.');
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header user={user} handleLogin={handleLogin} />

      <main className="relative">
        {user ? (
          // User is logged in
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <UserHeroSection user={user} />
              <ActionCards handleLogout={handleLogout} />
            </div>
          </div>
        ) : (
          // User is not logged in
          <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
            <div className="w-full max-w-4xl mx-auto text-center">
              <GuestHeroSection />
              <div className="flex justify-center">
                <LoginCard handleLogin={handleLogin} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}