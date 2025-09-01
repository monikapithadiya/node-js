import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, FileText } from 'lucide-react';
import axios from 'axios';
import NoteModal from './NoteModal';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    const filtered = notes.filter(note =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNotes(filtered);
  }, [notes, searchTerm]);

  const fetchNotes = async () => {
    try {
      // Since your backend doesn't have a get all notes endpoint, 
      // we'll simulate it with an empty array for now
      setNotes([]);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch notes');
      setLoading(false);
    }
  };

  const handleCreateNote = () => {
    setEditingNote(null);
    setShowModal(true);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setShowModal(true);
  };

  const handleSaveNote = async (noteData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/notes/create', noteData, {
        withCredentials: true
      });
      
      if (response.status === 201) {
        // Add the new note to the local state
        const newNote = {
          _id: Date.now().toString(), // Temporary ID
          ...noteData,
          createdAt: new Date().toISOString()
          
        };
        setNotes([newNote, ...notes]);
        setShowModal(false);
        setError('');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save note');
    }
  };

  const handleDeleteNote = (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter(note => note._id !== noteId));
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading notes...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>My Notes</h1>
        <button onClick={handleCreateNote} className="create-button">
          <Plus size={20} />
          <span>New Note</span>
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="search-container">
        <div className="search-wrapper">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="notes-grid">
        {filteredNotes.length === 0 ? (
          <div className="empty-state">
            <FileText size={64} className="empty-icon" />
            <h3>No notes found</h3>
            <p>
              {searchTerm 
                ? 'Try adjusting your search terms' 
                : 'Create your first note to get started'
              }
            </p>
            {!searchTerm && (
              <button onClick={handleCreateNote} className="create-button">
                <Plus size={20} />
                <span>Create Note</span>
              </button>
            )}
          </div>
        ) : (
          filteredNotes.map((note) => (
            <div key={note._id} className="note-card">
              <div className="note-image">
                <img src={note.notesImage} alt="Note" />
              </div>
              <div className="note-content">
                <h3 className="note-title">{note.title}</h3>
                <p className="note-text">{note.content}</p>
                <div className="note-date">
                  {new Date(note.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="note-actions">
                <button
                  onClick={() => handleEditNote(note)}
                  className="action-button edit-button"
                  title="Edit note"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteNote(note._id)}
                  className="action-button delete-button"
                  title="Delete note"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <NoteModal
          note={editingNote}
          onSave={handleSaveNote}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;