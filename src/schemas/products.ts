import { z } from "zod";

export type ProductFormSchema = z.infer<typeof productFormSchema>;
export type ProductFilterSchema = z.infer<typeof productFilterSchema>;

export const productFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, {
    message: "A produto precisa conter pelo menos 5 caracteres!",
  }),
  description: z.string().min(10, {
    message: "A descrição precisa conter pelo menos 10 caracteres!",
  }),
  price: z.number().min(1, {
    message: "O preço precisa ser maior que 1!",
  }),
  stock: z.number().min(1, {
    message: "O estoque precisa ser maior que 1!",
  }),
  status: z.string().min(1, {
    message: "Selecione o status da produto!",
  }),
  categoryId: z.string().min(1, {
    message: "Selecione uma categoria!",
  }),
});

export const productFilterSchema = z.object({
  title: z.string().optional(),
  status: z.string().optional(),
});
