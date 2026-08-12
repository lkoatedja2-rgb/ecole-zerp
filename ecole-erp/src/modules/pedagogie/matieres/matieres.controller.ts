import { Request, Response } from "express";
import { matieresService } from "./matieres.service";
import { createMatiereSchema } from "./matieres.schemas";

export const matieresController = {
  async create(req: Request, res: Response) {
    const input = createMatiereSchema.parse(req.body);
    res.status(201).json(await matieresService.create(input));
  },
  async list(_req: Request, res: Response) {
    res.json(await matieresService.list());
  },
};
