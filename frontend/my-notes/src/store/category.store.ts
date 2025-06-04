import { create } from "zustand";
import type { Category } from "../types/category";
import { createCategory, getCategories } from "../services/category.services";

type CategoryStore = {
  categories: Category[];
  selectedCategory: Category | undefined;
  showAddCategoryModal: boolean;
  openCategoryModal: () => void;
  closeCategoryModal: () => void;

  fetchCategories: () => void;
  setSelectedCategory: (category: Category | undefined) => void;

  addCategory: (category: Category) => void;
};

const useCategoryStore = create<CategoryStore>()((set) => ({
  categories: [],
  selectedCategory: undefined,
  showAddCategoryModal: false,
  openCategoryModal: () => set({ showAddCategoryModal: true }),
  closeCategoryModal: () => set({ showAddCategoryModal: false }),

  fetchCategories: async () => {
    const categories = await getCategories();
    set({ categories });
  },
  setSelectedCategory: (category) => set({ selectedCategory: category }),

  addCategory: async (category) => {
    const newCategoryId = await createCategory({ name: category.name });
    const newCategory = {
      ...category,
      id_category: newCategoryId,
      dateCreated: new Date().toDateString(),
    };
    set((state) => ({
      categories: [...state.categories, newCategory],
    }));
  },
}));

export default useCategoryStore;
