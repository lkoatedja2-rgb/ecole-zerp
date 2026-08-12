import { z } from "zod";

export const createNoteSchema = z.object({
  eleveId: z.string().uuid(),
  coursId: z.string().uuid(),
  periodeId: z.string().uuid(),
  valeur: z.number().min(0).max(20),
  coefficient: z.number().min(0).default(1),
  dateEvaluation: z.coerce.date(),
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
