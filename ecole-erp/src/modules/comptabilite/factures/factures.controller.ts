import { Request, Response } from "express";
import { facturesService } from "./factures.service";
import { createFactureSchema } from "./factures.schemas";

export const facturesController = {
  async create(req: Request, res: Response) {
    const input = createFactureSchema.parse(req.body);
    res.status(201).json(await facturesService.create(input));
  },
  async listForEleve(req: Request, res: Response) {
    res.json(await facturesService.listForEleve(req.params.eleveId));
  },
  async getById(req: Request, res: Response) {
    res.json(await facturesService.getById(req.params.id));
  },
  async marquerPayee(req: Request, res: Response) {
    res.json(await facturesService.marquerPayee(req.params.id));
  },
};
