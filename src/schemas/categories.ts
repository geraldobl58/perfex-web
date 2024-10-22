import { z } from "zod";

export type FormSchema = z.infer<typeof formSchema>;

export const formSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(2, {
      message: "A categoria precisa conter pelo menos 2 caracteres!",
    })
    .regex(/^[^\d]*$/, {
      message: "A categoria não pode conter números!",
    }),
});
