import { useState } from "react";
import "./App.css";
import type { Note } from "./types/notes";
import Notes from "./components/notes.tsx";
import NoteModal from "./components/noteModal.tsx";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  // const [note, setNote] = useState<Note>({} as Note); // Initialize with an empty Note object
  const [noteTest, setNoteTest] = useState<string>("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const openNote = (note: Note) => {
    // Logic to open the note, e.g., navigate to a detailed view or open a modal
    console.log("Opening note:", note);
    setSelectedNote(note);
    // setNote(note); // Set the selected note to the state
  };

  const closeModal = () => {
    setSelectedNote(null);
  };

  return (
    <>
      <main>
        <h1>My Notes</h1>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (noteTest.trim()) {
                console.log("Adding note:", noteTest);
                const newNote: Note = {
                  id_note: notes.length + 1, // Simple ID generation
                  title: noteTest,
                  content:
                    "Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing Lorem testing last word", // Default content, can be edited later
                  color: "white", // Default color, can be changed later
                  id_category: 1, // Default category ID, can be changed later
                  category: null, // Default category, can be set later
                  isActive: true, // Default active state
                  dateCreated: new Date(), // Set current date as creation date
                };
                setNotes([...notes, newNote]);
                setNoteTest(""); // Clear the input field after adding the note
                console.log("Note added:", newNote);
              }
            }}
            style={{ marginBottom: "1rem" }}
          >
            <input
              type="text"
              value={noteTest}
              onChange={(e) => setNoteTest(e.target.value)}
              placeholder="Write a note..."
              style={{ marginRight: "0.5rem" }}
            />
            <button type="submit">Add Note</button>
          </form>
          <ul style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {notes.map((note, i) => (
              <Notes key={i} note={note} onClick={() => openNote(note)} />
            ))}
          </ul>
        </div>
      </main>
      {selectedNote && (
        <NoteModal selectedNote={selectedNote} closeModal={closeModal} />
      )}
    </>
  );
}

export default App;
