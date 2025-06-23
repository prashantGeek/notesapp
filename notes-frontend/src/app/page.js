'use client';
import { useState, useEffect } from "react";
import { authAPI } from "./lib/api.js";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // check if user is authenticated
  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line
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
      alert("Logged out successfully");
    } catch (error) {
      console.error("Logout failed", error);
      alert("Logout failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          📝 My Notes App
        </h1>

        {user ? (
          // User is logged in
          <div className="text-center">
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <img
                src={user.profilePicture}
                alt="Profile"
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
              <h2 className="text-2xl font-semibold">Welcome, {user.name}!</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>

            <div className="space-x-4">
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
              >
                Go to My Notes
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          // User is not logged in
          <div className="text-center">
            <p className="text-xl mb-8">Sign in to manage your notes</p>
            <button
              onClick={handleLogin}
              className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-600"
            >
              🚀 Login with Google
            </button>
          </div>
        )}
      </div>
    </div>
  );
}