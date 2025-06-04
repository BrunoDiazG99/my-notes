import type { Note } from "../types/notes";

type NoteModalProps = {
  selectedNote: Note;
  closeModal: () => void;
};

const NoteModal = ({ selectedNote, closeModal }: NoteModalProps) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={closeModal}
    >
      <div
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "8px",
          minWidth: "300px",
          maxWidth: "600px",
          maxHeight: "50vh",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          style={{
            position: "absolute",
            top: "0.5rem",
            right: "0.5rem",
            background: "transparent",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
          aria-label="Close"
        >
          &times;
        </button>
        <h2>{selectedNote.title}</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            overflow: "auto",
          }}
        >
          <p
            style={{
              flex: 1,
              display: "-webkit-box",
              WebkitLineClamp: 10,
              WebkitBoxOrient: "vertical",
              whiteSpace: "wrap",
            }}
          >
            {selectedNote.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
