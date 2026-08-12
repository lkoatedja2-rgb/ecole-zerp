import { prisma } from "@/core/prisma";
import { NotFoundError } from "@/core/errors";
import { CreateEtablissementInput, UpdateEtablissementInput } from "./etablissements.schemas";

export const etablissementsService = {
  create(input: CreateEtablissementInput) {
    return prisma.etablissement.create({ data: input });
  },

  list() {
    return prisma.etablissement.findMany({ orderBy: { nom: "asc" } });
  },

  async getById(id: string) {
    const etablissement = await prisma.etablissement.findUnique({ where: { id } });
    if (!etablissement) throw new NotFoundError("Établissement");
    return etablissement;
  },

  async update(id: string, input: UpdateEtablissementInput) {
    await this.getById(id);
    return prisma.etablissement.update({ where: { id }, data: input });
  },

  async remove(id: string) {
    await this.getById(id);
    await prisma.etablissement.delete({ where: { id } });
  },
};
