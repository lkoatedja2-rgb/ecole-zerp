import { prisma } from "@/core/prisma";
import { CreateNoteInput } from "./notes.schemas";

export const notesService = {
  create(input: CreateNoteInput) {
    return prisma.note.create({ data: input });
  },

  listForEleve(eleveId: string, periodeId?: string) {
    return prisma.note.findMany({
      where: { eleveId, ...(periodeId ? { periodeId } : {}) },
      include: { cours: { include: { matiere: true } } },
      orderBy: { dateEvaluation: "desc" },
    });
  },

  /** Moyenne pondérée par coefficient pour un élève sur une période donnée */
  async moyenneEleve(eleveId: string, periodeId: string) {
    const notes = await prisma.note.findMany({ where: { eleveId, periodeId } });
    if (notes.length === 0) return null;

    const totalPoints = notes.reduce((acc, n) => acc + Number(n.valeur) * Number(n.coefficient), 0);
    const totalCoefficients = notes.reduce((acc, n) => acc + Number(n.coefficient), 0);

    return totalCoefficients > 0 ? Number((totalPoints / totalCoefficients).toFixed(2)) : null;
  },
};
