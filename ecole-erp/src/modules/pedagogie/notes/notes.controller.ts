import { Request, Response } from "express";
import { notesService } from "./notes.service";
import { createNoteSchema } from "./notes.schemas";
import { AppError } from "@/core/errors";

export const notesController = {
  async create(req: Request, res: Response) {
    const input = createNoteSchema.parse(req.body);
    const note = await notesService.create(input);
    res.status(201).json(note);
  },

  async listForEleve(req: Request, res: Response) {
    const notes = await notesService.listForEleve(req.params.eleveId, req.query.periodeId as string | undefined);
    res.json(notes);
  },

  async moyenne(req: Request, res: Response) {
    const { eleveId, periodeId } = req.params;
    if (!periodeId) throw new AppError("periodeId requis", 400);
    const moyenne = await notesService.moyenneEleve(eleveId, periodeId);
    res.json({ eleveId, periodeId, moyenne });
  },
};
