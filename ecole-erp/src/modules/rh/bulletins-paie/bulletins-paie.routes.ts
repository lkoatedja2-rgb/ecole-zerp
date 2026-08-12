import { Router } from "express";
import { bulletinsPaieController } from "./bulletins-paie.controller";
import { authenticate, authorize } from "@/core/middleware/auth";
import { Role } from "@prisma/client";

export const bulletinsPaieRouter = Router();
bulletinsPaieRouter.use(authenticate);
bulletinsPaieRouter.post("/", authorize(Role.ADMIN, Role.RH, Role.COMPTABILITE), bulletinsPaieController.create);
bulletinsPaieRouter.get("/personnel/:personnelId", authorize(Role.ADMIN, Role.RH), bulletinsPaieController.listForPersonnel);
bulletinsPaieRouter.patch("/:id/valider", authorize(Role.ADMIN, Role.RH, Role.COMPTABILITE), bulletinsPaieController.valider);
