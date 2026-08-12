import { prisma } from "@/core/prisma";
import { CreateMatiereInput } from "./matieres.schemas";

export const matieresService = {
  create(input: CreateMatiereInput) {
    return prisma.matiere.create({ data: input });
  },
  list() {
    return prisma.matiere.findMany({ orderBy: { libelle: "asc" } });
  },
};
