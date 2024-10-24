import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import { toast } from "sonner";

import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "@/services/products";

import { ProductStatus } from "./products/products-status";
import { ProductList } from "./products/product-list";
import { ProductsPagination } from "./products/products-pagination";
import { ProductsFilter } from "./products/products-filter";
import { ProductForm } from "./products/products-form";

import { ProductFormSchema, productFormSchema } from "@/schemas/products";

import { useCategories } from "@/hooks/useCategories";

import { Product } from "@/types/products";

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const { categories } = useCategories();

  const pages = z.coerce.number().parse(searchParams.get("page") ?? 1);

  const title = searchParams.get("title");
  const status = searchParams.get("status");

  const form = useForm<ProductFormSchema>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 1,
      stock: 1,
      status: "",
      categoryId: "",
    },
  });

  const fetchProducts = async () => {
    const data = await getProducts({
      page: pages,
      limit: 10,
      title: title ?? undefined,
      status: status ?? undefined,
    });
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, [pages, title, status]);

  const pageChange = async (page: number) => {
    setSearchParams((prev) => {
      prev.set("page", page.toString());
      return prev;
    });
  };

  useEffect(() => {
    if (editingProduct) {
      form.reset({
        title: editingProduct.title,
        description: editingProduct.description,
        categoryId: editingProduct.categoryId,
        status: editingProduct.status,
        price: editingProduct.price,
        stock: editingProduct.stock,
      });
    }
  }, [editingProduct, form]);

  useEffect(() => {
    if (!editingProduct) {
      form.reset({
        title: "",
        description: "",
        categoryId: "",
        status: "",
        price: 0,
        stock: 0,
      });
    }
  }, [editingProduct, form]);

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      toast("Produto deletado com sucesso!");
      fetchProducts();
    } catch (error) {
      console.log(error);
      toast("Houve um erro ao deletar o produto!");
    }
  };

  const onSubmit = async (data: ProductFormSchema) => {
    try {
      if (editingProduct) {
        if (editingProduct?.id) {
          const category = categories.find(
            (category) => category.id === data.categoryId
          );
          if (!category) {
            toast("Categoria não encontrada!");
            return;
          }
          const productData = {
            ...data,
            category: {
              ...category,
              id: category.id ?? "",
            },
            status: data.status as ProductStatus,
          };
          await updateProduct(editingProduct.id, productData);
        }
        toast("Produto atualizado com sucesso!");
        fetchProducts();
      } else {
        const category = categories.find(
          (category) => category.id === data.categoryId
        );
        if (!category) {
          toast("Categoria não encontrada!");
          return;
        }
        const productData = {
          ...data,
          category: {
            ...category,
            id: category.id ?? "",
          },
          status: data.status as ProductStatus,
        };
        await addProduct(productData);
        toast("Produto adicionado com sucesso!");
        fetchProducts();
        form.reset();
      }
      setEditingProduct(null);
    } catch (error) {
      console.log(error);
      toast("Houve um erro ao salvar o produto!");
    }
  };

  const handleEdit = (id: string) => {
    const product = products.find((product) => product.id === id);
    if (product) {
      setEditingProduct(product);
    }
  };

  return (
    <>
      <div className="mb-4">
        <h3 className="text-lg font-bold">Gerenciamento de produtos</h3>
        <div className="bg-white rounded-lg p-4 mt-2">
          <ProductsFilter
            title={title}
            status={status}
            setSearchParams={setSearchParams}
          />
        </div>
      </div>
      <div className="bg-white rounded-lg p-4">
        <ProductForm
          categories={categories}
          onSubmit={onSubmit}
          editingProduct={editingProduct}
          form={form}
        />

        <ProductList
          products={products}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>

      <ProductsPagination
        products={products}
        pageChange={pageChange}
        pages={pages}
      />
    </>
  );
}
