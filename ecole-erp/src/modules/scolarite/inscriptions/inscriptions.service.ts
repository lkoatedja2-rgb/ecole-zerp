import { prisma } from "@/core/prisma";
import { NotFoundError, ConflictError } from "@/core/errors";
import { StatutInscription } from "@prisma/client";
import { CreateInscriptionInput, UpdateInscriptionInput } from "./inscriptions.schemas";

export const inscriptionsService = {
  async create(input: CreateInscriptionInput) {
    const existing = await prisma.inscription.findUnique({
      where: {
        eleveId_anneeScolaireId: {
          eleveId: input.eleveId,
          anneeScolaireId: input.anneeScolaireId,
        },
      },
    });
    if (existing) {
      throw new ConflictError("Cet élève est déjà inscrit pour cette année scolaire");
    }

    return prisma.inscription.create({
      data: { ...input, statut: StatutInscription.EN_COURS },
    });
  },

  async getById(id: string) {
    const inscription = await prisma.inscription.findUnique({
      where: { id },
      include: { eleve: true, classe: true, anneeScolaire: true },
    });
    if (!inscription) throw new NotFoundError("Inscription");
    return inscription;
  },

  async update(id: string, input: UpdateInscriptionInput) {
    await this.getById(id);
    return prisma.inscription.update({ where: { id }, data: input });
  },
};
