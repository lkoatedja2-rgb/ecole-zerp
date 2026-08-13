import { z } from "zod";

export const createSalleSchema = z.object({
  etablissementId: z.string().uuid(),
  nom: z.string().min(1),
  capacite: z.number().int().positive(),
});

export type CreateSalleInput = z.infer<typeof createSalleSchema>;
