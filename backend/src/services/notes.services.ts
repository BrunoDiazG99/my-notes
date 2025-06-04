import { Note, NotesModel } from "../models/notes.model";

const getAll = async (category?: string) => {
  try {
    const results = await NotesModel.getAll(category);
    return results;
  } catch (error) {
    console.error("Error in service: ", error);
    throw error;
  }
};

const getArchived = async () => {
  try {
    const results = await NotesModel.getArchived();
    return results;
  } catch (error) {
    console.error("Error in service: ", error);
    throw error;
  }
};

const create = async (dataNote: Note) => {
  try {
    const id_note = await NotesModel.create(dataNote);
    return id_note;
  } catch (error) {
    console.error("Error in service: ", error);
    throw error;
  }
};

const updateById = async (id_note: number, dataNote: Note) => {
  try {
    const updatedRows = await NotesModel.updateById(id_note, dataNote);
    return updatedRows;
  } catch (error) {
    console.error("Error in service: ", error);
    throw error;
  }
};

const deleteById = async (id_note: number) => {
  try {
    const deletedRows = await NotesModel.deleteById(id_note);
    return deletedRows;
  } catch (error) {
    console.error("Error in service: ", error);
    throw error;
  }
};

const archive = async (id_note: number) => {
  try {
    const archivedRows = await NotesModel.archive(id_note);
    return archivedRows;
  } catch (error) {
    console.error("Error in service: ", error);
    throw error;
  }
};

const restore = async (id_note: number) => {
  try {
    const restoredRows = await NotesModel.restore(id_note);
    return restoredRows;
  } catch (error) {
    console.error("Error in service: ", error);
    throw error;
  }
};

export const NotesServices = {
  getAll,
  getArchived,
  create,
  updateById,
  deleteById,
  archive,
  restore,
};
