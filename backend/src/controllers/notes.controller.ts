import { Request, Response } from "express";
import { NotesServices } from "../services/notes.services";
import { Note } from "../models/notes.model";

const getNotes = async (req: Request, res: Response) => {
  try {
    const category = req.query.category as string;
    const notes = await NotesServices.getAll(category);
    res.json(notes || []);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createNote = async (req: Request, res: Response) => {
  try {
    const noteData: Note = req.body;
    const newNoteId = await NotesServices.create(noteData);
    res.status(201).json({
      message: "Note created successfully",
      idNote: newNoteId,
    });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const noteData: Note = req.body;
    const updatedRows = await NotesServices.updateById(Number(id), noteData);
    if (updatedRows > 0) {
      res.json({
        message: `Note with ID ${id} updated successfully`,
        updatedRows: updatedRows,
      });
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedRows = await NotesServices.deleteById(Number(id));
    if (deletedRows > 0) {
      res.json({
        message: `Note with ID ${id} deleted successfully`,
        deletedRows: deletedRows,
      });
    } else {
      res.status(404).json({ error: "Note not found" });
    }
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getArchived = async (req: Request, res: Response) => {
  try {
    const archivedNotes = await NotesServices.getArchived();
    res.json(archivedNotes || []);
  } catch (error) {
    res.status(500).json({ message: "Error fetching archived notes", error });
  }
};

const archive = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedRows = await NotesServices.archive(Number(id));
    if (updatedRows > 0) {
      res.json({
        message: `Note with ID ${id} archived successfully`,
        updatedRows: updatedRows,
      });
    } else {
      res.status(404).json({ error: "Note not found" });
    }
  } catch (error) {
    console.error("Error archiving note:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const restore = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedRows = await NotesServices.restore(Number(id));
    if (updatedRows > 0) {
      res.json({
        message: `Note with ID ${id} restored successfully`,
        updatedRows: updatedRows,
      });
    } else {
      res.status(404).json({ error: "Note not found" });
    }
  } catch (error) {
    console.error("Error restoring note:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const NotesController = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  getArchived,
  archive,
  restore,
};
