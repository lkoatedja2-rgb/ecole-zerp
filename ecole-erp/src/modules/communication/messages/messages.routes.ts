import { Router } from "express";
import { messagesController } from "./messages.controller";
import { authenticate } from "@/core/middleware/auth";

export const messagesRouter = Router();
messagesRouter.use(authenticate);

messagesRouter.post("/", messagesController.send);
messagesRouter.get("/inbox", messagesController.inbox);
messagesRouter.get("/sent", messagesController.sent);
messagesRouter.patch("/:id/lu", messagesController.markAsRead);
messagesRouter.delete("/:id", messagesController.remove);
