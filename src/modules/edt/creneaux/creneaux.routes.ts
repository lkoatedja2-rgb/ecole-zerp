import { Router } from "express";
import { creneauxController } from "./creneaux.controller";
import { authenticate, authorize } from "@/core/middleware/auth";
import { Role } from "@prisma/client";

export const creneauxRouter = Router();
creneauxRouter.use(authenticate);

creneauxRouter.post("/", authorize(Role.ADMIN, Role.DIRECTION), creneauxController.create);
creneauxRouter.get("/classe/:classeId", creneauxController.listForClasse);
creneauxRouter.get("/personnel/:personnelId", creneauxController.listForPersonnel);
creneauxRouter.delete("/:id", authorize(Role.ADMIN, Role.DIRECTION), creneauxController.remove);
