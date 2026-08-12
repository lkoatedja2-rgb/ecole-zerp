import { z } from "zod";

export const createClasseSchema = z.object({
  etablissementId: z.string().uuid(),
  anneeScolaireId: z.string().uuid(),
  nom: z.string().min(1),
  niveau: z.string().min(1),
});

export type CreateClasseInput = z.infer<typeof createClasseSchema>;
