import { Request, Response } from "express";
import { contratsService } from "./contrats.service";
import { createContratSchema } from "./contrats.schemas";

export const contratsController = {
  async create(req: Request, res: Response) {
    const input = createContratSchema.parse(req.body);
    res.status(201).json(await contratsService.create(input));
  },
  async listForPersonnel(req: Request, res: Response) {
    res.json(await contratsService.listForPersonnel(req.params.personnelId));
  },
};
