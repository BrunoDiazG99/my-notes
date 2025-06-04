import { Request, Response } from "express";
import { CategoriesServices } from "../services/categories.services.ts";
import { Category } from "../models/categories.model.ts";

export class CategoriesController {
  private categoryService = new CategoriesServices();

  async getAll(req: Request, res: Response) {
    try {
      const categories = await this.categoryService.getAll();
      return res.json(categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const category = await this.categoryService.getById(Number(id));
      return res.json(category || {});
    } catch (error) {
      console.error("Error fetching category by ID:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const categoryData: Category = req.body;
      const createdCategoryId = await this.categoryService.create(categoryData);
      return res.status(201).json({
        message: "Category created successfully",
        idCategory: createdCategoryId,
      });
    } catch (error) {
      console.error("Error creating category:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData: Category = req.body;
      const updatedRows = await this.categoryService.updateById(
        Number(id),
        updateData
      );
      if (updatedRows > 0) {
        return res.json({
          message: `Category with ID ${id} updated successfully`,
          updatedRows: updatedRows,
        });
      } else {
        return res.status(404).json({ error: "Category not found" });
      }
    } catch (error) {
      console.error("Error updating category by ID:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedRows = await this.categoryService.deleteById(Number(id));
      if (deletedRows > 0) {
        return res.json({
          message: `Category with ID ${id} deleted successfully`,
          deletedRows: deletedRows,
        });
      } else {
        return res.status(404).json({ error: "Category not found" });
      }
    } catch (error) {
      console.error("Error deleting category by ID:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new CategoriesController();
