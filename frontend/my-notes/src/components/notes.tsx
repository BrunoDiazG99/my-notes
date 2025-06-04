import "../styles/notes.css";
import { useRef } from "react";
import type { Note } from "../types/notes";
import { Pencil, Archive, Trash2, ArchiveRestore } from "lucide-react";
import useNotesStore from "../store/notes.store";

type NotesProps = {
  note: Note;
};

const Notes = ({ note }: NotesProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  const openNoteModal = useNotesStore((state) => state.openNoteModal);
  const editNote = useNotesStore((state) => state.editNote);
  const onArchiveNote = useNotesStore((state) => state.onArchiveNote);
  const onRestoreNote = useNotesStore((state) => state.onRestoreNote);
  const onDeleteNote = useNotesStore((state) => state.onDeleteNote);

  return (
    <>
      <div
        className="notes-container"
        style={{
          backgroundColor: note.color,
        }}
        onClick={() => openNoteModal(note)}
      >
        <h3 ref={titleRef} className="notes-title" title={note.title}>
          {note.title}
        </h3>
        <div className="notes-content" title={note.content}>
          {note.content}
        </div>
        <span className="notes-date">
          {`Created: ${new Date(note.dateCreated).toDateString() || "No date"}`}
        </span>
        <div>
          <div className="buttonContainer" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="buttons" title="Edit">
              <Pencil color="white" size={18} onClick={() => editNote(note)} />
            </button>
            <button type="button" className="buttons" title="Edit">
              <Trash2
                color="white"
                size={18}
                onClick={() => onDeleteNote(note)}
              />
            </button>
            {note.isActive && (
              <button type="button" className="buttons" title="Archive">
                <Archive
                  color="white"
                  size={18}
                  onClick={() => onArchiveNote(note)}
                />
              </button>
            )}
            {!note.isActive && (
              <button type="button" className="buttons" title="Archive">
                <ArchiveRestore
                  color="white"
                  size={18}
                  onClick={() => onRestoreNote(note)}
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Notes;
