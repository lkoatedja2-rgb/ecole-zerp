import { prisma } from "@/core/prisma";
import { NotFoundError } from "@/core/errors";
import { CreateClasseInput } from "./classes.schemas";

export const classesService = {
  create(input: CreateClasseInput) {
    return prisma.classe.create({ data: input });
  },

  list(anneeScolaireId: string) {
    return prisma.classe.findMany({
      where: { anneeScolaireId },
      orderBy: { nom: "asc" },
    });
  },

  async getById(id: string) {
    const classe = await prisma.classe.findUnique({
      where: { id },
      include: {
        inscriptions: { include: { eleve: true } },
        cours: { include: { matiere: true, personnel: true } },
      },
    });
    if (!classe) throw new NotFoundError("Classe");
    return classe;
  },
};
