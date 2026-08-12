import { Request, Response } from "express";
import { sallesService } from "./salles.service";
import { createSalleSchema } from "./salles.schemas";
import { UnauthorizedError } from "@/core/errors";

export const sallesController = {
  async create(req: Request, res: Response) {
    const input = createSalleSchema.parse(req.body);
    res.status(201).json(await sallesService.create(input));
  },
  async list(req: Request, res: Response) {
    if (!req.user) throw new UnauthorizedError();
    res.json(await sallesService.list(req.user.etablissementId));
  },
};
