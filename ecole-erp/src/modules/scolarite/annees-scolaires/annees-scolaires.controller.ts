import { Request, Response } from "express";
import { anneesScolairesService } from "./annees-scolaires.service";
import { createAnneeScolaireSchema } from "./annees-scolaires.schemas";
import { UnauthorizedError } from "@/core/errors";

export const anneesScolairesController = {
  async create(req: Request, res: Response) {
    const input = createAnneeScolaireSchema.parse(req.body);
    const annee = await anneesScolairesService.create(input);
    res.status(201).json(annee);
  },

  async list(req: Request, res: Response) {
    if (!req.user) throw new UnauthorizedError();
    const annees = await anneesScolairesService.list(req.user.etablissementId);
    res.json(annees);
  },

  async getById(req: Request, res: Response) {
    const annee = await anneesScolairesService.getById(req.params.id);
    res.json(annee);
  },
};
