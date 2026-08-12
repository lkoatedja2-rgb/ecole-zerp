import { z } from "zod";

export const createMatiereSchema = z.object({
  libelle: z.string().min(1),
  code: z.string().min(1).max(20),
});

export type CreateMatiereInput = z.infer<typeof createMatiereSchema>;
