import { Router } from "express";
import { CategoriesController } from "../controllers/categories.controller";

const router = Router();

router.get("/", CategoriesController.getAll);
router.get("/:id", CategoriesController.getById);
router.post("/", CategoriesController.create);
router.put("/:id", CategoriesController.updateById);
router.delete("/:id", CategoriesController.deleteById);

export default router;
