import { prisma } from "@/core/prisma";
import { CreateSalleInput } from "./salles.schemas";

export const sallesService = {
  create(input: CreateSalleInput) {
    return prisma.salle.create({ data: input });
  },
  list(etablissementId: string) {
    return prisma.salle.findMany({
      where: { etablissementId },
      orderBy: { nom: "asc" },
    });
  },
};
