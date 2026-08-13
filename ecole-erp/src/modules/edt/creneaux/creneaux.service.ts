import { prisma } from "@/core/prisma";
import { ConflictError, NotFoundError } from "@/core/errors";
import { CreateCreneauInput } from "./creneaux.schemas";

export const creneauxService = {
  async create(input: CreateCreneauInput) {
    const cours = await prisma.cours.findUnique({
      where: { id: input.coursId },
      select: { personnelId: true },
    });
    if (!cours) throw new NotFoundError("Cours");

    const conflitSalle = await prisma.creneauEdt.findFirst({
      where: {
        salleId: input.salleId,
        debut: { lt: input.fin },
        fin: { gt: input.debut },
      },
    });
    if (conflitSalle) {
      throw new ConflictError("La salle est deja occupee sur ce creneau horaire");
    }

    const conflitEnseignant = await prisma.creneauEdt.findFirst({
      where: {
        debut: { lt: input.fin },
        fin: { gt: input.debut },
        cours: { personnelId: cours.personnelId },
      },
    });
    if (conflitEnseignant) {
      throw new ConflictError("L enseignant a deja un cours programme sur ce creneau horaire");
    }

    return prisma.creneauEdt.create({
      data: input,
      include: { salle: true, cours: { include: { matiere: true, classe: true, personnel: true } } },
    });
  },

  listForClasse(classeId: string, debut?: Date, fin?: Date) {
    return prisma.creneauEdt.findMany({
      where: {
        cours: { classeId },
        ...(debut && fin ? { debut: { gte: debut }, fin: { lte: fin } } : {}),
      },
      include: { salle: true, cours: { include: { matiere: true, personnel: true } } },
      orderBy: { debut: "asc" },
    });
  },

  listForPersonnel(personnelId: string, debut?: Date, fin?: Date) {
    return prisma.creneauEdt.findMany({
      where: {
        cours: { personnelId },
        ...(debut && fin ? { debut: { gte: debut }, fin: { lte: fin } } : {}),
      },
      include: { salle: true, cours: { include: { matiere: true, classe: true } } },
      orderBy: { debut: "asc" },
    });
  },

  async remove(id: string) {
    const creneau = await prisma.creneauEdt.findUnique({ where: { id } });
    if (!creneau) throw new NotFoundError("Creneau");
    await prisma.creneauEdt.delete({ where: { id } });
  },
};
