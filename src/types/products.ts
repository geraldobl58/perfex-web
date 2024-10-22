interface ProductsData {
  id?: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  items: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
  category: {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Product {
  total: number;
  page: number;
  limit: number;
  data: ProductsData[];
}
