import { z } from "zod";
import { Role } from "@prisma/client";

export const loginSchema = z.object({
  email: z.string().email(),
  motDePasse: z.string().min(1),
});

export const registerSchema = z.object({
  etablissementId: z.string().uuid(),
  email: z.string().email(),
  motDePasse: z.string().min(8, "Le mot de passe doit faire au moins 8 caractères"),
  role: z.nativeEnum(Role),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
