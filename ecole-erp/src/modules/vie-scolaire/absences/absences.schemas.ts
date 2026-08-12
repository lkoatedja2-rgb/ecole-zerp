import { z } from "zod";

export const createAbsenceSchema = z.object({
  eleveId: z.string().uuid(),
  coursId: z.string().uuid(),
  dateDebut: z.coerce.date(),
  dateFin: z.coerce.date(),
  motif: z.string().optional(),
  justifiee: z.boolean().default(false),
});

export const justifyAbsenceSchema = z.object({
  justifiee: z.boolean(),
  motif: z.string().optional(),
});

export type CreateAbsenceInput = z.infer<typeof createAbsenceSchema>;
export type JustifyAbsenceInput = z.infer<typeof justifyAbsenceSchema>;
