import { Request, Response } from "express";
import { creneauxService } from "./creneaux.service";
import { createCreneauSchema } from "./creneaux.schemas";

function parseDateRange(req: Request) {
  const debut = req.query.debut ? new Date(req.query.debut as string) : undefined;
  const fin = req.query.fin ? new Date(req.query.fin as string) : undefined;
  return { debut, fin };
}

export const creneauxController = {
  async create(req: Request, res: Response) {
    const input = createCreneauSchema.parse(req.body);
    res.status(201).json(await creneauxService.create(input));
  },

  async listForClasse(req: Request, res: Response) {
    const { debut, fin } = parseDateRange(req);
    res.json(await creneauxService.listForClasse(req.params.classeId, debut, fin));
  },

  async listForPersonnel(req: Request, res: Response) {
    const { debut, fin } = parseDateRange(req);
    res.json(await creneauxService.listForPersonnel(req.params.personnelId, debut, fin));
  },

  async remove(req: Request, res: Response) {
    await creneauxService.remove(req.params.id);
    res.status(204).send();
  },
};
