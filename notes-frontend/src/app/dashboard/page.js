'use client';
import { useState, useEffect } from 'react';
import { notesAPI, authAPI } from '../lib/api.js';

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [formData, setFormData] = useState({ title: '', content: '' });

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
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const handleUpdateNote = async (e) => {
    e.preventDefault();
    try {
      await notesAPI.updateNote(editingNote.id, formData);
      setEditingNote(null);
      setFormData({ title: '', content: '' });
      loadNotes();
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleDeleteNote = async (id) => {
    if (confirm('Are you sure you want to delete this note?')) {
      try {
        await notesAPI.deleteNote(id);
        loadNotes();
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  const startEdit = (note) => {
    setEditingNote(note);
    setFormData({ title: note.title, content: note.content });
    setShowCreateForm(false);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-xl">Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Notes</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {user?.name}</span>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Home
            </button>
          </div>
        </div>

        {/* Create/Edit Form */}
        {(showCreateForm || editingNote) && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingNote ? 'Edit Note' : 'Create New Note'}
            </h2>
            <form onSubmit={editingNote ? handleUpdateNote : handleCreateNote}>
              <input
                type="text"
                placeholder="Note title..."
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full p-3 border rounded-lg mb-4"
                required
              />
              <textarea
                placeholder="Note content..."
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className="w-full p-3 border rounded-lg mb-4"
                rows="6"
              />
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                >
                  {editingNote ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false);
                    setEditingNote(null);
                    setFormData({ title: '', content: '' });
                  }}
                  className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Create Button */}
        {!showCreateForm && !editingNote && (
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-green-500 text-white px-6 py-3 rounded-lg mb-6 hover:bg-green-600"
          >
            + Create New Note
          </button>
        )}

        {/* Notes Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <div key={note.id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-2">{note.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{note.content}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">
                  {new Date(note.updatedAt).toLocaleDateString()}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => startEdit(note)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {notes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No notes yet. Create your first note!</p>
          </div>
        )}
      </div>
    </div>
  );
}