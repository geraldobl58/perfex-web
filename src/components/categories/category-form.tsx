import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormSchema, formSchema } from "@/schemas/categories";

import { useCategories } from "@/hooks/useCategories";

export function CategoryForm() {
  const { editingCategory, addOrUpdateCategory } = useCategories();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  useEffect(() => {
    if (editingCategory) {
      form.reset({
        title: editingCategory.title,
      });
    }
  }, [editingCategory, form]);

  useEffect(() => {
    if (!editingCategory) {
      form.reset({
        title: "",
      });
    }
  }, [editingCategory, form]);

  const onSubmit = (data: FormSchema) => {
    addOrUpdateCategory(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o título da categoria"
                  className="w-full"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-4">
          <Button variant="default" size="sm">
            {editingCategory ? (
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
      </form>
    </Form>
  );
}
