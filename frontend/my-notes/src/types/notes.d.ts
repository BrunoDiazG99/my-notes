import type { Category } from "./category";

export type Note = {
  id_note: number;
  title: string;
  content: string;
  color: string;
  id_category: number;
  category?: Category | null;
  isActive?: boolean;
  dateCreated?: Date;
};
