import { Request, Response } from "express";
import { absencesService } from "./absences.service";
import { createAbsenceSchema, justifyAbsenceSchema } from "./absences.schemas";

export const absencesController = {
  async create(req: Request, res: Response) {
    const input = createAbsenceSchema.parse(req.body);
    const absence = await absencesService.create(input);
    res.status(201).json(absence);
  },

  async listForEleve(req: Request, res: Response) {
    const absences = await absencesService.listForEleve(req.params.eleveId);
    res.json(absences);
  },

  async justify(req: Request, res: Response) {
    const input = justifyAbsenceSchema.parse(req.body);
    const absence = await absencesService.justify(req.params.id, input);
    res.json(absence);
  },
};
