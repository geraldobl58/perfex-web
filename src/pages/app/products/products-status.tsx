export type ProductStatus = "in_stock" | "out_stock";

interface ProductsStatusProps {
  status: ProductStatus;
}

const productStatusMap: Record<ProductStatus, string> = {
  in_stock: "Em estoque",
  out_stock: "Fora de estoque",
};

export function ProductsStatus({ status }: ProductsStatusProps) {
  const getStatusClasses = (status: string) => {
    switch (status) {
      case "in_stock":
        return "bg-emerald-500";
      case "out_stock":
        return "bg-rose-500";
      default:
        return "";
    }
  };

  return (
    <>
      {["in_stock", "out_stock"].includes(status) && (
        <span
          className={`flex justify-center rounded-full w-[120px] text-xs text-white p-1 ${getStatusClasses(
            status
          )}`}
        >
          {productStatusMap[status]}
        </span>
      )}
    </>
  );
}
