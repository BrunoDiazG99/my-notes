import type { Note } from "../types/notes";

type NoteModalProps = {
  selectedNote: Note;
  closeModal: () => void;
};

const NoteModal = ({ selectedNote, closeModal }: NoteModalProps) => {
  return (
    <>
      <style>
        {`
          .note-modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
          }
          .note-modal-content {
            background: white;
            border: 2px solid black;
            padding: 2rem;
            border-radius: 8px;
            min-width: 300px;
            max-width: 600px;
            max-height: 50vh;
            position: relative;
          }
          .note-modal-close-btn {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background: transparent;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
          }
          .note-modal-body {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            overflow: auto;
          }
          .note-modal-content-text {
            flex: 1;
            display: -webkit-box;
            -webkit-line-clamp: 10;
            -webkit-box-orient: vertical;
            white-space: wrap;
            overflow: hidden;
          }
        `}
      </style>
      <div className="note-modal-backdrop" onClick={closeModal}>
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
            onClick={closeModal}
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
            {selectedNote.dateCreated?.toLocaleDateString()}
          </span>
        </div>
      </div>
    </>
  );
};

export default NoteModal;
