import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Edit2, PlusCircle, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { FormSchema, formSchema } from "@/schemas/categories";

export function Categories() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = (data: FormSchema) => {
    console.log(data);
  };

  return (
    <>
      <h3 className="text-lg font-bold mb-4">Categorias</h3>
      <div className="bg-white rounded-lg p-4">
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
            <Button>
              <PlusCircle className="size-4" />
              Adicionar
            </Button>
          </form>
        </Form>

        <Table className="mt-10">
          <TableHeader>
            <TableRow>
              <TableHead>#ID</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="flex justify-end">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>34452342432</TableCell>
              <TableCell>Informática</TableCell>
              <TableCell className="flex justify-end gap-4">
                <Button size="icon">
                  <Edit2 className="size-4" />
                </Button>
                <Button size="icon" variant="destructive">
                  <Trash2 className="size-4" />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
}
