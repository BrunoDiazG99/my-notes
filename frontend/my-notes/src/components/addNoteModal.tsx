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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <div className="color-picker">
            <label>Choose color:</label>
            <div className="color-options">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`color-btn${color === c ? " selected" : ""}`}
                  style={{ background: c }}
                  onClick={() => setColor(c)}
                  aria-label={`Choose color ${c}`}
                />
              ))}
            </div>
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
          margin-bottom: 1rem;
        }
        .color-options {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }
        .color-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 2px solid #ccc;
          cursor: pointer;
          outline: none;
        }
        .color-btn.selected {
          border: 2px solid #333;
        }
      `}</style>
    </div>
  );
};

export default AddNoteModal;
