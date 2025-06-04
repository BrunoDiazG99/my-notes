import React, { useState, useEffect } from "react";
import useCategoryStore from "../store/category.store.ts";
import type { Category } from "../types/category";
import useNotesStore from "../store/notes.store.ts";

interface AddNoteModalProps {
  isOpen: boolean;
}

// Helper to generate a random hex color
const getRandomColor = () =>
  "#" +
  Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0");

const AddNoteModal: React.FC<AddNoteModalProps> = ({ isOpen }) => {
  const editMode = useNotesStore((state) => state.editMode);
  const noteData = useNotesStore((state) => state.editingNote);

  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [color, setColor] = useState(noteData?.color || "#ffffff");
  const [category, setCategory] = useState<Category | null>(null);

  const categories = useCategoryStore((state) => state.categories);
  const handleAddNote = useNotesStore((state) => state.handleAddNote);
  const handleEditNote = useNotesStore((state) => state.handleEditNote);

  const closeAddModal = useNotesStore((state) => state.closeAddModal);

  // Randomize color when modal opens
  useEffect(() => {
    if (isOpen && !editMode) {
      setColor(getRandomColor());
      setTitle("");
      setContent("");
    }
  }, [isOpen, editMode]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = categories?.find(
      (cat) => cat.id_category === parseInt(e.target.value)
    );
    setCategory(selectedCategory || null);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim())
      if (editMode) {
        handleEditNote({
          title,
          content,
          color,
          id_category: category?.id_category || 0,
        });
      } else
        handleAddNote({
          title,
          content,
          color,
          id_category: category?.id_category || 0,
        });

    setTitle("");
    setContent("");
    setColor(getRandomColor());
    closeAddModal();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={closeAddModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{editMode ? "Edit Note" : "Add Note"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            name="title"
            autoFocus
            value={title}
            onChange={handleTitleChange}
            required
          />
          <textarea
            placeholder="Content"
            name="content"
            rows={4}
            value={content}
            onChange={handleContentChange}
            required
          />
          <section className="category-picker" style={{ margin: "1rem 0" }}>
            <select
              id="category-select"
              name="category"
              value={category?.id_category || ""}
              onChange={handleCategoryChange}
              style={{
                width: "100%",
                marginBottom: "0.5rem",
                padding: "0.5rem",
              }}
            >
              <option key={0} value={""}>
                Default Category
              </option>
              {categories &&
                categories.map((category: Category) => (
                  <option
                    key={category.id_category}
                    value={category.id_category}
                  >
                    {category.name}
                  </option>
                ))}
            </select>
          </section>
          <section className="color-picker">
            <label>Choose a color for the note:</label>
            <input
              type="color"
              name="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="color-input"
              aria-label="Custom color picker"
            />
          </section>
          <section className="modal-actions">
            <button type="submit">{editMode ? "Edit" : "Add"}</button>
            <button type="button" onClick={closeAddModal}>
              Cancel
            </button>
          </section>
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
