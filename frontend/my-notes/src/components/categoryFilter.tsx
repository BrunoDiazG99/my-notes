import "../styles/categoryFilter.css";
import useCategoryStore from "../store/category.store.ts";
import type { Category } from "../types/category";

const CategoryFilter: React.FC = () => {
  const categories = useCategoryStore((state) => state.categories);
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);
  const setSelectedCategory = useCategoryStore(
    (state) => state.setSelectedCategory
  );

  const handleCategoryFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCategory = categories?.find(
      (cat) => cat.id_category === parseInt(e.target.value)
    );
    setSelectedCategory(selectedCategory || undefined);
  };

  return (
    <>
      <select
        id="category-select"
        name="category"
        className="category-select"
        value={selectedCategory?.id_category || ""}
        onChange={handleCategoryFilterChange}
      >
        <option key={0} value={""}>
          Default Category
        </option>
        {categories &&
          categories.map((category: Category) => (
            <option key={category.id_category} value={category.id_category}>
              {category.name}
            </option>
          ))}
      </select>
    </>
  );
};

export default CategoryFilter;
