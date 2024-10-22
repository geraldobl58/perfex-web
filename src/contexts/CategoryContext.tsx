import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "@/services/categories";
import { Category } from "@/types/categories";
import { FormSchema } from "@/schemas/categories";

interface CategoriesContextProps {
  categories: Category[];
  editingCategory: Category | null;
  setEditingCategory: (category: Category | null) => void;
  fetchCategories: () => void;
  addOrUpdateCategory: (data: FormSchema) => void;
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
}

export const CategoriesContext = createContext<
  CategoriesContextProps | undefined
>(undefined);

interface CategoriesProviderProps {
  children: React.ReactNode;
}

export const CategoriesProvider = ({ children }: CategoriesProviderProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addOrUpdateCategory = async (data: FormSchema) => {
    try {
      if (editingCategory) {
        if (editingCategory?.id) {
          await updateCategory(editingCategory.id, data);
        }
        toast("Categoria atualizada com sucesso!");
      } else {
        await addCategory(data);
        toast("Categoria adicionada com sucesso!");
      }
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      console.log(error);
      toast("Houve um erro ao salvar a categoria!");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id);
      toast("Categoria deletada com sucesso!");
      fetchCategories();
    } catch (error) {
      console.log(error);
      toast("Houve um erro ao deletar a categoria!");
    }
  };

  const handleEdit = (id: string) => {
    const category = categories.find((category) => category.id === id);
    if (category) {
      setEditingCategory(category);
    }
  };

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        editingCategory,
        setEditingCategory,
        fetchCategories,
        addOrUpdateCategory,
        handleDelete,
        handleEdit,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};
