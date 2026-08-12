import { Router } from "express";
import { matieresController } from "./matieres.controller";
import { authenticate, authorize } from "@/core/middleware/auth";
import { Role } from "@prisma/client";

export const matieresRouter = Router();
matieresRouter.use(authenticate);
matieresRouter.post("/", authorize(Role.ADMIN, Role.DIRECTION), matieresController.create);
matieresRouter.get("/", matieresController.list);
