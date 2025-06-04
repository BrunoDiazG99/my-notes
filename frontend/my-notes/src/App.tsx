import { useState } from "react";
import "./App.css";
import type { Note } from "./types/notes";
import Notes from "./components/notes.tsx";
import NoteModal from "./components/noteModal.tsx";
import AddNoteModal from "./components/addNoteModal.tsx";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [archivedNotes, setArchivedNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const openNote = (note: Note) => {
    setSelectedNote(note);
  };

  const closeModal = () => {
    setSelectedNote(null);
  };

  const editNote = (note: Note) => {
    setEditingNote(note);
    setEditMode(true);
    setShowAddModal(true);
  };

  const onArchiveNote = (note: Note) => {
    const newNotes = notes.filter((n) => n.id_note !== note.id_note);
    setArchivedNotes([...archivedNotes, note]);
    setNotes([...newNotes]);
  };

  const onRestoreNote = (note: Note) => {
    const newArchivedNotes = archivedNotes.filter(
      (n) => n.id_note !== note.id_note
    );
    setArchivedNotes([...newArchivedNotes]);
    setNotes([...notes, note]);
  };

  const onDeleteNote = (note: Note) => {
    const newNotes = notes.filter((n) => n.id_note !== note.id_note);
    setNotes([...newNotes]);
  };

  const handleAddNote = (noteData: {
    title: string;
    content: string;
    color: string;
  }) => {
    const newNote: Note = {
      id_note: notes.length + 1,
      title: noteData.title,
      content: noteData.content,
      color: noteData.color,
      id_category: 1,
      category: null,
      isActive: true,
      dateCreated: new Date(),
    };
    setNotes([...notes, newNote]);
    setEditingNote(null);
    setShowAddModal(false);
  };

  const handleEditNote = (noteData: {
    title: string;
    content: string;
    color: string;
  }) => {
    console.log("Editing note data:", noteData);
    const newNote: Note = {
      ...editingNote,
      id_note: editingNote?.id_note || notes.length + 1,
      title: noteData.title,
      content: noteData.content,
      color: noteData.color,
      id_category: 1,
    };
    console.log("Editing note:", newNote);
    const updatedNotes = notes.map((note) =>
      note.id_note === newNote.id_note ? newNote : note
    );
    console.log("Updated notes:", updatedNotes);
    setNotes([...updatedNotes]);
    setEditingNote(null);
    setEditMode(false);
    setShowAddModal(false);
  };

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
          <button
            onClick={() => setShowAddModal(true)}
            className="add-note-btn"
          >
            Add Note
          </button>
          <ul className="notes-list">
            {notes.map((note, i) => (
              <Notes
                key={i}
                note={note}
                onClick={() => openNote(note)}
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
            {archivedNotes.map((note, i) => (
              <Notes
                key={i}
                note={note}
                onClick={() => openNote(note)}
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
          onClose={() => setShowAddModal(false)}
          onAddNote={handleAddNote}
          onEditNote={handleEditNote}
          isEditing={editMode}
          noteData={editingNote}
        />
      )}
      {selectedNote && (
        <NoteModal selectedNote={selectedNote} closeModal={closeModal} />
      )}
    </>
  );
}

export default App;
