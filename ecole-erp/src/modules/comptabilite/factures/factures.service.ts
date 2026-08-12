import { prisma } from "@/core/prisma";
import { NotFoundError } from "@/core/errors";
import { StatutFacture } from "@prisma/client";
import { CreateFactureInput } from "./factures.schemas";

export const facturesService = {
  create(input: CreateFactureInput) {
    const montantTotal = input.lignes.reduce((acc, l) => acc + l.montant, 0);

    return prisma.facture.create({
      data: {
        eleveId: input.eleveId,
        dateEmission: input.dateEmission,
        montantTotal,
        statut: StatutFacture.EMISE,
        lignes: { create: input.lignes },
      },
      include: { lignes: true },
    });
  },

  listForEleve(eleveId: string) {
    return prisma.facture.findMany({
      where: { eleveId },
      include: { lignes: true },
      orderBy: { dateEmission: "desc" },
    });
  },

  async getById(id: string) {
    const facture = await prisma.facture.findUnique({ where: { id }, include: { lignes: true, eleve: true } });
    if (!facture) throw new NotFoundError("Facture");
    return facture;
  },

  marquerPayee(id: string) {
    return prisma.facture.update({ where: { id }, data: { statut: StatutFacture.PAYEE } });
  },
};
