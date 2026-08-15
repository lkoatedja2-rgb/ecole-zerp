import { Request, Response } from "express";
import { messagesService } from "./messages.service";
import { sendMessageSchema } from "./messages.schemas";
import { UnauthorizedError } from "@/core/errors";

export const messagesController = {
  async send(req: Request, res: Response) {
    if (!req.user) throw new UnauthorizedError();
    const input = sendMessageSchema.parse(req.body);
    res.status(201).json(await messagesService.send(req.user.sub, input));
  },

  async inbox(req: Request, res: Response) {
    if (!req.user) throw new UnauthorizedError();
    res.json(await messagesService.inbox(req.user.sub));
  },

  async sent(req: Request, res: Response) {
    if (!req.user) throw new UnauthorizedError();
    res.json(await messagesService.sent(req.user.sub));
  },

  async markAsRead(req: Request, res: Response) {
    if (!req.user) throw new UnauthorizedError();
    res.json(await messagesService.markAsRead(req.params.id, req.user.sub));
  },

  async remove(req: Request, res: Response) {
    if (!req.user) throw new UnauthorizedError();
    await messagesService.remove(req.params.id, req.user.sub);
    res.status(204).send();
  },
};
