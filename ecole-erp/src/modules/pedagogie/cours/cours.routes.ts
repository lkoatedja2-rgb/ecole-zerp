import { Router } from "express";
import { coursController } from "./cours.controller";
import { authenticate, authorize } from "@/core/middleware/auth";
import { Role } from "@prisma/client";

export const coursRouter = Router();
coursRouter.use(authenticate);
coursRouter.post("/", authorize(Role.ADMIN, Role.DIRECTION), coursController.create);
coursRouter.get("/classe/:classeId", coursController.listForClasse);
coursRouter.get("/:id", coursController.getById);
