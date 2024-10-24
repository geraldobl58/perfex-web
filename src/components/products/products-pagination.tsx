import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

interface ProductsPaginationProps {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => Promise<void> | void;
}

export function ProductsPagination({
  page,
  limit,
  total,
  onPageChange,
}: ProductsPaginationProps) {
  return (
    <div className="flex gap-2">
      <Button size="icon">
        <ArrowLeft className="size-4" />
      </Button>
      <Button size="icon">
        <ArrowRight className="size-4" />
      </Button>
    </div>
  );
}
