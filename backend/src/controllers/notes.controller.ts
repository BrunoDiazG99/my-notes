import { Request, Response } from "express";
import { NotesService } from "../services/notes.services.ts";
import { Note } from "../models/notes.model.ts";

export class NotesController {
  private noteServices = new NotesService();

  async getNotes(req: Request, res: Response) {
    try {
      const notes = await this.noteServices.getAll();
      return res.json(notes || []);
    } catch (error) {
      console.error("Error fetching notes:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async createNote(req: Request, res: Response) {
    try {
      const noteData: Note = req.body;
      const newNoteId = await this.noteServices.create(noteData);
      return res.status(201).json({
        message: "Note created successfully",
        idNote: newNoteId,
      });
    } catch (error) {
      console.error("Error creating note:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateNote(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const noteData: Note = req.body;
      const updatedRows = await this.noteServices.updateById(
        Number(id),
        noteData
      );
      if (updatedRows > 0) {
        return res.json({
          message: `Note with ID ${id} updated successfully`,
          updatedRows: updatedRows,
        });
      } else {
        return res.status(404).json({ message: "Note not found" });
      }
    } catch (error) {
      console.error("Error updating note:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteNote(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedRows = await this.noteServices.deleteById(Number(id));
      if (deletedRows > 0) {
        return res.json({
          message: `Note with ID ${id} deleted successfully`,
          deletedRows: deletedRows,
        });
      } else {
        return res.status(404).json({ error: "Note not found" });
      }
      return res.json({ message: "Note deleted successfully" });
    } catch (error) {
      console.error("Error deleting note:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getArchived(req: Request, res: Response) {
    try {
      const archivedNotes = await this.noteServices.getArchived();
      return res.json(archivedNotes || []);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error fetching archived notes", error });
    }
  }

  async archive(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedRows = await this.noteServices.archive(Number(id));
      if (updatedRows > 0) {
        return res.json({
          message: `Note with ID ${id} archived successfully`,
          updatedRows: updatedRows,
        });
      } else {
        return res.status(404).json({ error: "Note not found" });
      }
    } catch (error) {
      console.error("Error archiving note:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async restore(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedRows = await this.noteServices.restore(Number(id));
      if (updatedRows > 0) {
        return res.json({
          message: `Note with ID ${id} restored successfully`,
          updatedRows: updatedRows,
        });
      } else {
        return res.status(404).json({ error: "Note not found" });
      }
    } catch (error) {
      console.error("Error restoring note:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
