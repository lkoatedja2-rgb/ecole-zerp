import { Request, Response } from "express";
import { coursService } from "./cours.service";
import { createCoursSchema } from "./cours.schemas";

export const coursController = {
  async create(req: Request, res: Response) {
    const input = createCoursSchema.parse(req.body);
    res.status(201).json(await coursService.create(input));
  },
  async listForClasse(req: Request, res: Response) {
    res.json(await coursService.listForClasse(req.params.classeId));
  },
  async getById(req: Request, res: Response) {
    res.json(await coursService.getById(req.params.id));
  },
};
