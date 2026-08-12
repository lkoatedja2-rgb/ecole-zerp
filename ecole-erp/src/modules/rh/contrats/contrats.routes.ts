import { Router } from "express";
import { contratsController } from "./contrats.controller";
import { authenticate, authorize } from "@/core/middleware/auth";
import { Role } from "@prisma/client";

export const contratsRouter = Router();
contratsRouter.use(authenticate);
contratsRouter.post("/", authorize(Role.ADMIN, Role.RH), contratsController.create);
contratsRouter.get("/personnel/:personnelId", authorize(Role.ADMIN, Role.RH), contratsController.listForPersonnel);
