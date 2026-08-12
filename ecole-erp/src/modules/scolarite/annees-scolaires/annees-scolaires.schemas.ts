import { z } from "zod";

export const createAnneeScolaireSchema = z.object({
  etablissementId: z.string().uuid(),
  libelle: z.string().min(4), // ex: "2025-2026"
  dateDebut: z.coerce.date(),
  dateFin: z.coerce.date(),
  active: z.boolean().optional(),
});

export type CreateAnneeScolaireInput = z.infer<typeof createAnneeScolaireSchema>;
