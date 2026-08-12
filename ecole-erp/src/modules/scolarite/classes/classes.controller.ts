import { Request, Response } from "express";
import { classesService } from "./classes.service";
import { createClasseSchema } from "./classes.schemas";
import { AppError } from "@/core/errors";

export const classesController = {
  async create(req: Request, res: Response) {
    const input = createClasseSchema.parse(req.body);
    const classe = await classesService.create(input);
    res.status(201).json(classe);
  },

  async list(req: Request, res: Response) {
    const anneeScolaireId = req.query.anneeScolaireId as string;
    if (!anneeScolaireId) {
      throw new AppError("Le paramètre anneeScolaireId est requis", 400);
    }
    const classes = await classesService.list(anneeScolaireId);
    res.json(classes);
  },

  async getById(req: Request, res: Response) {
    const classe = await classesService.getById(req.params.id);
    res.json(classe);
  },
};
