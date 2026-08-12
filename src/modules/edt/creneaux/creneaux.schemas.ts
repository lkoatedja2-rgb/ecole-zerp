import { z } from "zod";

export const createCreneauSchema = z
  .object({
    coursId: z.string().uuid(),
    salleId: z.string().uuid(),
    debut: z.coerce.date(),
    fin: z.coerce.date(),
  })
  .refine((data) => data.fin > data.debut, {
    message: "L'heure de fin doit être après l'heure de début",
    path: ["fin"],
  });

export type CreateCreneauInput = z.infer<typeof createCreneauSchema>;
