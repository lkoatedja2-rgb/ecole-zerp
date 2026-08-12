import { z } from "zod";

export const createCoursSchema = z.object({
  classeId: z.string().uuid(),
  matiereId: z.string().uuid(),
  personnelId: z.string().uuid(),
});

export type CreateCoursInput = z.infer<typeof createCoursSchema>;
