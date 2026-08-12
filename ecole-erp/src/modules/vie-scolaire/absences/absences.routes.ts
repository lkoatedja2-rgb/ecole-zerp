import { Router } from "express";
import { absencesController } from "./absences.controller";
import { authenticate, authorize } from "@/core/middleware/auth";
import { Role } from "@prisma/client";

export const absencesRouter = Router();

absencesRouter.use(authenticate);

absencesRouter.post("/", authorize(Role.ENSEIGNANT, Role.VIE_SCOLAIRE, Role.ADMIN), absencesController.create);
absencesRouter.get("/eleve/:eleveId", absencesController.listForEleve);
absencesRouter.patch("/:id/justifier", authorize(Role.VIE_SCOLAIRE, Role.ADMIN), absencesController.justify);
