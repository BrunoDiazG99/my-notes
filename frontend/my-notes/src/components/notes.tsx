import { useRef, useLayoutEffect, useState } from "react";
import type { Note } from "../types/notes";

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
    <div
      style={{
        width: maxWidth ? `${maxWidth + 48}px` : "200px", // 48px for padding (24px left + 24px right)
        maxWidth: maxWidth ? `${maxWidth + 48}px` : undefined,
        height: "150px",
        backgroundColor: note.color,
        border: "2px solid black",
        borderRadius: "8px",
        padding: "24px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
      onClick={() => onClick(note)}
    >
      <h3
        ref={titleRef}
        style={{
          margin: 0,
          marginBottom: "8px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        title={note.title}
      >
        {note.title}
      </h3>
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 10,
          WebkitBoxOrient: "vertical",
          whiteSpace: "nowrap",
        }}
        title={note.content}
      >
        {note.content}
      </div>
      <span
        style={{
          fontSize: "0.8rem",
          color: "#555",
          display: "block",
          marginTop: "8px",
        }}
      >
        {`Created: ${note.dateCreated?.toLocaleDateString() || "No date"}`}
      </span>
      <div></div>
    </div>
  );
};

export default Notes;
