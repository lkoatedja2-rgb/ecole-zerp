import { z } from "zod";

export const createBulletinPaieSchema = z.object({
  personnelId: z.string().uuid(),
  mois: z.coerce.date(),
  montantNet: z.number().positive(),
  fichierUrl: z.string().url().optional(),
});

export type CreateBulletinPaieInput = z.infer<typeof createBulletinPaieSchema>;
