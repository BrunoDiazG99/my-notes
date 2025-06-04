import { CategoriesModel, Category } from "../models/categories.model.ts";

export class CategoriesServices {
  private categoryModel = new CategoriesModel();

  getAll = async () => {
    try {
      const results = await this.categoryModel.getAll();
      return results;
    } catch (error) {
      console.error("Error in services", error);
      throw error;
    }
  };

  getById = async (id_category: number) => {
    try {
      const results = await this.categoryModel.getById(id_category);
      return results;
    } catch (error) {
      console.error("Error in services", error);
      throw error;
    }
  };

  create = async (dataCategory: Category) => {
    try {
      const id_category = await this.categoryModel.create(dataCategory);
      return id_category;
    } catch (error) {
      console.error("Error in services", error);
      throw error;
    }
  };

  updateById = async (id_category: number, dataCategory: Category) => {
    try {
      const updatedRows = await this.categoryModel.updateById(
        id_category,
        dataCategory
      );
      return updatedRows;
    } catch (error) {
      console.error("Error in services", error);
      throw error;
    }
  };

  deleteById = async (id_category: number) => {
    try {
      const deletedRows = await this.categoryModel.deleteById(id_category);
      return deletedRows;
    } catch (error) {
      console.error("Error in services", error);
      throw error;
    }
  };
}
