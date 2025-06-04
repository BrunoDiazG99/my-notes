import "./App.css";
import Notes from "./components/notes.tsx";
import NoteModal from "./components/noteModal.tsx";
import AddNoteModal from "./components/addNoteModal.tsx";
import useNotesStore from "./store/notes.store.ts";
import { useEffect } from "react";
import useCategoryStore from "./store/category.store.ts";
import type { Category } from "./types/category";
import AddCategoryModal from "./components/addCategoryModal.tsx";

function App() {
  const notes = useNotesStore((state) => state.notes);
  const selectedNote = useNotesStore((state) => state.selectedNote);
  const showAddModal = useNotesStore((state) => state.showAddModal);
  const openAddModal = useNotesStore((state) => state.openAddModal);

  const fetchNotes = useNotesStore((state) => state.fetchNotes);
  const fetchCategories = useCategoryStore((state) => state.fetchCategories);
  const categories = useCategoryStore((state) => state.categories);
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);
  const setSelectedCategory = useCategoryStore(
    (state) => state.setSelectedCategory
  );

  const showAddCategoryModal = useCategoryStore(
    (state) => state.showAddCategoryModal
  );
  const openCategoryModal = useCategoryStore(
    (state) => state.openCategoryModal
  );

  const handleCategoryFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCategory = categories?.find(
      (cat) => cat.id_category === parseInt(e.target.value)
    );
    setSelectedCategory(selectedCategory || undefined);
  };

  useEffect(() => {
    fetchNotes();
    fetchCategories();
  }, [fetchNotes, fetchCategories]);

  useEffect(() => {
    if (selectedCategory) {
      fetchNotes(selectedCategory.id_category);
    } else {
      fetchNotes();
    }
  }, [selectedCategory, fetchNotes]);

  return (
    <>
      <style>
        {`
          .add-note-btn {
            margin-bottom: 1rem;
          }
          .notes-list {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
          }
          .note-actions-section {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 2rem;
            margin-bottom: 1rem;
          }
        `}
      </style>
      <main>
        <section>
          <h1>My Notes</h1>
          <section className="note-actions-section">
            <button onClick={openAddModal} className="add-note-btn">
              Add Note
            </button>
            <button onClick={openCategoryModal} className="add-note-btn">
              Add Category
            </button>
            <select
              id="category-select"
              name="category"
              value={selectedCategory?.id_category || ""}
              onChange={handleCategoryFilterChange}
              style={{
                width: "50%",
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
          <ul className="notes-list">
            {notes &&
              notes
                .filter((n) => n.isActive)
                .map((note, i) => <Notes key={i} note={note} />)}
          </ul>
        </section>
        <section>
          <h1>Archived Notes</h1>
          <section className="note-actions-section">
            <select
              id="category-select"
              name="category"
              value={selectedCategory?.id_category || ""}
              onChange={handleCategoryFilterChange}
              style={{
                width: "50%",
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
          <ul className="notes-list">
            {notes &&
              notes
                .filter((n) => !n.isActive)
                .map((note, i) => <Notes key={i} note={note} />)}
          </ul>
        </section>
      </main>
      {showAddCategoryModal && <AddCategoryModal open={showAddCategoryModal} />}
      {showAddModal && <AddNoteModal isOpen={showAddModal} />}
      {selectedNote && <NoteModal selectedNote={selectedNote} />}
    </>
  );
}

export default App;
