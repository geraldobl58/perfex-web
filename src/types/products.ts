import { ProductStatus } from "@/components/products/products-status";

export interface Product {
  id?: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  status: ProductStatus;
  createdAt?: string | null;
  updatedAt?: string | null;
  categoryId: string;
  category: {
    id: string;
    title: string;
    createdAt?: string | null;
    updatedAt?: string | null;
  };

  total?: number;
  page?: number;
  limit?: number;
}

export interface GetProductsQuery {
  page: number;
  limit: number;
  title?: string | null;
  status?: string | null;
}
