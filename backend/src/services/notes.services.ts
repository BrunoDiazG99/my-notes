import { Note, NotesModel } from "../models/notes.model.ts";

export class NotesService {
  private notesModel = new NotesModel();

  getAll = async () => {
    try {
      const results = await this.notesModel.getAll();
      return results;
    } catch (error) {
      console.error("Error in service: ", error);
      throw error;
    }
  };

  getArchived = async () => {
    try {
      const results = await this.notesModel.getArchived();
      return results;
    } catch (error) {
      console.error("Error in service: ", error);
      throw error;
    }
  };

  create = async (dataNote: Note) => {
    try {
      const id_note = await this.notesModel.create(dataNote);
      return id_note;
    } catch (error) {
      console.error("Error in service: ", error);
      throw error;
    }
  };

  updateById = async (id_note: number, dataNote: Note) => {
    try {
      const updatedRows = await this.notesModel.updateById(id_note, dataNote);
      return updatedRows;
    } catch (error) {
      console.error("Error in service: ", error);
      throw error;
    }
  };

  deleteById = async (id_note: number) => {
    try {
      const deletedRows = await this.notesModel.deleteById(id_note);
      return deletedRows;
    } catch (error) {
      console.error("Error in service: ", error);
      throw error;
    }
  };

  archive = async (id_note: number) => {
    try {
      const archivedRows = await this.notesModel.archive(id_note);
      return archivedRows;
    } catch (error) {
      console.error("Error in service: ", error);
      throw error;
    }
  };

  restore = async (id_note: number) => {
    try {
      const restoredRows = await this.notesModel.restore(id_note);
      return restoredRows;
    } catch (error) {
      console.error("Error in service: ", error);
      throw error;
    }
  };
}
