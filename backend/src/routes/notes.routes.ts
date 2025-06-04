import { Router } from "express";
import { NotesController } from "../controllers/notes.controller.ts";

const router = Router();

const notesController = new NotesController();

router.get("/", notesController.getNotes.bind(notesController));
router.post("/", notesController.createNote.bind(notesController));
router.put("/:id", notesController.updateNote.bind(notesController));
router.delete("/:id", notesController.deleteNote.bind(notesController));

router.get("/archive", notesController.getArchived.bind(notesController));
router.put("/archive/:id", notesController.archive.bind(notesController));
router.put("/restore/:id", notesController.restore.bind(notesController));

export default router;
