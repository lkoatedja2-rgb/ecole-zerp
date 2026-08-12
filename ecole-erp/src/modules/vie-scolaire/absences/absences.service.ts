import { prisma } from "@/core/prisma";
import { NotFoundError } from "@/core/errors";
import { CreateAbsenceInput, JustifyAbsenceInput } from "./absences.schemas";

export const absencesService = {
  create(input: CreateAbsenceInput) {
    return prisma.absence.create({ data: input });
  },

  listForEleve(eleveId: string) {
    return prisma.absence.findMany({
      where: { eleveId },
      include: { cours: { include: { matiere: true } } },
      orderBy: { dateDebut: "desc" },
    });
  },

  async justify(id: string, input: JustifyAbsenceInput) {
    const absence = await prisma.absence.findUnique({ where: { id } });
    if (!absence) throw new NotFoundError("Absence");
    return prisma.absence.update({ where: { id }, data: input });
  },
};
