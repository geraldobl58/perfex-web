import { CategoryList } from "@/components/categories/category-list";
import { CategoryForm } from "@/components/categories/category-form";

export function Categories() {
  return (
    <>
      <h3 className="text-lg font-bold mb-4">Categorias</h3>
      <div className="bg-white rounded-lg p-4">
        <CategoryForm />
        <CategoryList />
      </div>
    </>
  );
}
