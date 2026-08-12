import { Request, Response } from "express";
import { authService } from "./auth.service";
import { loginSchema, registerSchema } from "./auth.schemas";
import { UnauthorizedError } from "@/core/errors";

export const authController = {
  async register(req: Request, res: Response) {
    const input = registerSchema.parse(req.body);
    const utilisateur = await authService.register(input);
    res.status(201).json(utilisateur);
  },

  async login(req: Request, res: Response) {
    const input = loginSchema.parse(req.body);
    const result = await authService.login(input);
    res.status(200).json(result);
  },

  async me(req: Request, res: Response) {
    if (!req.user) throw new UnauthorizedError();
    const utilisateur = await authService.me(req.user.sub);
    res.status(200).json(utilisateur);
  },
};
