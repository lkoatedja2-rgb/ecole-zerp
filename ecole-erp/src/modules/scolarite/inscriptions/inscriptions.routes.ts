import { Router } from "express";
import { inscriptionsController } from "./inscriptions.controller";
import { authenticate, authorize } from "@/core/middleware/auth";
import { Role } from "@prisma/client";

export const inscriptionsRouter = Router();

inscriptionsRouter.use(authenticate);

inscriptionsRouter.post("/", authorize(Role.ADMIN, Role.DIRECTION), inscriptionsController.create);
inscriptionsRouter.get("/:id", inscriptionsController.getById);
inscriptionsRouter.patch("/:id", authorize(Role.ADMIN, Role.DIRECTION), inscriptionsController.update);
