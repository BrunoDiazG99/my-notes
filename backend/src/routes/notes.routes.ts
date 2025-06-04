import { Router } from "express";
import { NotesController } from "../controllers/notes.controller";

const router = Router();

router.get("/", NotesController.getNotes);
router.post("/", NotesController.createNote);
router.put("/:id", NotesController.updateNote);
router.delete("/:id", NotesController.deleteNote);

// Decided it was not neccesary
// router.get("/archive", NotesController.getArchived);

router.put("/archive/:id", NotesController.archive);
router.put("/restore/:id", NotesController.restore);

export default router;
