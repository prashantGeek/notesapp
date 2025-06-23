'use client';

export default function SearchAndControls({ 
  searchTerm, 
  setSearchTerm, 
  sortBy, 
  setSortBy, 
  viewMode, 
  setViewMode 
}) {
  return (
    <div className="bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-gray-300 dark:border-gray-500 mb-8">
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border-2 border-gray-500 dark:border-gray-400 rounded-xl leading-5 bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white placeholder-gray-700 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-600 dark:focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 shadow-lg hover:shadow-xl"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border-2 border-gray-500 dark:border-gray-400 rounded-xl bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <option value="updatedAt">Sort by: Recent</option>
            <option value="createdAt">Sort by: Oldest</option>
            <option value="title">Sort by: Title</option>
          </select>

          {/* View Toggle */}
          <div className="flex border-2 border-gray-500 dark:border-gray-400 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-600 shadow-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-3 flex items-center space-x-2 transition-all duration-200 ${
                viewMode === 'grid'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span>Grid</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-3 flex items-center space-x-2 transition-all duration-200 ${
                viewMode === 'list'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              <span>List</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
