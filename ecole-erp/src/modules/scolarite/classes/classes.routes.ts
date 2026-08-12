import { Router } from "express";
import { classesController } from "./classes.controller";
import { authenticate, authorize } from "@/core/middleware/auth";
import { Role } from "@prisma/client";

export const classesRouter = Router();

classesRouter.use(authenticate);

classesRouter.post("/", authorize(Role.ADMIN, Role.DIRECTION), classesController.create);
classesRouter.get("/", classesController.list);
classesRouter.get("/:id", classesController.getById);
