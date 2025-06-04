import { Router } from "express";
import categoryRouter from "./routes/categories.routes";
import notesRouter from "./routes/notes.routes";

const mainRouter = Router();

mainRouter.use("/categories", categoryRouter);
mainRouter.use("/notes", notesRouter);

export default mainRouter;
