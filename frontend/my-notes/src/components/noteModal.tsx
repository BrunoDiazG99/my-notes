import "../styles/noteModal.css";
import useNotesStore from "../store/notes.store.ts";
import type { Note } from "../types/notes";

type NoteModalProps = {
  selectedNote: Note;
};

const NoteModal = ({ selectedNote }: NoteModalProps) => {
  const closeNoteModal = useNotesStore((state) => state.closeNoteModal);
  return (
    <>
      <div className="note-modal-backdrop" onClick={closeNoteModal}>
        <div
          className="note-modal-content"
          onClick={(e) => e.stopPropagation()}
          style={{
            // width: maxWidth ? `${maxWidth + 48}px` : "200px",
            // maxWidth: maxWidth ? `${maxWidth + 48}px` : undefined,
            backgroundColor: selectedNote.color,
          }}
        >
          <button
            onClick={closeNoteModal}
            className="note-modal-close-btn"
            aria-label="Close"
          >
            &times;
          </button>
          <h2>{selectedNote.title}</h2>
          <div className="note-modal-body">
            <p className="note-modal-content-text">{selectedNote.content}</p>
          </div>
          <span>
            <strong>Created on:</strong>{" "}
            {new Date(selectedNote.dateCreated).toDateString()}
          </span>
        </div>
      </div>
    </>
  );
};

export default NoteModal;
