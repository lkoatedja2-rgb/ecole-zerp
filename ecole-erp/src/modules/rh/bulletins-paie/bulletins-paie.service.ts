import { prisma } from "@/core/prisma";
import { StatutBulletinPaie } from "@prisma/client";
import { CreateBulletinPaieInput } from "./bulletins-paie.schemas";

export const bulletinsPaieService = {
  create(input: CreateBulletinPaieInput) {
    return prisma.bulletinPaie.create({ data: { ...input, statut: StatutBulletinPaie.BROUILLON } });
  },
  listForPersonnel(personnelId: string) {
    return prisma.bulletinPaie.findMany({ where: { personnelId }, orderBy: { mois: "desc" } });
  },
  valider(id: string) {
    return prisma.bulletinPaie.update({ where: { id }, data: { statut: StatutBulletinPaie.VALIDE } });
  },
};
