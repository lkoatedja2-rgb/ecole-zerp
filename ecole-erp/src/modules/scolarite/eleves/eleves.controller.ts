import { Request, Response } from "express";
import { elevesService } from "./eleves.service";
import { createEleveSchema, updateEleveSchema } from "./eleves.schemas";
import { UnauthorizedError } from "@/core/errors";

export const elevesController = {
  async create(req: Request, res: Response) {
    const input = createEleveSchema.parse(req.body);
    const eleve = await elevesService.create(input);
    res.status(201).json(eleve);
  },

  async list(req: Request, res: Response) {
    if (!req.user) throw new UnauthorizedError();
    const eleves = await elevesService.list(req.user.etablissementId);
    res.json(eleves);
  },

  async getById(req: Request, res: Response) {
    const eleve = await elevesService.getById(req.params.id);
    res.json(eleve);
  },

  async update(req: Request, res: Response) {
    const input = updateEleveSchema.parse(req.body);
    const eleve = await elevesService.update(req.params.id, input);
    res.json(eleve);
  },
};
