import { Category, CategoryModel } from "../models/categories.model";

const getAll = async () => {
  try {
    const results = await CategoryModel.getAll();
    return results;
  } catch (error) {
    console.error("Error in services", error);
    throw error;
  }
};

const getById = async (id_category: number) => {
  try {
    const results = await CategoryModel.getById(id_category);
    return results;
  } catch (error) {
    console.error("Error in services", error);
    throw error;
  }
};

const create = async (dataCategory: Category) => {
  try {
    const id_category = await CategoryModel.create(dataCategory);
    return id_category;
  } catch (error) {
    console.error("Error in services", error);
    throw error;
  }
};

const updateById = async (id_category: number, dataCategory: Category) => {
  try {
    const updatedRows = await CategoryModel.updateById(
      id_category,
      dataCategory
    );
    return updatedRows;
  } catch (error) {
    console.error("Error in services", error);
    throw error;
  }
};

const deleteById = async (id_category: number) => {
  try {
    const deletedRows = await CategoryModel.deleteById(id_category);
    return deletedRows;
  } catch (error) {
    console.error("Error in services", error);
    throw error;
  }
};

export const CategoriesServices = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
