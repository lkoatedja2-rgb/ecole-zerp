import { prisma } from "@/core/prisma";
import { CreateContratInput } from "./contrats.schemas";

export const contratsService = {
  create(input: CreateContratInput) {
    return prisma.contrat.create({ data: input });
  },
  listForPersonnel(personnelId: string) {
    return prisma.contrat.findMany({ where: { personnelId }, orderBy: { dateDebut: "desc" } });
  },
};
