import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Product } from "@/types/products";

interface ProductsPaginationProps {
  pageChange: (page: number) => Promise<void> | void;
  products: Product[];
  pages: number;
}

export function ProductsPagination({
  products,
  pageChange,
  pages,
}: ProductsPaginationProps) {
  return (
    <>
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-foreground">
          Exibindo {products.length} de {products.length} produtos.
        </p>
        <div className="flex gap-2">
          <Button
            size="icon"
            disabled={pages === 1}
            onClick={() => pageChange(1)}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button size="icon" onClick={() => pageChange(pages + 1)}>
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
      {products.length === 0 && (
        <p className="flex items-center justify-center text-sm text-foreground mt-10">
          Nenhum produto encontrado.
        </p>
      )}
    </>
  );
}
