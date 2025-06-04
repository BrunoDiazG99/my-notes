import type { Note, NoteDataForService } from "../types/notes";

const baseApiUrl = "http://localhost:4001/api/v1";

export const getNotes = async (): Promise<Note[]> => {
  try {
    const response = await fetch(`${baseApiUrl}/notes`);
    if (!response.ok) {
      throw new Error("Failed to fetch notes");
    }
    const data = await response.json();
    return data as Note[];
  } catch (error) {
    console.error("Error fetching notes:", error);
    return [];
  }
};

export const createNote = async (
  noteData: NoteDataForService
): Promise<number> => {
  try {
    const response = await fetch(`${baseApiUrl}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteData),
    });
    if (!response.ok) {
      throw new Error("Failed to create note");
    }
    const data = await response.json();
    return data.idNote as number;
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
};

export const updateNote = async (
  id: number,
  noteData: NoteDataForService
): Promise<number> => {
  try {
    const response = await fetch(`${baseApiUrl}/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteData),
    });
    if (!response.ok) {
      throw new Error("Failed to update note");
    }
    const data = await response.json();
    return data.updatedRows as number;
  } catch (error) {
    console.error("Error updating note:", error);
    throw error;
  }
};

export const deleteNote = async (id: number): Promise<number> => {
  try {
    const response = await fetch(`${baseApiUrl}/notes/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete note");
    }
    const data = await response.json();
    return data.deletedRows as number;
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
};

export const archiveNote = async (id: number): Promise<number> => {
  try {
    const response = await fetch(`${baseApiUrl}/notes/archive/${id}`, {
      method: "PUT",
    });
    if (!response.ok) {
      throw new Error("Failed to archive note");
    }
    const data = await response.json();
    return data.updatedRows as number;
  } catch (error) {
    console.error("Error archiving note:", error);
    throw error;
  }
};

export const restoreNote = async (id: number): Promise<number> => {
  try {
    const response = await fetch(`${baseApiUrl}/notes/restore/${id}`, {
      method: "PUT",
    });
    if (!response.ok) {
      throw new Error("Failed to restore note");
    }
    const data = await response.json();
    return data.updatedRows as number;
  } catch (error) {
    console.error("Error restoring note:", error);
    throw error;
  }
};
