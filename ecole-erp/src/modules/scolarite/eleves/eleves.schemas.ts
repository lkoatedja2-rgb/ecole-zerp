import { z } from "zod";

export const createEleveSchema = z.object({
  etablissementId: z.string().uuid(),
  email: z.string().email(),
  motDePasse: z.string().min(8),
  nom: z.string().min(1),
  prenom: z.string().min(1),
  dateNaissance: z.coerce.date(),
  numeroIne: z.string().min(1),
  responsableIds: z.array(z.string().uuid()).optional(),
});

export const updateEleveSchema = z.object({
  nom: z.string().min(1).optional(),
  prenom: z.string().min(1).optional(),
  dateNaissance: z.coerce.date().optional(),
});

export type CreateEleveInput = z.infer<typeof createEleveSchema>;
export type UpdateEleveInput = z.infer<typeof updateEleveSchema>;
