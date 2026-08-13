import { prisma } from "@/core/prisma";
import { NotFoundError, ForbiddenError } from "@/core/errors";
import { SendMessageInput } from "./messages.schemas";

export const messagesService = {
  send(expediteurId: string, input: SendMessageInput) {
    return prisma.message.create({
      data: { expediteurId, ...input },
    });
  },

  inbox(destinataireId: string) {
    return prisma.message.findMany({
      where: { destinataireId },
      include: { expediteur: { select: { email: true, role: true } } },
      orderBy: { dateEnvoi: "desc" },
    });
  },

  sent(expediteurId: string) {
    return prisma.message.findMany({
      where: { expediteurId },
      include: { destinataire: { select: { email: true, role: true } } },
      orderBy: { dateEnvoi: "desc" },
    });
  },

  async markAsRead(id: string, userId: string) {
    const message = await prisma.message.findUnique({ where: { id } });
    if (!message) throw new NotFoundError("Message");
    if (message.destinataireId !== userId) {
      throw new ForbiddenError("Vous ne pouvez marquer comme lu que vos propres messages");
    }
    return prisma.message.update({ where: { id }, data: { lu: true } });
  },
};
