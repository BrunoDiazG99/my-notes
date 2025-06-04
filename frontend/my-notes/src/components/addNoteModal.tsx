import React, { useState } from "react";

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNote: (noteData: {
    title: string;
    content: string;
    color: string;
  }) => void;
}

const COLORS = [
  "#FFD700",
  "#90EE90",
  "#ADD8E6",
  "#FFB6C1",
  "#FFFACD",
  "#E6E6FA",
];

const AddNoteModal: React.FC<AddNoteModalProps> = ({
  isOpen,
  onClose,
  onAddNote,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState(COLORS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onAddNote({ title, content, color });
      setTitle("");
      setContent("");
      setColor(COLORS[0]);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Add Note</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            name="title"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Content"
            name="content"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <div className="color-picker">
            <label>Choose a color for the note:</label>
            <input
              type="color"
              name="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="color-input"
              aria-label="Custom color picker"
            />
          </div>
          <div className="modal-actions">
            <button type="submit">Add</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
      <style>{`
        .modal-backdrop {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal {
          background: #fff;
          padding: 2rem;
          border-radius: 8px;
          min-width: 300px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }
        .modal-actions {
          margin-top: 1rem;
          display: flex;
          gap: 1rem;
        }
        input, textarea {
          width: 100%;
          margin-bottom: 1rem;
          padding: 0.5rem;
        }
        .color-picker {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.5rem;
          align-items: center;
          justify-content: center;
        }
        .color-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid #ccc;
          cursor: pointer;
          outline: none;
          transition: border 0.2s, box-shadow 0.2s;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        }
        .color-btn.selected {
          border: 3px solid #333;
          box-shadow: 0 0 0 2px #3333;
        }
        .color-btn:focus {
          border: 2px solid #0078d4;
        }
        .color-input {
          width: 36px;
          height: 36px;
          border: none;
          padding: 0;
          margin: 0;
          background: none;
          cursor: pointer;
          border-radius: 50%;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
          align-self:center;
        }
        .color-input::-webkit-color-swatch-wrapper {
          padding: 0;
          border-radius: 50%;
        }
        .color-input::-webkit-color-swatch {
          border-radius: 50%;
          border: 2px solid #ccc;
        }
      `}</style>
    </div>
  );
};

export default AddNoteModal;
