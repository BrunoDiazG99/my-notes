import { Router } from "express";
import { CategoriesController } from "../controllers/categories.controller.ts";

const router = Router();

const categoriesController = new CategoriesController();

router.get("/", categoriesController.getAll.bind(categoriesController));
router.get("/:id", categoriesController.getById.bind(categoriesController));
router.post("/", categoriesController.create.bind(categoriesController));
router.put("/:id", categoriesController.updateById.bind(categoriesController));
router.delete(
  "/:id",
  categoriesController.deleteById.bind(categoriesController)
);

export default router;
