import { useRef, useLayoutEffect, useState } from "react";
import type { Note } from "../types/notes";
import { Pencil, Archive, Trash2, ArchiveRestore } from "lucide-react";
import useNotesStore from "../store/notes.store.ts";

type NotesProps = {
  note: Note;
};

const Notes = ({ note }: NotesProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [maxWidth, setMaxWidth] = useState<number | undefined>(undefined);

  const openNoteModal = useNotesStore((state) => state.openNoteModal);
  const editNote = useNotesStore((state) => state.editNote);
  const onArchiveNote = useNotesStore((state) => state.onArchiveNote);
  const onRestoreNote = useNotesStore((state) => state.onRestoreNote);
  const onDeleteNote = useNotesStore((state) => state.onDeleteNote);

  useLayoutEffect(() => {
    if (titleRef.current) {
      setMaxWidth(titleRef.current.scrollWidth);
    }
  }, [note.title]);

  return (
    <>
      <style>
        {`
          .notes-container {
            height: 200px;
            border: 2px solid black;
            border-radius: 8px;
            padding: 24px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            transition: box-shadow 0.2s;
            cursor: pointer;
          }
          .notes-container:hover {
            box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
          }
          .notes-title {
            margin: 0;
            margin-bottom: 8px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .notes-content {
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 10;
            -webkit-box-orient: vertical;
            white-space: nowrap;
          }
          .notes-date {
            font-size: 0.8rem;
            color: #555;
            display: block;
            margin-top: 8px;
          }
          .buttonContainer{
            display: flex;
            justify-content: center;
            gap: 8px;
            margin-top: 12px;
          }
          .buttons{
            background-color: black;
            border: none;
            border-radius: 4px;
            padding: 6px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .buttons:hover {
            background-color: #333;
          }
        `}
      </style>
      <div
        className="notes-container"
        style={{
          width: maxWidth ? `${maxWidth + 96}px` : "200px",
          maxWidth: maxWidth ? `${maxWidth + 96}px` : undefined,
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
