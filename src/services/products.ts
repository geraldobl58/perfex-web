import api from "@/lib/axios";

import { GetProductsQuery, Product } from "@/types/products";

export const getProducts = async ({
  page,
  limit,
  title,
  status,
}: GetProductsQuery): Promise<Product[]> => {
  const {
    data: { data },
  } = await api.get("/products", {
    params: {
      page,
      limit,
      title,
      status,
    },
  });
  return data;
};

export const addProduct = async ({
  title,
  description,
  price,
  stock,
  status,
  categoryId,
}: Product) => {
  const response = await api.post("/products", {
    title,
    description,
    price,
    stock,
    status,
    categoryId,
  });
  return response.data;
};

export const updateProduct = async (
  id: string,
  { title, description, price, stock, status, categoryId }: Product
) => {
  const response = await api.put(`/products/${id}`, {
    title,
    description,
    price,
    stock,
    status,
    categoryId,
  });
  return response.data;
};

export const deleteProduct = async (id: string) => {
  await api.delete(`/products/${id}`);
};
