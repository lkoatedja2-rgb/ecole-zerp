import { Router } from "express";
import { facturesController } from "./factures.controller";
import { authenticate, authorize } from "@/core/middleware/auth";
import { Role } from "@prisma/client";

export const facturesRouter = Router();
facturesRouter.use(authenticate);
facturesRouter.post("/", authorize(Role.ADMIN, Role.COMPTABILITE), facturesController.create);
facturesRouter.get("/eleve/:eleveId", authorize(Role.ADMIN, Role.COMPTABILITE, Role.RESPONSABLE), facturesController.listForEleve);
facturesRouter.get("/:id", facturesController.getById);
facturesRouter.patch("/:id/payer", authorize(Role.ADMIN, Role.COMPTABILITE), facturesController.marquerPayee);
