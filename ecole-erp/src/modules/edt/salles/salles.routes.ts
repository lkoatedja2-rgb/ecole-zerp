import { Router } from "express";
import { sallesController } from "./salles.controller";
import { authenticate, authorize } from "@/core/middleware/auth";
import { Role } from "@prisma/client";

export const sallesRouter = Router();
sallesRouter.use(authenticate);
sallesRouter.post("/", authorize(Role.ADMIN, Role.DIRECTION), sallesController.create);
sallesRouter.get("/", sallesController.list);
