import { Router } from "express";
import { notesController } from "./notes.controller";
import { authenticate, authorize } from "@/core/middleware/auth";
import { Role } from "@prisma/client";

export const notesRouter = Router();

notesRouter.use(authenticate);

notesRouter.post("/", authorize(Role.ENSEIGNANT, Role.ADMIN), notesController.create);
notesRouter.get("/eleve/:eleveId", notesController.listForEleve);
notesRouter.get("/eleve/:eleveId/periode/:periodeId/moyenne", notesController.moyenne);
