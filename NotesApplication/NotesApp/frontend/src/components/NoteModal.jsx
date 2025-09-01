import { useState, useEffect } from 'react';
import { X, Save, Image } from 'lucide-react';

const NoteModal = ({ note, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    notesImage: 'https://img.freepik.com/premium-vector/notes-icon-logo-vector-design-template_827767-4987.jpg'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title || '',
        content: note.content || '',
        notesImage: note.notesImage || 'https://img.freepik.com/premium-vector/notes-icon-logo-vector-design-template_827767-4987.jpg'
      });
    }
  }, [note]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      return;
    }

    setLoading(true);
    await onSave(formData);
    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{note ? 'Edit Note' : 'Create New Note'}</h2>
          <button onClick={onClose} className="close-button">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter note title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your note content here..."
              rows="8"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="notesImage">Image URL (Optional)</label>
            <div className="input-wrapper">
              <Image className="input-icon" />
              <input
                type="url"
                id="notesImage"
                name="notesImage"
                value={formData.notesImage}
                onChange={handleChange}
                placeholder="Enter image URL"
              />
            </div>
          </div>

          {formData.notesImage && (
            <div className="image-preview">
              <img src={formData.notesImage} alt="Preview" />
            </div>
          )}

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="save-button" disabled={loading}>
              <Save size={20} />
              <span>{loading ? 'Saving...' : 'Save Note'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;