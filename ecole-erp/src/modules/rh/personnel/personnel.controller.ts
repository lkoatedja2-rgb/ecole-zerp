import { Request, Response } from "express";
import { personnelService } from "./personnel.service";
import { createPersonnelSchema } from "./personnel.schemas";
import { UnauthorizedError } from "@/core/errors";

export const personnelController = {
  async create(req: Request, res: Response) {
    const input = createPersonnelSchema.parse(req.body);
    res.status(201).json(await personnelService.create(input));
  },
  async list(req: Request, res: Response) {
    if (!req.user) throw new UnauthorizedError();
    res.json(await personnelService.list(req.user.etablissementId));
  },
  async getById(req: Request, res: Response) {
    res.json(await personnelService.getById(req.params.id));
  },
};
