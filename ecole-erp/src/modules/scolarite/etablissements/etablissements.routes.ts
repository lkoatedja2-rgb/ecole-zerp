import { Router } from "express";
import { etablissementsController } from "./etablissements.controller";
import { authenticate, authorize } from "@/core/middleware/auth";
import { Role } from "@prisma/client";

export const etablissementsRouter = Router();

etablissementsRouter.use(authenticate);

etablissementsRouter.post("/", authorize(Role.SUPER_ADMIN), etablissementsController.create);
etablissementsRouter.get("/", authorize(Role.SUPER_ADMIN, Role.ADMIN, Role.DIRECTION), etablissementsController.list);
etablissementsRouter.get("/:id", authorize(Role.SUPER_ADMIN, Role.ADMIN, Role.DIRECTION), etablissementsController.getById);
etablissementsRouter.patch("/:id", authorize(Role.SUPER_ADMIN, Role.ADMIN), etablissementsController.update);
etablissementsRouter.delete("/:id", authorize(Role.SUPER_ADMIN), etablissementsController.remove);
