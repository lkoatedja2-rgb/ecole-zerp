import { Router } from "express";
import { elevesController } from "./eleves.controller";
import { authenticate, authorize } from "@/core/middleware/auth";
import { Role } from "@prisma/client";

export const elevesRouter = Router();

elevesRouter.use(authenticate);

elevesRouter.post("/", authorize(Role.ADMIN, Role.DIRECTION), elevesController.create);
elevesRouter.get(
  "/",
  authorize(Role.ADMIN, Role.DIRECTION, Role.ENSEIGNANT, Role.VIE_SCOLAIRE),
  elevesController.list
);
elevesRouter.get(
  "/:id",
  authorize(Role.ADMIN, Role.DIRECTION, Role.ENSEIGNANT, Role.VIE_SCOLAIRE),
  elevesController.getById
);
elevesRouter.patch("/:id", authorize(Role.ADMIN, Role.DIRECTION), elevesController.update);
