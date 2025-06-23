'use client';
import { useState, useEffect } from 'react';
import { notesAPI, authAPI } from '../lib/api.js';
import toast from 'react-hot-toast';
import DashboardHeader from './components/DashboardHeader';
import DashboardLoadingScreen from './components/DashboardLoadingScreen';
import StatsCards from './components/StatsCards';
import SearchAndControls from './components/SearchAndControls';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('updatedAt');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  useEffect(() => {
    checkAuthAndLoadNotes();
  }, []);

  const checkAuthAndLoadNotes = async () => {
    try {
      const authResponse = await authAPI.checkAuth();
      if (authResponse.data.success) {
        setUser(authResponse.data.user);
        loadNotes();
      } else {
        window.location.href = '/';
      }
    } catch (error) {
      window.location.href = '/';
    } finally {
      setLoading(false);
    }
  };

  const loadNotes = async () => {
    try {
      const response = await notesAPI.getAllNotes();
      setNotes(response.data.notes);
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();
    try {
      await notesAPI.createNote(formData);
      setFormData({ title: '', content: '' });
      setShowCreateForm(false);
      loadNotes();
      toast.success('Note created successfully! 🎉');
    } catch (error) {
      console.error('Error creating note:', error);
      toast.error('Failed to create note. Please try again.');
    }
  };

  const handleUpdateNote = async (e) => {
    e.preventDefault();
    try {
      await notesAPI.updateNote(editingNote.id, formData);
      setEditingNote(null);
      setFormData({ title: '', content: '' });
      loadNotes();
      toast.success('Note updated successfully! ✨');
    } catch (error) {
      console.error('Error updating note:', error);
      toast.error('Failed to update note. Please try again.');
    }
  };

  const handleDeleteNote = async (id) => {
    toast((t) => (
      <div className="flex flex-col space-y-3">
        <p className="font-medium text-gray-900">Delete this note?</p>
        <p className="text-sm text-gray-600">This action cannot be undone.</p>
        <div className="flex space-x-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                await notesAPI.deleteNote(id);
                loadNotes();
                toast.success('Note deleted successfully');
              } catch (error) {
                console.error('Error deleting note:', error);
                toast.error('Failed to delete note. Please try again.');
              }
            }}
            className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600"
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    ), {
      duration: 60000,
      position: 'top-center',
    });
  };

  const startEdit = (note) => {
    setEditingNote(note);
    setFormData({ title: note.title, content: note.content });
    setShowCreateForm(false);
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      toast.success('Logged out successfully! 👋');
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed. Please try again.');
    }
  };

  // Filter and sort notes
  const filteredAndSortedNotes = notes
    .filter(note => 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return new Date(b[sortBy]) - new Date(a[sortBy]);
    });

  if (loading) {
    return <DashboardLoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <DashboardHeader user={user} handleLogout={handleLogout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsCards notes={notes} />
        
        <SearchAndControls 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {/* New Note Button - Separate from search controls */}
        <div className="mb-6">
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>New Note</span>
          </button>
        </div>

        <NoteForm 
          showCreateForm={showCreateForm}
          editingNote={editingNote}
          formData={formData}
          setFormData={setFormData}
          handleCreateNote={handleCreateNote}
          handleUpdateNote={handleUpdateNote}
          setShowCreateForm={setShowCreateForm}
          setEditingNote={setEditingNote}
        />

        <NotesList 
          filteredNotes={filteredAndSortedNotes}
          viewMode={viewMode}
          startEdit={startEdit}
          handleDeleteNote={handleDeleteNote}
          setShowCreateForm={setShowCreateForm}
        />
      </div>
    </div>
  );
}
