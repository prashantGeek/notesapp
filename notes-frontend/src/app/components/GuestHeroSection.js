'use client';

export default function GuestHeroSection() {
  return (
    <div className="mb-16">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-8 shadow-2xl">
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
        Your Digital
        <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Notebook
        </span>
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
        Capture thoughts, organize ideas, and never lose track of what matters. 
        Your personal space for creativity and productivity.
      </p>
    </div>
  );
}
