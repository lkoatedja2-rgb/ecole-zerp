import { Router } from "express";
import { anneesScolairesController } from "./annees-scolaires.controller";
import { authenticate, authorize } from "@/core/middleware/auth";
import { Role } from "@prisma/client";

export const anneesScolairesRouter = Router();

anneesScolairesRouter.use(authenticate);

anneesScolairesRouter.post("/", authorize(Role.ADMIN, Role.DIRECTION), anneesScolairesController.create);
anneesScolairesRouter.get("/", anneesScolairesController.list);
anneesScolairesRouter.get("/:id", anneesScolairesController.getById);
