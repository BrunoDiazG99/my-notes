import type { Category, CategoryDataForService } from "../types/category";
import { baseApiUrl } from "./api.service.ts";

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${baseApiUrl}/categories`);
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await response.json();
    return data as Category[];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const createCategory = async (
  categoryData: CategoryDataForService
): Promise<number> => {
  try {
    const response = await fetch(`${baseApiUrl}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });
    if (!response.ok) {
      throw new Error("Failed to create category");
    }
    const data = await response.json();
    return data.idCategory as number;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const updateCategory = async (
  id: number,
  categoryData: CategoryDataForService
): Promise<number> => {
  try {
    const response = await fetch(`${baseApiUrl}/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });
    if (!response.ok) {
      throw new Error("Failed to update category");
    }
    const data = await response.json();
    return data.updatedRows as number;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

export const deleteCategory = async (id: number): Promise<number> => {
  try {
    const response = await fetch(`${baseApiUrl}/categories/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete category");
    }
    const data = await response.json();
    return data.deletedRows as number;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};
