import "../styles/addCategoryModal.css";
import React, { useState } from "react";
import useCategoryStore from "../store/category.store.ts";

interface AddCategoryModalProps {
  open: boolean;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ open }) => {
  const [categoryName, setCategoryName] = useState("");
  const closeCategoryModal = useCategoryStore(
    (state) => state.closeCategoryModal
  );
  const addCategory = useCategoryStore((state) => state.addCategory);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (categoryName.trim()) {
      const newCategory = {
        name: categoryName.trim(),
        id_category: 0,
        dateCreated: "",
      };
      addCategory(newCategory);
    }
    setCategoryName("");
    closeCategoryModal();
  };

  const handleClose = () => {
    setCategoryName("");
    closeCategoryModal();
  };

  if (!open) return null;

  return (
    <>
      <div className="add-category-modal-backdrop" onClick={handleClose}>
        <div
          className="add-category-modal-dialog"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
        >
          <form onSubmit={handleAdd}>
            <h2 style={{ marginTop: 0 }}>Add New Category</h2>
            <input
              className="add-category-modal-input"
              autoFocus
              placeholder="Category Name"
              name="categoryName"
              value={categoryName}
              onChange={(e) => {
                setCategoryName(e.target.value);
              }}
              required
            />
            <section className="add-category-modal-actions">
              <button type="submit">Add</button>
              <button onClick={handleClose} type="button">
                Cancel
              </button>
            </section>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCategoryModal;
