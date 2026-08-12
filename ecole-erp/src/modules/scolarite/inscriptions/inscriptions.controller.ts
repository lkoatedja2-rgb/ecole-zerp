import { Request, Response } from "express";
import { inscriptionsService } from "./inscriptions.service";
import { createInscriptionSchema, updateInscriptionSchema } from "./inscriptions.schemas";

export const inscriptionsController = {
  async create(req: Request, res: Response) {
    const input = createInscriptionSchema.parse(req.body);
    const inscription = await inscriptionsService.create(input);
    res.status(201).json(inscription);
  },

  async getById(req: Request, res: Response) {
    const inscription = await inscriptionsService.getById(req.params.id);
    res.json(inscription);
  },

  async update(req: Request, res: Response) {
    const input = updateInscriptionSchema.parse(req.body);
    const inscription = await inscriptionsService.update(req.params.id, input);
    res.json(inscription);
  },
};
