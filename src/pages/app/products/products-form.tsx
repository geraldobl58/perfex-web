import { UseFormReturn } from "react-hook-form";

import { Edit2, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { ProductFormSchema } from "@/schemas/products";

import { Product } from "@/types/products";
import { Category } from "@/types/categories";

interface ProductFormProps {
  editingProduct: Product | null;
  onSubmit: (data: ProductFormSchema) => void;
  categories: Category[];
  form: UseFormReturn<ProductFormSchema>;
}

export function ProductForm({
  editingProduct,
  onSubmit,
  categories,
  form,
}: ProductFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o título da produto"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Digite a descrição do produto"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field: { name, onChange, value, disabled } }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
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
                    {categories.map((category) => (
                      <div key={category.id}>
                        <SelectItem value={category.id ?? ""}>
                          {category.title}
                        </SelectItem>
                      </div>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field: { name, onChange, value, disabled } }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
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
                    <SelectItem value="out_stock">Fora do estoque</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-4 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Digite o valor do produto"
                    className="w-full"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estoque</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Digite o estoque do produto"
                    className="w-full"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <Button variant="default" size="sm">
              {editingProduct ? (
                <>
                  <Edit2 className="size-4" />
                  Atualizar
                </>
              ) : (
                <>
                  <PlusCircle className="size-4" />
                  Adicionar
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
