'use client';

export default function GuestHeroSection() {
  return (
    <div className="mb-16">
      <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl mb-10 shadow-2xl">
        <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8">
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to NotesApp
        </span>
      </h1>
      <div className="max-w-2xl mx-auto space-y-4">
        <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
          Your secure, cloud-synced digital notebook
        </p>
        <p className="text-lg text-gray-500 dark:text-gray-400">
          Sign in with Google to get started instantly
        </p>
      </div>
    </div>
  );
}
