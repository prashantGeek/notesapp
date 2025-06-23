'use client';

export default function UserHeroSection({ user }) {
  return (
    <div className="mb-12">
      <div className="relative inline-block">
        <img
          src={user.profilePicture}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-6 ring-4 ring-white shadow-xl"
        />
        <div className="absolute bottom-1 right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        Welcome back, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{user.name}!</span>
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">{user.email}</p>
      <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
        Connected & Ready
      </div>
    </div>
  );
}
