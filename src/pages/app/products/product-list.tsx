import { Edit2, Trash2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { ProductsStatus } from "./products-status";

import { Product } from "@/types/products";

interface ProductListProps {
  products: Product[];
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}

export function ProductList({
  products,
  handleEdit,
  handleDelete,
}: ProductListProps) {
  return (
    <Table className="mt-10">
      <TableHeader>
        <TableRow>
          <TableHead>Título</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Estoque</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead className="flex justify-end">Ação</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products &&
          products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.title}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>
                {product.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <ProductsStatus status={product.status} />
              </TableCell>
              <TableCell>{product.category.title}</TableCell>
              <TableCell className="flex justify-end gap-4">
                <Button
                  size="icon"
                  onClick={() => product.id && handleEdit(product.id)}
                >
                  <Edit2 className="size-4" />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => product.id && handleDelete(product.id)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
