import { Request, Response } from "express";
import { bulletinsPaieService } from "./bulletins-paie.service";
import { createBulletinPaieSchema } from "./bulletins-paie.schemas";

export const bulletinsPaieController = {
  async create(req: Request, res: Response) {
    const input = createBulletinPaieSchema.parse(req.body);
    res.status(201).json(await bulletinsPaieService.create(input));
  },
  async listForPersonnel(req: Request, res: Response) {
    res.json(await bulletinsPaieService.listForPersonnel(req.params.personnelId));
  },
  async valider(req: Request, res: Response) {
    res.json(await bulletinsPaieService.valider(req.params.id));
  },
};
