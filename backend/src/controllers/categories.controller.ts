import { Request, Response } from "express";
import { CategoriesServices } from "../services/categories.services";
import { Category } from "../models/categories.model";

const getAll = async (req: Request, res: Response) => {
  try {
    const categories = await CategoriesServices.getAll();
    res.json(categories || []);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await CategoriesServices.getById(Number(id));
    res.json(category || {});
  } catch (error) {
    console.error("Error fetching category by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const categoryData: Category = req.body;
    const createdCategoryId = await CategoriesServices.create(categoryData);
    res.status(201).json({
      message: "Category created successfully",
      idCategory: createdCategoryId,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData: Category = req.body;
    const updatedRows = await CategoriesServices.updateById(
      Number(id),
      updateData
    );
    if (updatedRows > 0) {
      res.json({
        message: `Category with ID ${id} updated successfully`,
        updatedRows: updatedRows,
      });
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    console.error("Error updating category by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedRows = await CategoriesServices.deleteById(Number(id));
    if (deletedRows > 0) {
      res.json({
        message: `Category with ID ${id} deleted successfully`,
        deletedRows: deletedRows,
      });
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    console.error("Error deleting category by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const CategoriesController = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
