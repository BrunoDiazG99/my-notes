import "./App.css";
import Notes from "./components/notes.tsx";
import NoteModal from "./components/noteModal.tsx";
import AddNoteModal from "./components/addNoteModal.tsx";
import useNotesStore from "./store/notes.store.ts";
import { useEffect, useState } from "react";
import useCategoryStore from "./store/category.store.ts";
import AddCategoryModal from "./components/addCategoryModal.tsx";
import CategoryFilter from "./components/categoryFilter.tsx";

function App() {
  const [showArchive, setShowArchive] = useState<boolean>(false);

  const notes = useNotesStore((state) => state.notes);
  const selectedNote = useNotesStore((state) => state.selectedNote);
  const showAddModal = useNotesStore((state) => state.showAddModal);
  const openAddModal = useNotesStore((state) => state.openAddModal);

  const fetchNotes = useNotesStore((state) => state.fetchNotes);
  const fetchCategories = useCategoryStore((state) => state.fetchCategories);

  const selectedCategory = useCategoryStore((state) => state.selectedCategory);

  const showAddCategoryModal = useCategoryStore(
    (state) => state.showAddCategoryModal
  );
  const openCategoryModal = useCategoryStore(
    (state) => state.openCategoryModal
  );

  const toggleArchive = () => {
    setShowArchive(!showArchive);
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
      <main>
        <section>
          <h1>{showArchive ? `Archived Notes` : `My Notes`}</h1>
          <section className="note-actions-section">
            <button onClick={openAddModal} className="add-note-btn">
              Add Note
            </button>
            <button onClick={openCategoryModal} className="add-note-btn">
              Add Category
            </button>
            {!showArchive && (
              <button onClick={toggleArchive} className="add-note-btn">
                Search Archive
              </button>
            )}
            {showArchive && (
              <button onClick={toggleArchive} className="add-note-btn">
                Return
              </button>
            )}
            <CategoryFilter />
          </section>
          <ul className="notes-list">
            {notes &&
              notes
                .filter((n) => n.isActive === !showArchive)
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
