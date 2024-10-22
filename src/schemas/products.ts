import { z } from "zod";

export type ProductFormSchema = z.infer<typeof productFormSchema>;

export const productFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, {
    message: "A produto precisa conter pelo menos 5 caracteres!",
  }),
  description: z.string().min(10, {
    message: "A descrição precisa conter pelo menos 10 caracteres!",
  }),
  price: z.number().min(1, {
    message: "O preço precisa ser maior que 0!",
  }),
  stock: z.number().min(1, {
    message: "O estoque precisa ser maior que 0!",
  }),
  items: z.number().min(1, {
    message: "O número de itens precisa ser maior que 0!",
  }),
  status: z.boolean(),
  categoryId: z.string().min(1, {
    message: "Selecione uma categoria!",
  }),
});
