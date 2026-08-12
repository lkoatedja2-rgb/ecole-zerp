import { z } from "zod";

export const createEtablissementSchema = z.object({
  nom: z.string().min(2),
  code: z.string().min(2).max(20),
  adresse: z.string().optional(),
  ville: z.string().optional(),
});

export const updateEtablissementSchema = createEtablissementSchema.partial();

export type CreateEtablissementInput = z.infer<typeof createEtablissementSchema>;
export type UpdateEtablissementInput = z.infer<typeof updateEtablissementSchema>;
