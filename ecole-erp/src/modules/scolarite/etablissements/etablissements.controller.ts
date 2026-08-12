import { Request, Response } from "express";
import { etablissementsService } from "./etablissements.service";
import { createEtablissementSchema, updateEtablissementSchema } from "./etablissements.schemas";

export const etablissementsController = {
  async create(req: Request, res: Response) {
    const input = createEtablissementSchema.parse(req.body);
    const etablissement = await etablissementsService.create(input);
    res.status(201).json(etablissement);
  },

  async list(_req: Request, res: Response) {
    const etablissements = await etablissementsService.list();
    res.json(etablissements);
  },

  async getById(req: Request, res: Response) {
    const etablissement = await etablissementsService.getById(req.params.id);
    res.json(etablissement);
  },

  async update(req: Request, res: Response) {
    const input = updateEtablissementSchema.parse(req.body);
    const etablissement = await etablissementsService.update(req.params.id, input);
    res.json(etablissement);
  },

  async remove(req: Request, res: Response) {
    await etablissementsService.remove(req.params.id);
    res.status(204).send();
  },
};
