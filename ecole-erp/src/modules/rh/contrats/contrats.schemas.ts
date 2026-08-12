import { z } from "zod";
import { TypeContrat } from "@prisma/client";

export const createContratSchema = z.object({
  personnelId: z.string().uuid(),
  typeContrat: z.nativeEnum(TypeContrat),
  dateDebut: z.coerce.date(),
  dateFin: z.coerce.date().optional(),
  salaireBrut: z.number().positive(),
});

export type CreateContratInput = z.infer<typeof createContratSchema>;
