import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Search, X } from "lucide-react";

import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { productFilterSchema, ProductFilterSchema } from "@/schemas/products";

interface ProductsFilterProps {
  title: string | null;
  status: string | null;
  setSearchParams: React.Dispatch<React.SetStateAction<URLSearchParams>>;
}

export function ProductsFilter({
  title,
  status,
  setSearchParams,
}: ProductsFilterProps) {
  const { register, handleSubmit, control, reset } =
    useForm<ProductFilterSchema>({
      resolver: zodResolver(productFilterSchema),
      defaultValues: {
        title: title ?? "",
        status: status ?? "",
      },
    });

  const handleFilter = ({ title, status }: ProductFilterSchema) => {
    setSearchParams((state) => {
      if (title) {
        state.set("title", title);
      } else {
        state.delete("title");
      }

      if (status) {
        state.set("status", status);
      } else {
        state.delete("status");
      }

      state.set("page", "1");

      return state;
    });
  };

  const handleClearFilter = () => {
    setSearchParams((state) => {
      state.delete("title");
      state.delete("status");
      state.set("page", "1");
      return state;
    });

    reset({
      title: "",
      status: "",
    });
  };
  return (
    <>
      <p className="text-sm mb-4">Filtro de pesquisa</p>
      <form
        onSubmit={handleSubmit(handleFilter)}
        className="flex items-center justify-center gap-4"
      >
        <Input placeholder="Título" {...register("title")} />

        <FormField
          name="status"
          control={control}
          render={({ field: { name, onChange, value, disabled } }) => (
            <Select
              defaultValue=""
              name={name}
              onValueChange={onChange}
              value={value}
              disabled={disabled}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in_stock">Em estoque</SelectItem>
                <SelectItem value="out_stock">Fora de estoque</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        <Button type="submit" className="w-[100px] text-xs">
          <Search className="size-4" /> Buscar
        </Button>
        <Button
          type="button"
          variant="destructive"
          onClick={() => handleClearFilter()}
          className="w-[100px] text-xs"
        >
          <X className="size-4" /> Remover
        </Button>
      </form>
    </>
  );
}
