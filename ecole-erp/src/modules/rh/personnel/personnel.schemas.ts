import { z } from "zod";
import { Role } from "@prisma/client";

export const createPersonnelSchema = z.object({
  etablissementId: z.string().uuid(),
  email: z.string().email(),
  motDePasse: z.string().min(8),
  role: z.nativeEnum(Role).default(Role.ENSEIGNANT),
  nom: z.string().min(1),
  prenom: z.string().min(1),
  fonction: z.string().min(1),
  dateEmbauche: z.coerce.date(),
});

export type CreatePersonnelInput = z.infer<typeof createPersonnelSchema>;
