import api from "@/lib/axios";

import { Category } from "@/types/categories";

export const getCategories = async (): Promise<Category[]> => {
  const {
    data: { data },
  } = await api.get("/categories");
  return data;
};

export const addCategory = async (category: Category) => {
  const response = await api.post("/categories", category);
  return response.data;
};

export const updateCategory = async (id: string, category: Category) => {
  const response = await api.put(`/categories/${id}`, category);
  return response.data;
};

export const deleteCategory = async (id: string) => {
  await api.delete(`/categories/${id}`);
};
