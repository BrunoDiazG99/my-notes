import { Router } from "express";
import categoryRouter from "./routes/categories.routes.ts";
import notesRouter from "./routes/notes.routes.ts";

const mainRouter = Router();

mainRouter.use("/categories", categoryRouter);
mainRouter.use("/notes", notesRouter);

export default mainRouter;
