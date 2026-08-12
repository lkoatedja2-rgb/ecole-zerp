import { prisma } from "@/core/prisma";
import { NotFoundError } from "@/core/errors";
import { CreateCoursInput } from "./cours.schemas";

export const coursService = {
  create(input: CreateCoursInput) {
    return prisma.cours.create({ data: input });
  },

  listForClasse(classeId: string) {
    return prisma.cours.findMany({
      where: { classeId },
      include: { matiere: true, personnel: true },
    });
  },

  async getById(id: string) {
    const cours = await prisma.cours.findUnique({
      where: { id },
      include: { matiere: true, personnel: true, classe: true, creneaux: { include: { salle: true } } },
    });
    if (!cours) throw new NotFoundError("Cours");
    return cours;
  },
};
