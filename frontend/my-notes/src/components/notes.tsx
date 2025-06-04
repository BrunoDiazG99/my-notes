import { useRef, useLayoutEffect, useState } from "react";
import type { Note } from "../types/notes";
import { Pencil, Archive } from "lucide-react";

type NotesProps = {
  note: Note;
  onClick: (note: Note) => void;
};

const Notes = ({ note, onClick }: NotesProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [maxWidth, setMaxWidth] = useState<number | undefined>(undefined);

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
        `}
      </style>
      <div
        className="notes-container"
        style={{
          width: maxWidth ? `${maxWidth + 48}px` : "200px",
          maxWidth: maxWidth ? `${maxWidth + 48}px` : undefined,
          backgroundColor: note.color,
        }}
        onClick={() => onClick(note)}
      >
        <h3 ref={titleRef} className="notes-title" title={note.title}>
          {note.title}
        </h3>
        <div className="notes-content" title={note.content}>
          {note.content}
        </div>
        <span className="notes-date">
          {`Created: ${note.dateCreated?.toLocaleDateString() || "No date"}`}
        </span>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              marginTop: "12px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              style={{
                background: "black",
                border: "none",
                borderRadius: "4px",
                padding: "6px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              title="Edit"
            >
              <Pencil
                color="white"
                size={18}
                onClick={() => console.log("editing")}
              />
            </button>
            <button
              type="button"
              style={{
                background: "black",
                border: "none",
                borderRadius: "4px",
                padding: "6px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              title="Archive"
            >
              <Archive
                color="white"
                size={18}
                onClick={() => console.log("archiving")}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notes;
