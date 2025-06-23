'use client';

export default function NoteForm({ 
  showCreateForm, 
  editingNote, 
  formData, 
  setFormData, 
  handleCreateNote, 
  handleUpdateNote, 
  setShowCreateForm, 
  setEditingNote 
}) {
  if (!showCreateForm && !editingNote) return null;

  const handleCancel = () => {
    setShowCreateForm(false);
    setEditingNote(null);
    setFormData({ title: '', content: '' });
  };

  return (
    <div className="bg-gray-100/90 dark:bg-gray-700/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-2 border-gray-300 dark:border-gray-500 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={editingNote ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" : "M12 6v6m0 0v6m0-6h6m-6 0H6"} />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {editingNote ? 'Edit Note' : 'Create New Note'}
          </h2>
        </div>
      </div>
      
      <form onSubmit={editingNote ? handleUpdateNote : handleCreateNote} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
          <input
            type="text"
            placeholder="Enter your note title..."
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full px-4 py-3 border-2 border-gray-400 dark:border-gray-500 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 text-lg font-medium bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 shadow-md"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content</label>
          <textarea
            placeholder="Write your thoughts here..."
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            className="w-full px-4 py-3 border-2 border-gray-400 dark:border-gray-500 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 resize-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 shadow-md"
            rows="8"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={editingNote ? "M5 13l4 4L19 7" : "M12 6v6m0 0v6m0-6h6m-6 0H6"} />
            </svg>
            <span>{editingNote ? 'Update Note' : 'Create Note'}</span>
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 sm:flex-none px-6 py-3 border-2 border-gray-400 dark:border-gray-500 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Cancel</span>
          </button>
        </div>
      </form>
    </div>
  );
}
