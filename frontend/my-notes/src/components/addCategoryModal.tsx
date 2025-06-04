import React, { useState } from "react";
import useCategoryStore from "../store/category.store.ts";

interface AddCategoryModalProps {
  open: boolean;
}

const modalStyles: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.3)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const dialogStyles: React.CSSProperties = {
  background: "#fff",
  borderRadius: 8,
  padding: 24,
  minWidth: 320,
  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
};

const inputStyles: React.CSSProperties = {
  width: "100%",
  padding: "8px",
  marginBottom: "8px",
  borderRadius: 4,
  border: "1px solid #ccc",
  fontSize: 16,
};

const actionsStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "flex-end",
  gap: 8,
};

const buttonStyles: React.CSSProperties = {
  padding: "8px 16px",
  borderRadius: 4,
  border: "none",
  fontSize: 16,
  cursor: "pointer",
};

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ open }) => {
  const [categoryName, setCategoryName] = useState("");
  const closeCategoryModal = useCategoryStore(
    (state) => state.closeCategoryModal
  );
  const addCategory = useCategoryStore((state) => state.addCategory);
  // onAdd={(categoryName: string) => {
  //   useCategoryStore.getState().addCategory({
  //     name: categoryName,
  //     id_category: Date.now(), // Temporary ID, should be replaced with actual ID from backend
  //     dateCreated: new Date().toISOString(),
  //   });
  // }}

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
    <div style={modalStyles} onClick={handleClose}>
      <div
        style={dialogStyles}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <form onSubmit={handleAdd}>
          <h2 style={{ marginTop: 0 }}>Add New Category</h2>
          <input
            style={inputStyles}
            autoFocus
            placeholder="Category Name"
            name="categoryName"
            value={categoryName}
            onChange={(e) => {
              setCategoryName(e.target.value);
            }}
            required
          />
          <section style={actionsStyles}>
            <button
              style={{ ...buttonStyles, background: "#1976d2", color: "#fff" }}
              type="submit"
            >
              Add
            </button>
            <button style={buttonStyles} onClick={handleClose} type="button">
              Cancel
            </button>
          </section>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
