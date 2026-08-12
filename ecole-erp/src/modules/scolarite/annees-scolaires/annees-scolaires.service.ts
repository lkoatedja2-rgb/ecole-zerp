import { prisma } from "@/core/prisma";
import { NotFoundError } from "@/core/errors";
import { CreateAnneeScolaireInput } from "./annees-scolaires.schemas";

export const anneesScolairesService = {
  create(input: CreateAnneeScolaireInput) {
    return prisma.anneeScolaire.create({ data: input });
  },

  list(etablissementId: string) {
    return prisma.anneeScolaire.findMany({
      where: { etablissementId },
      orderBy: { dateDebut: "desc" },
    });
  },

  async getById(id: string) {
    const annee = await prisma.anneeScolaire.findUnique({
      where: { id },
      include: { periodes: true, classes: true },
    });
    if (!annee) throw new NotFoundError("Année scolaire");
    return annee;
  },
};
