import { z } from "zod";

export const sendMessageSchema = z.object({
  destinataireId: z.string().uuid(),
  sujet: z.string().min(1),
  contenu: z.string().min(1),
});

export type SendMessageInput = z.infer<typeof sendMessageSchema>;
