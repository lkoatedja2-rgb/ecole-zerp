import { z } from "zod";

export const createFactureSchema = z.object({
  eleveId: z.string().uuid(),
  dateEmission: z.coerce.date(),
  lignes: z
    .array(
      z.object({
        libelle: z.string().min(1),
        montant: z.number().positive(),
      })
    )
    .min(1),
});

export type CreateFactureInput = z.infer<typeof createFactureSchema>;
