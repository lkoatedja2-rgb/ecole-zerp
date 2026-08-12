import { Router } from "express";
import { personnelController } from "./personnel.controller";
import { authenticate, authorize } from "@/core/middleware/auth";
import { Role } from "@prisma/client";

export const personnelRouter = Router();
personnelRouter.use(authenticate);
personnelRouter.post("/", authorize(Role.ADMIN, Role.RH), personnelController.create);
personnelRouter.get("/", authorize(Role.ADMIN, Role.RH, Role.DIRECTION), personnelController.list);
personnelRouter.get("/:id", authorize(Role.ADMIN, Role.RH, Role.DIRECTION), personnelController.getById);
