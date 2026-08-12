import { Router } from "express";
import { authController } from "./auth.controller";
import { authenticate } from "@/core/middleware/auth";

export const authRouter = Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/me", authenticate, authController.me);
