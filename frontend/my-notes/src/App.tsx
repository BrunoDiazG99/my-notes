import { useState } from "react";
import "./App.css";
import type { Note } from "./types/notes";
import Notes from "./components/notes.tsx";
import NoteModal from "./components/noteModal.tsx";
import AddNoteModal from "./components/addNoteModal.tsx";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const openNote = (note: Note) => {
    setSelectedNote(note);
  };

  const closeModal = () => {
    setSelectedNote(null);
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
    setShowAddModal(false);
  };

  return (
    <>
      <main>
        <h1>My Notes</h1>
        <button
          onClick={() => setShowAddModal(true)}
          style={{ marginBottom: "1rem" }}
        >
          Add Note
        </button>
        <ul style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {notes.map((note, i) => (
            <Notes key={i} note={note} onClick={() => openNote(note)} />
          ))}
        </ul>
      </main>
      {showAddModal && (
        <AddNoteModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAddNote={handleAddNote}
        />
      )}
      {selectedNote && (
        <NoteModal selectedNote={selectedNote} closeModal={closeModal} />
      )}
    </>
  );
}

export default App;
