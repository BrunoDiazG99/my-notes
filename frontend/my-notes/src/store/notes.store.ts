import { create } from "zustand";
import type { Note, NoteDataForService } from "../types/notes";
import {
  archiveNote,
  createNote,
  deleteNote,
  getNotes,
  restoreNote,
  updateNote,
} from "../services/notes.service.ts";

type NotesStore = {
  notes: Note[];
  selectedNote: Note | null;
  editingNote: Note | null;
  showAddModal: boolean;
  editMode: boolean;

  openNoteModal: (note: Note) => void;
  closeNoteModal: () => void;
  openAddModal: () => void;
  closeAddModal: () => void;
  editNote: (note: Note) => void;
  onArchiveNote: (note: Note) => void;
  onRestoreNote: (note: Note) => void;
  onDeleteNote: (note: Note) => void;
  handleAddNote: (noteData: NoteDataForService) => void;
  handleEditNote: (noteData: NoteDataForService) => void;

  fetchNotes: (category?: number) => void;
};

const useNotesStore = create<NotesStore>()((set, get) => ({
  notes: [],
  selectedNote: null,
  editingNote: null,
  showAddModal: false,
  editMode: false,

  openNoteModal: (note) => set(() => ({ selectedNote: note })),

  closeNoteModal: () => set(() => ({ selectedNote: null })),

  openAddModal: () => set(() => ({ showAddModal: true, editMode: false })),

  closeAddModal: () => set(() => ({ showAddModal: false, editMode: false })),

  editNote: (note) =>
    set(() => ({ editingNote: note, editMode: true, showAddModal: true })),

  onArchiveNote: async (note) => {
    const wasArchived = await archiveNote(note.id_note);
    if (wasArchived)
      set((state) => {
        const newNotes = state.notes.map((n) =>
          n.id_note === note.id_note ? { ...n, isActive: false } : n
        );
        return { notes: newNotes };
      });
  },

  onRestoreNote: async (note) => {
    const wasRestored = await restoreNote(note.id_note);
    if (wasRestored)
      set((state) => {
        const newNotes = state.notes.map((n) =>
          n.id_note === note.id_note ? { ...n, isActive: true } : n
        );
        return { notes: newNotes };
      });
  },

  onDeleteNote: async (note) => {
    const wasDeleted = await deleteNote(note.id_note);
    if (wasDeleted)
      set((state) => {
        const newNotes = state.notes.filter((n) => n.id_note !== note.id_note);
        return { notes: newNotes };
      });
  },

  handleAddNote: async (noteData) => {
    const newNoteId = await createNote(noteData);
    const newNote = {
      ...noteData,
      id_note: newNoteId,
      category: null,
      isActive: true,
      dateCreated: new Date().toDateString(),
    };

    set((state) => {
      return {
        notes: [...state.notes, newNote],
        editingNote: null,
        showAddModal: false,
      };
    });
  },

  handleEditNote: async (noteData) => {
    const { editingNote } = get();
    if (!editingNote) return;
    const wasUpdated = await updateNote(editingNote.id_note, noteData);
    if (wasUpdated)
      set((state) => {
        const updatedNotes = state.notes.map((note) =>
          note.id_note === state.editingNote?.id_note
            ? {
                ...note,
                title: noteData.title,
                content: noteData.content,
                color: noteData.color,
                id_category: noteData.id_category,
              }
            : note
        );
        return {
          notes: updatedNotes,
          editingNote: null,
          showAddModal: false,
          editMode: false,
        };
      });
  },

  fetchNotes: async (category) => {
    const notes = await getNotes(category);
    set(() => ({ notes }));
  },
}));

export default useNotesStore;
