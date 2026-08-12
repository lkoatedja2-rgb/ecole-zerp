import { z } from "zod";
import { StatutInscription } from "@prisma/client";

export const createInscriptionSchema = z.object({
  eleveId: z.string().uuid(),
  classeId: z.string().uuid(),
  anneeScolaireId: z.string().uuid(),
  dateInscription: z.coerce.date(),
});

export const updateInscriptionSchema = z.object({
  statut: z.nativeEnum(StatutInscription),
  classeId: z.string().uuid().optional(),
});

export type CreateInscriptionInput = z.infer<typeof createInscriptionSchema>;
export type UpdateInscriptionInput = z.infer<typeof updateInscriptionSchema>;
