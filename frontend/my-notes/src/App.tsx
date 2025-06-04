import "./App.css";
import Notes from "./components/notes.tsx";
import NoteModal from "./components/noteModal.tsx";
import AddNoteModal from "./components/addNoteModal.tsx";
import useNotesStore from "./store/store.ts";
import { useEffect } from "react";

function App() {
  const notes = useNotesStore((state) => state.notes);
  const selectedNote = useNotesStore((state) => state.selectedNote);
  const editingNote = useNotesStore((state) => state.editingNote);
  const showAddModal = useNotesStore((state) => state.showAddModal);
  const editMode = useNotesStore((state) => state.editMode);

  const openNoteModal = useNotesStore((state) => state.openNoteModal);
  const closeNoteModal = useNotesStore((state) => state.closeNoteModal);
  const openAddModal = useNotesStore((state) => state.openAddModal);
  const closeAddModal = useNotesStore((state) => state.closeAddModal);
  const editNote = useNotesStore((state) => state.editNote);
  const onArchiveNote = useNotesStore((state) => state.onArchiveNote);
  const onRestoreNote = useNotesStore((state) => state.onRestoreNote);
  const onDeleteNote = useNotesStore((state) => state.onDeleteNote);
  const handleAddNote = useNotesStore((state) => state.handleAddNote);
  const handleEditNote = useNotesStore((state) => state.handleEditNote);

  const fetchNotes = useNotesStore((state) => state.fetchNotes);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

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
        `}
      </style>
      <main>
        <section>
          <h1>My Notes</h1>
          <button onClick={() => openAddModal()} className="add-note-btn">
            Add Note
          </button>
          <ul className="notes-list">
            {notes &&
              notes
                .filter((n) => n.isActive)
                .map((note, i) => (
                  <Notes
                    key={i}
                    note={note}
                    onClick={() => openNoteModal(note)}
                    onEdit={() => editNote(note)}
                    onDelete={() => onDeleteNote(note)}
                    onArchive={() => onArchiveNote(note)}
                  />
                ))}
          </ul>
        </section>
        <section>
          <h1>Archived Notes</h1>
          <ul className="notes-list">
            {/* {archivedNotes.map((note, i) => ( */}
            {notes &&
              notes
                .filter((n) => !n.isActive)
                .map((note, i) => (
                  <Notes
                    key={i}
                    note={note}
                    onClick={() => openNoteModal(note)}
                    onEdit={() => editNote(note)}
                    onDelete={() => onDeleteNote(note)}
                    onRestore={() => onRestoreNote(note)}
                  />
                ))}
          </ul>
        </section>
      </main>
      {showAddModal && (
        <AddNoteModal
          isOpen={showAddModal}
          onClose={() => closeAddModal()}
          onAddNote={handleAddNote}
          onEditNote={handleEditNote}
          isEditing={editMode}
          noteData={editingNote}
        />
      )}
      {selectedNote && (
        <NoteModal selectedNote={selectedNote} closeModal={closeNoteModal} />
      )}
    </>
  );
}

export default App;
